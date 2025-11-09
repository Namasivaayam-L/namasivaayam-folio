import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { HiMail } from "react-icons/hi";
import { FiExternalLink } from "react-icons/fi";
import personalData from "@/data/personal.json";
import projectsData from "@/data/projects.json";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  const featuredProjects = projectsData.slice(0, 3);

  return (
    <div className="space-y-16 animate-fade-in">
      {/* Hero Section */}
      <section className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-5xl font-bold text-foreground">
            Hey, I'm {personalData.name.split(" ")[0]}
          </h1>
          <p className="text-2xl text-muted-foreground">{personalData.title}</p>
        </div>

        {/* Social CTA */}
        <div className="flex items-center gap-4 p-4 bg-card border border-border rounded-lg">
          <div className="flex-1">
            <p className="text-sm text-foreground">Connect with me on Discord, LinkedIn for discussion related to Agents, Finetuning, RAG,..</p>
          </div>
          <Button size="sm" variant="default" asChild>
            <a href={personalData.links.discord} target="_blank" rel="noopener noreferrer">
              Discord
            </a>
          </Button>
          <Button size="sm" variant="default" asChild>
            <a href={personalData.links.linkedin} className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </Button>
        </div>

        {/* Summary */}
        <div className="space-y-4 text-muted-foreground">
          <p>
            I turn <span className="text-foreground font-medium">fuzzy ideas</span> into live Products{" "}
            <span className="italic">(quickly)</span> full-stack AI Builder.
          </p>
          <p>
            Currently working as a <span className="text-foreground font-medium">Software Engineer</span> at{" "}
            <a href="https://mrcooper.com" className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">
              Mr. Cooper
            </a>
          </p>
          <p>
            I have built multiple projects in past 2 years.{" "}
            <span className="text-foreground font-medium">Developed and proved out a GenAI proof-of-concept</span>, directly contributing to a <span className="text-foreground font-medium">10x</span> improvement for model accuracy in extraction <span className="text-foreground font-medium">(9% to 90%)</span> or Financial docs like Paystubs.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex gap-4">
          <Button asChild>
            <Link to="/contact">Contact</Link>
          </Button>
          <Button variant="outline" asChild>
            <a href={`mailto:${personalData.email}`}>
              <HiMail className="w-4 h-4 mr-2" />
              E-Mail
            </a>
          </Button>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-foreground">Featured Projects</h2>
          <Link to="/projects" className="text-sm text-accent hover:underline">
            View all →
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {featuredProjects.map((project) => (
            <div
              key={project.id}
              className="group p-6 bg-card border border-border rounded-lg hover:shadow-md transition-all"
            >
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2">{project.description}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm text-accent hover:underline"
                  >
                    View on GitHub
                    <FiExternalLink className="w-3 h-3 ml-1" />
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
