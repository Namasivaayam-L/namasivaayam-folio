import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { FaGithub, FaStar } from "react-icons/fa";
import { FiExternalLink, FiGitBranch } from "react-icons/fi";
import projectsData from "@/data/projects.json";
import { Project } from "@/types/projects";
import ProjectDetailModal from "@/components/ProjectDetailModal";

/** Capability categories for grouping the independent work. */
const CATEGORIES = [
  {
    name: "Agentic & LLM Systems",
    blurb: "Multi-step LLM systems: agents, RAG, and human-in-the-loop control.",
    slugs: ["agent-llama-index", "quantum-tutor", "shelf-scanner"],
  },
  {
    name: "ML & RL Research",
    blurb: "Learning systems built to be measured — reinforcement learning and retrieval.",
    slugs: ["atsc-transformer-dqn-petting-zoo-pytorch", "logar"],
  },
  {
    name: "Web & Product Engineering",
    blurb: "Full-stack products shipped end to end.",
    slugs: ["erp-ads-dept", "mscs-crcs-competition", "stack-overflow-clone"],
  },
] as const;

const typedProjectsData: Project[] = projectsData;
const activeProjects = typedProjectsData
  .filter((project) => project.is_active !== false)
  .sort((a: Project, b: Project) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());

function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: (project: Project, index: number) => void;
}) {
  const globalIndex = activeProjects.findIndex((p) => p.slug === project.slug);

  return (
    <div
      className="group bg-card border border-border rounded-lg p-6 flex flex-col justify-between gap-2 hover:shadow-lg transition-all animate-slide-in cursor-pointer"
      style={{ animationDelay: `${index * 100}ms` }}
      onClick={() => onOpen(project, globalIndex)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen(project, globalIndex);
        }
      }}
      aria-label={`${project.name} — view details`}
    >
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors">
          {project.name}
        </h3>
        <p className="text-sm text-muted-foreground">{project.description}</p>
      </div>

      {/* Tech Stack */}
      <div className="flex flex-wrap gap-2">
        {project.tech_stack.slice(0, 5).map((tech) => (
          <Badge key={tech} variant="secondary" className="text-xs">
            {tech}
          </Badge>
        ))}
        {project.tech_stack.length > 5 && (
          <span className="text-xs text-muted-foreground self-center">
            +{project.tech_stack.length - 5} more
          </span>
        )}
      </div>

      {/* Links with Stats */}
      <div className="flex items-center justify-between">
        {project.repo_url && (
          <a
            href={project.repo_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm text-accent hover:underline"
            onClick={(e) => e.stopPropagation()}
            aria-label={`${project.name} source code`}
          >
            <FaGithub className="w-4 h-4" />
          </a>
        )}

        <div className="flex items-center gap-3">
          {project.stars !== undefined && project.stars > 0 && (
            <div className="inline-flex items-center text-sm text-muted-foreground">
              <FaStar className="w-4 h-4 mr-1 text-yellow-500" aria-hidden="true" />
              {project.stars}
            </div>
          )}

          {project.forks !== undefined && project.forks > 0 && (
            <div className="inline-flex items-center text-sm text-muted-foreground">
              <FiGitBranch className="w-4 h-4 mr-1" aria-hidden="true" />
              {project.forks}
            </div>
          )}
        </div>

        {project.live_url && (
          <a
            href={project.live_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm text-accent hover:underline"
            onClick={(e) => e.stopPropagation()}
            aria-label={`${project.name} live demo`}
          >
            <FiExternalLink className="w-4 h-4" />
          </a>
        )}
      </div>
    </div>
  );
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);

  const openModal = (project: Project, index: number) => {
    setSelectedProject(project);
    setCurrentProjectIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const navigateProject = (index: number) => {
    setCurrentProjectIndex(index);
    setSelectedProject(activeProjects[index]);
  };

  // Projects not claimed by any category still get shown.
  const claimedSlugs = new Set(CATEGORIES.flatMap((c) => c.slugs));
  const uncategorized = activeProjects.filter((p) => !claimedSlugs.has(p.slug));

  return (
    <div className="space-y-10 animate-fade-in">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-foreground">Independent Work</h1>
        <p className="text-muted-foreground max-w-2xl">
          Work I ship outside my day job — from agentic systems and retrieval to reinforcement
          learning research and full-stack products. Click any project to read its README.
        </p>
      </div>

      {/* Category sections */}
      {CATEGORIES.map((category, catIdx) => {
        const categoryProjects = category.slugs
          .map((slug) => activeProjects.find((p) => p.slug === slug))
          .filter((p): p is Project => Boolean(p));

        if (categoryProjects.length === 0) return null;

        return (
          <section key={category.name} className="space-y-5">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-foreground">{category.name}</h2>
              <p className="text-sm text-muted-foreground">{category.blurb}</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {categoryProjects.map((project, index) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  index={catIdx * 2 + index}
                  onOpen={openModal}
                />
              ))}
            </div>
          </section>
        );
      })}

      {/* Uncategorized fallback */}
      {uncategorized.length > 0 && (
        <section className="space-y-5">
          <h2 className="text-2xl font-bold text-foreground">More</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {uncategorized.map((project, index) => (
              <ProjectCard
                key={project.slug}
                project={project}
                index={index}
                onOpen={openModal}
              />
            ))}
          </div>
        </section>
      )}

      {/* Project Detail Modal */}
      {selectedProject && (
        <ProjectDetailModal
          isOpen={isModalOpen}
          onClose={closeModal}
          project={selectedProject}
          allProjects={activeProjects}
          currentIndex={currentProjectIndex}
          onNavigate={navigateProject}
        />
      )}
    </div>
  );
}
