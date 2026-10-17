import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FiExternalLink } from "react-icons/fi";
import { FaGithub } from "react-icons/fa";
import { HiDownload } from "react-icons/hi";
import personalData from "@/data/personal.json";
import experienceData from "@/data/experience.json";
import projectsData from "@/data/projects.json";
import { Project } from "@/types/projects";
import { ExperienceEntry } from "@/types/experience";
import WorkflowDiagram from "@/components/WorkflowDiagram";
import { RESUME_URL, RESUME_FILENAME } from "@/lib/links";

const typedExperience: ExperienceEntry[] = experienceData;
const typedProjects: Project[] = projectsData;

/** Impact metrics shown in the hero — all substantiated in the résumé. */
const headlineMetrics = [
  { value: "9% → 90%", label: "Document extraction accuracy" },
  { value: "67%", label: "Reduction in manual processing effort" },
  { value: "15+", label: "Financial document types processed" },
];

/** Independent projects featured in "Outside the Day Job". */
const featuredProjectSlugs = ["agent-llama-index", "atsc-transformer-dqn-petting-zoo-pytorch", "shelf-scanner"];

export default function Home() {
  const currentRole = typedExperience[0]?.roles[0];
  const workstreams = currentRole?.workstreams ?? [];
  const outsideProjects = typedProjects.filter((project) => featuredProjectSlugs.includes(project.slug));

  return (
    <div className="space-y-20 animate-fade-in">
      {/* Hero */}
      <section className="space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground leading-tight">
            I build AI systems that survive production.
          </h1>
          <p className="text-lg text-muted-foreground">
            Machine Learning Engineer · Generative AI · Agentic Systems · ML Evaluation
          </p>
        </div>

        <div className="space-y-4 text-muted-foreground max-w-2xl">
          <p>
            I work on production AI systems across document intelligence, multi-agent orchestration,
            and LLM evaluation—turning experimental ideas into measurable improvements in real
            workflows.
          </p>
          <p>
            Currently a{" "}
            <span className="text-foreground font-medium">Software Engineer I</span> at{" "}
            <a
              href={personalData.links.linkedin}
              className="text-accent hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Rocket, India
            </a>
            .
          </p>
        </div>

        {/* Impact metrics */}
        <dl className="grid gap-4 sm:grid-cols-3">
          {headlineMetrics.map((metric) => (
            <div
              key={metric.label}
              className="bg-card border border-border rounded-lg p-5 flex flex-col gap-1"
            >
              <dt className="sr-only">{metric.label}</dt>
              <dd>
                <span className="block text-3xl font-bold text-foreground">{metric.value}</span>
                <span className="block text-sm text-muted-foreground mt-1">{metric.label}</span>
              </dd>
            </div>
          ))}
        </dl>

        {/* CTAs */}
        <div className="flex flex-wrap gap-3">
          <Button asChild>
            <Link to="/experience">Explore Experience</Link>
          </Button>
          <Button variant="outline" asChild>
            <a href={RESUME_URL} download={RESUME_FILENAME}>
              <HiDownload className="w-4 h-4 mr-2" />
              Download Résumé
            </a>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/contact">Contact</Link>
          </Button>
        </div>
      </section>

      {/* Production AI workflow diagram */}
      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-foreground">How production AI actually runs</h2>
          <p className="text-muted-foreground max-w-2xl">
            Demos end at the model. Production systems keep going—validation, human review, and
            measuring whether it still works. This is the lifecycle I build around.
          </p>
        </div>
        <WorkflowDiagram />
      </section>

      {/* Production Systems */}
      <section className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-foreground">Production systems I've built</h2>
          <Link to="/experience" className="text-sm text-accent hover:underline">
            Full case studies →
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {workstreams.map((workstream) => (
            <Link
              key={workstream.id}
              to="/experience"
              className="group bg-card border border-border rounded-lg p-6 flex flex-col gap-4 hover:shadow-lg transition-all"
            >
              <div>
                <h3 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors">
                  {workstream.name}
                </h3>
                <p className="text-sm text-muted-foreground">{workstream.subtitle}</p>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                {workstream.outcome}
              </p>
              <div className="flex flex-wrap gap-2">
                {workstream.stack.slice(0, 2).map((tech) => (
                  <Badge key={tech} variant="secondary" className="text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Career timeline */}
      {typedExperience.map((entry: ExperienceEntry) => (
        <section key={entry.id} className="space-y-6">
          <h2 className="text-2xl font-bold text-foreground">The journey so far</h2>
          <div className="relative space-y-6 before:absolute before:left-0 before:top-0 before:h-full before:w-px before:bg-border">
            {entry.roles.map((role) => (
              <div key={role.id} className="relative pl-6">
                <div className="absolute left-0 top-1.5 -translate-x-1/2 w-2 h-2 rounded-full bg-accent" />
                <p className="text-xs text-muted-foreground">{role.period}</p>
                <p className="font-semibold text-foreground">
                  {role.title} · {entry.company}
                </p>
                {role.summary && (
                  <p className="text-sm text-muted-foreground mt-1 max-w-2xl">{role.summary}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* Outside the Day Job */}
      <section className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-foreground">Outside the day job</h2>
          <Link to="/projects" className="text-sm text-accent hover:underline">
            All independent work →
          </Link>
        </div>
        <p className="text-muted-foreground max-w-2xl">
          Personal projects and open source—where I explore agentic systems, retrieval, and
          reinforcement learning end to end.
        </p>
        <div className="grid gap-6 md:grid-cols-3">
          {outsideProjects.map((project) => (
            <div
              key={project.slug}
              className="group bg-card border border-border rounded-lg p-5 flex flex-col gap-3 hover:shadow-lg transition-all"
            >
              <div className="flex-1">
                <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors">
                  {project.name}
                </h3>
                <p className="text-sm text-muted-foreground mt-2 line-clamp-3">
                  {project.description}
                </p>
              </div>
              <div className="flex items-center gap-3">
                {project.repo_url && (
                  <a
                    href={project.repo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm text-accent hover:underline"
                    aria-label={`${project.name} source code`}
                  >
                    <FaGithub className="w-4 h-4" />
                  </a>
                )}
                {project.live_url && (
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm text-accent hover:underline"
                    aria-label={`${project.name} live demo`}
                  >
                    <FiExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
