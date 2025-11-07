import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HiMail } from "react-icons/hi";
import personalData from "@/data/personal.json";
import skillsData from "@/data/skills.json";
import awardsData from "@/data/awards.json";
import educationData from "@/data/education.json";

export default function About() {
  const awards = awardsData;
  const education = educationData;

  return (
    <div className="space-y-12 animate-fade-in">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-foreground">{personalData.name.split(" ")[0]}</h1>
        <p className="text-lg text-muted-foreground">{personalData.title}</p>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-2">
          {["React", "LLM", "FastAPI", "Next.js", "TypeScript", "PostgreSQL", "Redis"].map((tech) => (
            <Badge key={tech} variant="secondary">
              {tech}
            </Badge>
          ))}
        </div>
      </div>

      {/* Who I Am */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Who I Am</h2>
        <div className="text-muted-foreground space-y-4">
          <p>{personalData.summary}</p>
          <p>
            I've been coding since 2018, writing about AI, LLMs, frontend, backend, and databases. My journey has taken
            me from building small MVPs to leading production-scale AI systems.
          </p>
        </div>
      </section>

      {/* What I Do */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">What I Do</h2>
        <p className="text-muted-foreground">
          Currently a <span className="text-foreground font-medium">Software Engineer</span> at{" "}
          <a href="https://mrcooper.com" className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">
            Mr. Cooper
          </a>
          , building GenAI solutions for financial document processing.
        </p>
      </section>

      {/* Skills */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Skills</h2>
        <div className="space-y-4">
          {skillsData.categories.map((category) => (
            <div key={category.name} className="space-y-2">
              <h3 className="text-sm font-semibold text-foreground">{category.name}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <Badge key={skill} variant="outline">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Awards & Recognition</h2>
        <div className="space-y-4">
          {awards.map((award) => (
            <div key={award.title} className="bg-card border border-border rounded-lg p-6 space-y-2">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-foreground">{award.title}</h3>
                <span className="text-sm text-muted-foreground">{award.date}</span>
              </div>
              <p className="text-sm text-muted-foreground">{award.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Education</h2>
        <div className="bg-card border border-border rounded-lg p-6 space-y-2">
          <h3 className="font-semibold text-foreground">{education.degree}</h3>
          <p className="text-sm text-muted-foreground">{education.institution}</p>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <span>Graduated: {education.graduation}</span>
            <span>CGPA: {education.cgpa}</span>
          </div>
          <div className="text-sm text-muted-foreground">
            <span>Period: {education.period}</span>
          </div>
          <div className="text-sm text-muted-foreground">
            <span>Activities: {education.activities}</span>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Vision</h2>
        <p className="text-muted-foreground">
          LLMs and AI will automate the mundane and reshape how we work. I strive to stay at the forefront of this
          transformation, building tools that simplify people's lives.
        </p>
      </section>

      {/* Beyond Code */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Beyond Code</h2>
        <p className="text-muted-foreground">Love techno & house music, follow F1 (Max) and play chess.</p>
      </section>

      {/* CTA */}
      <div className="flex gap-4 pt-4">
        <Button asChild>
          <a href={personalData.links.discord} target="_blank" rel="noopener noreferrer">
            Get in Touch
          </a>
        </Button>
        <Button variant="outline" asChild>
          <a href={`mailto:${personalData.email}`}>
            <HiMail className="w-4 h-4 mr-2" />
            E-Mail
          </a>
        </Button>
      </div>
    </div>
  );
}
