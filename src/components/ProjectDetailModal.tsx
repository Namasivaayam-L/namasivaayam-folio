import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { FaGithub } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Badge } from "@/components/ui/badge";
import { Project } from "@/types/projects";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

interface ProjectDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project;
  allProjects: Project[];
  currentIndex: number;
  onNavigate: (index: number) => void;
}

export default function ProjectDetailModal({
  isOpen,
  onClose,
  project,
  allProjects,
  currentIndex,
  onNavigate,
}: ProjectDetailModalProps) {
  const [readmeContent, setReadmeContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load README content when project changes
 useEffect(() => {
    if (isOpen && project.slug) {
      setIsLoading(true);
      setError(null);
      
      fetch(`data/readmes/${project.slug}.md`)
        .then(response => {
          if (!response.ok) {
            throw new Error('README not found');
          }
          return response.text();
        })
        .then(content => {
          setReadmeContent(content);
          setIsLoading(false);
        })
        .catch(err => {
          console.error("Error loading README:", err);
          setError("README content not available");
          setIsLoading(false);
        });
    }
  }, [isOpen, project.slug]);

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        const newIndex = (currentIndex - 1 + allProjects.length) % allProjects.length;
        onNavigate(newIndex);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        const newIndex = (currentIndex + 1) % allProjects.length;
        onNavigate(newIndex);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentIndex, allProjects.length, onClose, onNavigate]);

  // Handle click outside
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
 };

  // Add overflow-hidden to body when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const canNavigateLeft = allProjects.length > 1;
  const canNavigateRight = allProjects.length > 1;

  return createPortal(
    <div
      className="fixed inset-0 z-[999999] bg-black/50 backdrop-blur-sm flex items-center justify-center"
      onClick={handleBackdropClick}
    >
      <div className="w-11/12 max-w-7xl bg-card border border-border rounded-lg shadow-2xl h-[80vh] flex">
        {/* Left Arrow Navigation */}
        {canNavigateLeft && (
          <button

            onClick={() => {
              const newIndex = (currentIndex - 1 + allProjects.length) % allProjects.length;
              onNavigate(newIndex);
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-background/80 hover:bg-background border border-border rounded-full p-2 shadow-lg transition-all"
            aria-label="Previous project"
          >
            <IoIosArrowBack className="w-6 h-6 text-foreground" />
          </button>
        )}

        {/* Right Arrow Navigation */}
        {canNavigateRight && (
          <button
            onClick={() => {
              const newIndex = (currentIndex + 1) % allProjects.length;
              onNavigate(newIndex);
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-background/80 hover:bg-background border border-border rounded-full p-2 shadow-lg transition-all"
            aria-label="Next project"
          >
            <IoIosArrowForward className="w-6 h-6 text-foreground" />
          </button>
        )}

        {/* Main Content - 80% */}
        <div className="w-4/5 h-full border-r border-border flex flex-col">
          {/* <div className="p-6 border-b border-border flex-shrink-0">
            <h2 className="text-2xl font-bold text-foreground">{project.name}</h2>
            <p className="text-muted-foreground mt-2">{project.description}</p>
          </div> */}
          
          <div className="flex-1 overflow-y-auto p-6">
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-muted-foreground">{error}</p>
              </div>
            ) : (
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={{
                  h1: ({ node, ...props }) => (
                    <h1 className="text-2xl font-bold mb-4 text-foreground" {...props} />
                  ),
                  h2: ({ node, ...props }) => (
                    <h2 className="text-xl font-semibold mb-3 text-foreground" {...props} />
                  ),
                  h3: ({ node, ...props }) => (
                    <h3 className="text-lg font-medium mb-2 text-foreground" {...props} />
                  ),
                  p: ({ node, ...props }) => (
                    <p className="mb-4 text-foreground leading-relaxed" {...props} />
                  ),
                  ul: ({ node, ...props }) => (
                    <ul className="mb-4 ml-6 space-y-2" {...props} />
                  ),
                  ol: ({ node, ...props }) => (
                    <ol className="mb-4 ml-6 space-y-2" {...props} />
                  ),
                  li: ({ node, ...props }) => (
                    <li className="text-foreground" {...props} />
                  ),
                  code: ({ node, inline, className, children, ...props }: any) => {
                    const childrenText = React.Children.toArray(children).map(child => 
                      typeof child === 'string' ? child : ''
                    ).join('');
                    
                    const isInlineCode = inline || !childrenText.includes('\n');
                    
                    if (isInlineCode) {
                      return (
                        <code
                          className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono"
                          {...props}
                        >
                          {children}
                        </code>
                      );
                    }
                    return (
                      <code
                        className="block bg-muted p-4 rounded-lg overflow-x-auto text-sm font-mono"
                        {...props}
                      >
                        {children}
                      </code>
                    );
                  },
                  pre: ({ node, ...props }) => (
                    <pre className="mb-4 bg-muted rounded-lg overflow-x-auto" {...props} />
                  ),
                  a: ({ node, ...props }) => (
                    <a
                      className="text-accent hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                      {...props}
                    />
                  ),
                  img: ({ node, ...props }) => (
                    <img
                      className="max-w-full h-auto rounded-lg my-4"
                      {...props}
                    />
                  ),
                  table: ({ node, ...props }) => (
                    <div className="overflow-x-auto my-4">
                      <table className="w-full border-collapse border-border" {...props} />
                    </div>
                  ),
                  th: ({ node, ...props }) => (
                    <th
                      className="border border-border px-3 py-2 bg-muted font-semibold text-left"
                      {...props}
                    />
                  ),
                  td: ({ node, ...props }) => (
                    <td
                      className="border border-border px-3 py-2 text-left"
                      {...props}
                    />
                  ),
                }}
              >
                {readmeContent}
              </ReactMarkdown>
            )}
          </div>
        </div>

        {/* Metadata Panel - 20% */}
        <div className="w-1/5 h-full flex flex-col">
          <div className="p-4 border-b border-border flex-shrink-0">
            <h3 className="font-semibold text-foreground">Project Info</h3>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {/* Stats */}
            <div className="space-y-3">
              <h4 className="font-medium text-foreground">Stats</h4>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Stars</span>
                <span className="font-medium">
                  {project.stars !== undefined ? project.stars : 0}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Forks</span>
                <span className="font-medium">
                  {project.forks !== undefined ? project.forks : 0}
                </span>
              </div>
              {(project.language || project.language !== undefined) && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Language</span>
                  <span className="font-medium">{project.language || 'N/A'}</span>
                </div>
              )}
            </div>

            {/* Links */}
            <div className="space-y-3">
              <h4 className="font-medium text-foreground">Links</h4>
              <div className="space-y-2">
                <a
                  href={project.repo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-accent hover:underline"
                >
                  <FaGithub className="w-4 h-4" />
                  <span>Repository</span>
                </a>
                {project.live_url && (
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-accent hover:underline"
                  >
                    <FiExternalLink className="w-4 h-4" />
                    <span>Live Demo</span>
                  </a>
                )}
              </div>
            </div>

            {/* Tech Stack */}
            <div className="space-y-3">
              <h4 className="font-medium text-foreground">Tech Stack</h4>
              <div className="flex flex-wrap gap-1">
                {project.tech_stack?.map((tech) => (
                  <Badge key={tech} variant="secondary" className="text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="space-y-3">
              <h4 className="font-medium text-foreground">Tags</h4>
              <div className="flex flex-wrap gap-1">
                {project.tags?.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
