import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { FaGithub, FaStar } from "react-icons/fa";
import { FiExternalLink, FiGitBranch } from "react-icons/fi";
import projectsData from "@/data/projects.json";
import { Project } from "@/types/projects";
import ProjectDetailModal from "@/components/ProjectDetailModal";

export default function Projects() {
  const typedProjectsData: Project[] = projectsData;
  const activeProjects = typedProjectsData
    .filter(project => project.is_active !== false)
    .sort((a: Project, b: Project) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
  
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

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-foreground">Projects</h1>
        <p className="text-muted-foreground">
          Playground - Small MVP to Production Apps
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {activeProjects.map((project, index) => (
          <div
            key={project.slug}
            className="group bg-card border border-border rounded-lg p-6 space-y-4 hover:shadow-lg transition-all animate-slide-in cursor-pointer"
            style={{ animationDelay: `${index * 100}ms` }}
            onClick={() => openModal(project, index)}
          >
            <div className="space-y-2">
              <div className="flex items-start justify-between">
                <h3 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors">
                  {project.name}
                </h3>
              </div>
              <p className="text-sm text-muted-foreground">{project.description}</p>
            </div>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2">
              {project.tech_stack.map((tech) => (
                <Badge key={tech} variant="secondary" className="text-xs">
                  {tech}
                </Badge>
              ))}
            </div>

            {/* Category Tags */}
            <div className="flex flex-wrap gap-2 pt-2">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Links with Stats */}
            <div className="flex items-center justify-between pt-2">
              <a
                href={project.repo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm text-accent hover:underline"
                onClick={(e) => e.stopPropagation()}
              >
                <FaGithub className="w-4 h-4" />
              </a>
              
              <div className="flex items-center gap-3">
                {project.stars !== undefined && (
                  <div className="inline-flex items-center text-sm text-muted-foreground">
                    <FaStar className="w-4 h-4 mr-1 text-yellow-500" />
                    {project.stars}
                  </div>
                )}
                
                {project.forks !== undefined && (
                  <div className="inline-flex items-center text-sm text-muted-foreground">
                    <FiGitBranch className="w-4 h-4 mr-1" />
                    {project.forks}
                  </div>
                )}
              </div>
              
              <a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm text-accent hover:underline"
                onClick={(e) => e.stopPropagation()}
              >
                <FiExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        ))}
      </div>

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
