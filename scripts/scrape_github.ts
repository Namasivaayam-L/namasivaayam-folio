// scripts/scrape_github.ts
import { Octokit } from "@octokit/rest"
import * as fs from "fs/promises"
import * as path from "path"
import yaml from "js-yaml"

interface GitHubRepo {
  private: boolean;
  fork: boolean;
  stargazers_count?: number;
  forks_count?: number;
  language?: string | null;
  pushed_at?: string | null;
  updated_at?: string | null;
  created_at?: string | null;
  full_name: string;
  name: string;
  owner: {
    login: string;
  };
}

interface YamlConfig {
  name?: string;
  slug?: string;
 description?: string;
 tech_stack?: string[];
  tags?: string[];
  live_url?: string | null;
  repo_url?: string;
  thumbnail?: string | null;
  readme_path?: string;
  created_at?: string | null;
  updated_at?: string | null;
  featured?: boolean;
  is_active?: boolean;
}

type Project = YamlConfig & {
  name: string;
  slug: string;
  description: string;
  tech_stack: string[];
  tags: string[];
  repo_url: string;
  stars?: number;
  forks?: number;
  language?: string | null;
  is_active?: boolean;
}

type PriorProjectsIndex = Record<string, Project>

const GH_TOKEN = process.env.GITHUB_TOKEN || process.env.GH_TOKEN
if (!GH_TOKEN) {
  console.error("GITHUB_TOKEN missing")
  process.exit(1)
}

const USERNAME = process.env.SCRAPE_GH_USERNAME
if (!USERNAME) {
  console.error("SCRAPE_GH_USERNAME missing")
  process.exit(1)
}

const OUTPUT_PROJECTS_PATH = process.env.OUTPUT_PROJECTS_PATH || "src/data/projects.json"
const OUTPUT_READMES_DIR = process.env.OUTPUT_READMES_DIR || "src/data/readmes"

const octokit = new Octokit({ auth: GH_TOKEN })

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

const readRepoFile = async (owner: string, repo: string, filePath: string): Promise<{ content: string; sha: string } | null> => {
  try {
    const res = await octokit.repos.getContent({ owner, repo, path: filePath })
    if (!("content" in res.data)) return null
    const content = Buffer.from(res.data.content as string, "base64").toString("utf8")
    const sha = (res.data.sha as string) || ""
    return { content, sha }
  } catch (e: unknown) {
    if (e && typeof e === 'object' && 'status' in e && (e as { status: number }).status === 404) return null
    throw e
  }
}

const parseConfig = (text: string): Project => {
  const data = yaml.load(text);
  if (!data || typeof data !== 'object') {
    throw new Error('Invalid configuration format');
  }
  
  const config = data as YamlConfig;
  
  return {
    name: config.name || '',
    slug: config.slug || '',
    description: config.description || '',
    tech_stack: Array.isArray(config.tech_stack) ? config.tech_stack : [],
    tags: Array.isArray(config.tags) ? config.tags : [],
    live_url: config.live_url || null,
    repo_url: config.repo_url || '',
    thumbnail: config.thumbnail || null,
    readme_path: config.readme_path || "README.md",
    created_at: config.created_at || null,
    updated_at: config.updated_at || null,
    featured: !!config.featured,
    is_active: config.is_active !== undefined ? !!config.is_active : true
  }
}

const shouldInclude = (project: Project, repoMeta: GitHubRepo) => {
  return !repoMeta.private && !repoMeta.fork && (project.is_active !== false)
}

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
  } catch {
    // If file doesn't exist or can't be read, proceed to write
  }
  await ensureDir(path.dirname(filePath))
  await fs.writeFile(filePath, content, "utf8")
  return true
}

const main = async () => {
  console.log(`Starting scrape for user: ${USERNAME}`)
  await ensureDir(path.dirname(OUTPUT_PROJECTS_PATH))
  await ensureDir(OUTPUT_READMES_DIR)
  const prior = await loadPriorProjects()
  const repos = await octokit.paginate(octokit.repos.listForUser, { username: USERNAME, per_page: 100, type: "owner", sort: "updated" })
  console.log(`Fetched ${repos.length} repos`)
  const out: Project[] = []
  let updatedReadmeCount = 0
  for (const repo of repos) {
    const configRes = await readRepoFile(repo.owner.login, repo.name, ".portfolio/config.yml")
    if (!configRes) {
      console.log(`Skip: ${repo.full_name} (no .portfolio/config.yml)`)
      continue
    }
    const project = parseConfig(configRes.content)
    if (!shouldInclude(project, repo)) {
      console.log(`Skip: ${repo.full_name} (not eligible by tags/fork/private)`)
      continue
    }
    project.stars = repo.stargazers_count || 0
    project.forks = repo.forks_count || 0
    project.language = repo.language || null
    project.updated_at = project.updated_at || repo.pushed_at || repo.updated_at || repo.created_at || new Date().toISOString()
    project.created_at = project.created_at || repo.created_at || new Date().toISOString()
    project.slug = project.slug || repo.name.toLowerCase()
    const needReadmeUpdate = shouldUpdateReadme(project.slug, project, prior) || !(await fileExists(path.join(OUTPUT_READMES_DIR, `${project.slug}.md`)))
    if (needReadmeUpdate) {
      const readmePath = project.readme_path || "README.md"
      const readmeRes = await readRepoFile(repo.owner.login, repo.name, readmePath)
      if (readmeRes) {
        const mdPath = path.join(OUTPUT_READMES_DIR, `${project.slug}.md`)
        const changed = await writeFileIfChanged(mdPath, normalizeLineEndings(readmeRes.content))
        if (changed) {
          updatedReadmeCount++
          console.log(`Updated README: ${repo.full_name} -> ${mdPath}`)
        } else {
          console.log(`No change in README: ${repo.full_name}`)
        }
      } else {
        console.log(`README missing at ${readmePath} for ${repo.full_name}`)
      }
    } else {
      console.log(`Skip README fetch (unchanged): ${repo.full_name}`)
    }
    out.push(project)
  }
  out.sort((a, b) => {
    const da = a.updated_at ? Date.parse(a.updated_at) : 0
    const db = b.updated_at ? Date.parse(b.updated_at) : 0
    return db - da
  })
  const json = JSON.stringify(out, null, 2)
  const changedProjects = await writeFileIfChanged(OUTPUT_PROJECTS_PATH, json)
  console.log(`projects.json ${changedProjects ? "updated" : "unchanged"}`)
  console.log(`readmes updated: ${updatedReadmeCount}`)
}

const fileExists = async (p: string) => {
  try {
    await fs.access(p)
    return true
  } catch {
    // If file doesn't exist or can't be accessed, return false
    return false
  }
}

const normalizeLineEndings = (s: string) => s.replace(/\r\n/g, "\n")

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
