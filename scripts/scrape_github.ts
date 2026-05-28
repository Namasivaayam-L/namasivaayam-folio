import { Octokit } from "@octokit/rest"
import * as fs from "fs/promises"
import * as path from "path"
import yaml from "js-yaml"

interface GitHubRepo {
  private: boolean
  fork: boolean
  stargazers_count?: number
  forks_count?: number
  language?: string | null
  pushed_at?: string | null
  updated_at?: string | null
  created_at?: string | null
  full_name: string
  name: string
  owner: { login: string }
}

interface YamlConfig {
  name?: string
  slug?: string
  description?: string
  tech_stack?: string[]
  tags?: string[]
  live_url?: string | null
  repo_url?: string
  thumbnail?: string | null
  readme_path?: string
  created_at?: string | null
  updated_at?: string | null
  featured?: boolean
  is_active?: boolean
}

type Project = YamlConfig & {
  name: string
  slug: string
  description: string
  tech_stack: string[]
  tags: string[]
  repo_url: string
  stars?: number
  forks?: number
  language?: string | null
  is_active?: boolean
}

type PriorProjectsIndex = Record<string, Project>

const GH_PAT = process.env.GH_PAT
if (!GH_PAT) {
  console.error("GH_PAT missing")
  process.exit(1)
}

const OUTPUT_PROJECTS_PATH = process.env.OUTPUT_PROJECTS_PATH || "src/data/projects.json"
const OUTPUT_READMES_DIR = process.env.OUTPUT_READMES_DIR || "public/data/readmes"

const octokit = new Octokit({ auth: GH_PAT })

const ensureDir = async (dir: string) => {
  await fs.mkdir(dir, { recursive: true })
}

const loadPriorProjects = async (): Promise<PriorProjectsIndex> => {
  try {
    const buf = await fs.readFile(OUTPUT_PROJECTS_PATH, "utf8")
    return Object.fromEntries(JSON.parse(buf).map((p: Project) => [p.slug, p]))
  } catch {
    return {}
  }
}

const readRepoFile = async (owner: string, repo: string, filePath: string) => {
  try {
    const res = await octokit.repos.getContent({ owner, repo, path: filePath })
    if (!("content" in res.data)) return null
    return Buffer.from(res.data.content as string, "base64").toString("utf8")
  } catch (e: any) {
    if (e.status === 404) return null
    throw e
  }
}

const parseConfig = (text: string): Project => {
  const data = yaml.load(text) as YamlConfig
  return {
    name: data.name || "",
    slug: data.slug || "",
    description: data.description || "",
    tech_stack: Array.isArray(data.tech_stack) ? data.tech_stack : [],
    tags: Array.isArray(data.tags) ? data.tags : [],
    live_url: data.live_url || null,
    repo_url: data.repo_url || "",
    thumbnail: data.thumbnail || null,
    readme_path: data.readme_path || "README.md",
    created_at: data.created_at || null,
    updated_at: data.updated_at || null,
    featured: !!data.featured,
    is_active: data.is_active !== false
  }
}

const shouldInclude = (project: Project, repoMeta: GitHubRepo) => { return !repoMeta.private && !repoMeta.fork && (project.is_active !== false) }

const shouldUpdateReadme = (slug: string, project: Project, prior: PriorProjectsIndex) => {
  const prev = prior[slug]
  if (!prev) return true
  const prevUpdated = prev.updated_at ? Date.parse(prev.updated_at) : 0
  const currUpdated = project.updated_at ? Date.parse(project.updated_at) : 0
  return currUpdated > prevUpdated
}

const writeFileIfChanged = async (filePath: string, content: string) => {
  try {
    const prev = await fs.readFile(filePath, "utf8")
    if (prev === content) return false
  } catch {}
  await ensureDir(path.dirname(filePath))
  await fs.writeFile(filePath, content, "utf8")
  return true
}

const fileExists = async (p: string) => {
  try {
    await fs.access(p)
    return true
  } catch {
    return false
  }
}

const normalize = (s: string) => s.replace(/\r\n/g, "\n")

const main = async () => {
  const USERNAME = process.env.SCRAPE_GH_USERNAME || process.env.GH_USERNAME

  console.log(`Starting scrape for user: ${USERNAME}`)

  await ensureDir(path.dirname(OUTPUT_PROJECTS_PATH))
  await ensureDir(OUTPUT_READMES_DIR)

  const prior = await loadPriorProjects()

  const userRepos = await octokit.paginate(
    octokit.repos.listForUser,
    { username: USERNAME, per_page: 100 }
  )

  const orgs = await octokit.paginate(
    octokit.orgs.listForAuthenticatedUser,
    { per_page: 100 }
  )

  const orgRepos = (
    await Promise.all(
      orgs.map(org =>
        octokit.paginate(octokit.repos.listForOrg, {
          org: org.login,
          per_page: 100
        })
      )
    )
  ).flat()

  const repos = [...userRepos, ...orgRepos]
  console.log(`Fetched ${repos.length} repos`)

  const out: Project[] = []
  let updatedReadmeCount = 0

  for (const repo of repos) {
    const cfgText = await readRepoFile(repo.owner.login, repo.name, ".portfolio/config.yml")
    if (!cfgText) {
      console.log(`Skip: ${repo.full_name} (no .portfolio/config.yml)`)
      continue
    }

    const project = parseConfig(cfgText)
    if (!shouldInclude(project, repo)) {
      console.log(`Skip: ${repo.full_name} (not eligible)`)
      continue
    }

    project.stars = repo.stargazers_count || 0
    project.forks = repo.forks_count || 0
    project.language = repo.language || null
    project.slug = project.slug || repo.name.toLowerCase()
    project.updated_at =
      project.updated_at ||
      repo.pushed_at ||
      repo.updated_at ||
      repo.created_at ||
      new Date().toISOString()
    project.created_at =
      project.created_at ||
      repo.created_at ||
      new Date().toISOString()

    const mdPath = path.join(OUTPUT_READMES_DIR, `${project.slug}.md`)
    const needReadme =
      shouldUpdateReadme(project.slug, project, prior) ||
      !(await fileExists(mdPath))

    if (needReadme) {
      const readmeText = await readRepoFile(
        repo.owner.login,
        repo.name,
        project.readme_path || "README.md"
      )
      if (readmeText) {
        const changed = await writeFileIfChanged(mdPath, normalize(readmeText))
        if (changed) {
          updatedReadmeCount++
          console.log(`Updated README: ${repo.full_name}`)
        }
      }
    }

    out.push(project)
  }

  out.sort((a, b) => Date.parse(b.updated_at || "") - Date.parse(a.updated_at || ""))
  const json = JSON.stringify(out, null, 2)
  const projectsChanged = await writeFileIfChanged(OUTPUT_PROJECTS_PATH, json)

  console.log(`projects.json ${projectsChanged ? "updated" : "unchanged"}`)
  console.log(`readmes updated: ${updatedReadmeCount}`)
}

main().catch(e => {
  console.error(e)
  process.exit(1)
})
