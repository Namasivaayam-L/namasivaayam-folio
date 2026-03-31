import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { HiMail } from "react-icons/hi";
import personalData from "@/data/personal.json";
import awardsData from "@/data/awards.json";
import educationData from "@/data/education.json";

export default function About() {
  const awards = awardsData;
  const education = educationData;

  return (
    <div className="space-y-12 animate-fade-in">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-foreground">{personalData.name}</h1>
        <p className="text-lg text-muted-foreground">{personalData.title}</p>
      </div>

      {/* Who I Am */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Who I Am</h2>
        <div className="text-muted-foreground space-y-4">
          <p>{personalData.summary}</p>
          <p>
            I've been coding since 2018, working on Fullstack Websites, traditional ML, LLMs and databases. My journey has taken
            me from building small MVPs to leading production-scale AI systems.
          </p>
        </div>
      </section>

      {/* What I Do */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">What I Do</h2>
        <p className="text-muted-foreground">
          Currently a <span className="text-foreground font-medium">Software Engineer I</span> at{" "}
          <a href="https://mrcooper.com" className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">
            Mr. Cooper
          </a>
          , building GenAI solutions for financial document processing.
        </p>
      </section>


      {/* Vision */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Vision</h2>
        <p className="text-muted-foreground">
          LLMs and AI will automate the mundane and reshape how we work. I strive to stay at the forefront of this
          transformation, building models and tools that simplify people's lives.
        </p>
      </section>

      {/* Beyond Code */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Beyond Code</h2>
        <p className="text-muted-foreground">I'm a tech enthusiast who enjoys exploring and tinkering with smartphones, laptops, and PCs.</p>
      </section>

      {/* CTA */}
      <div className="flex gap-4 pt-4">
          <Button asChild>
            <Link to="/contact">Get In Touch</Link>
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
