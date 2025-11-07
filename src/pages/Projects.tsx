import { Badge } from "@/components/ui/badge";
import { FaGithub } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import projectsData from "@/data/projects.json";

export default function Projects() {
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
        {projectsData.map((project, index) => (
          <div
            key={project.id}
            className="group bg-card border border-border rounded-lg p-6 space-y-4 hover:shadow-lg transition-all animate-slide-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="space-y-2">
              <div className="flex items-start justify-between">
                <h3 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
                {project.status && (
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      project.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {project.status}
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground">{project.description}</p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Category Badge */}
            {project.category && (
              <div className="pt-2">
                <Badge variant="outline" className="text-xs">
                  {project.category}
                </Badge>
              </div>
            )}

            {/* Links */}
            <div className="flex gap-4 pt-2">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm text-accent hover:underline"
                >
                  <FaGithub className="w-4 h-4 mr-1" />
                  GitHub
                </a>
              )}
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm text-accent hover:underline"
                >
                  <FiExternalLink className="w-4 h-4 mr-1" />
                  Visit
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
