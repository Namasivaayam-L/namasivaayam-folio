import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { HiMail, HiDownload } from "react-icons/hi";
import personalData from "@/data/personal.json";
import { RESUME_URL, RESUME_FILENAME } from "@/lib/links";

/** Short tooling inventory folded in from the retired Tools page. */
const tooling = [
  {
    group: "Everyday",
    items: ["VS Code", "GitHub", "GitHub Copilot", "Cline", "Linux", "Bash"],
  },
  {
    group: "ML & data",
    items: ["Hugging Face", "Jupyter", "DataGrip"],
  },
  {
    group: "Ship it",
    items: ["Docker", "GitHub Actions", "GKE"],
  },
];

export default function About() {
  return (
    <div className="space-y-12 animate-fade-in">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-foreground">{personalData.name}</h1>
        <p className="text-lg text-muted-foreground">{personalData.title}</p>
        <p className="text-sm text-muted-foreground">{personalData.location}</p>
      </div>

      {/* Who I am */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Who I am</h2>
        <div className="text-muted-foreground space-y-4 max-w-2xl">
          <p>{personalData.summary}</p>
          <p>
            I've been coding since 2018 — starting with full-stack web apps, moving into
            traditional ML, and now building production GenAI systems. The constant across all of
            it: I like taking something that works in a notebook and making it hold up in the
            real world.
          </p>
        </div>
      </section>

      {/* What I do */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">What I do</h2>
        <p className="text-muted-foreground max-w-2xl">
          Currently a <span className="text-foreground font-medium">Software Engineer I</span> at{" "}
          <a
            href="https://rocket.com/"
            className="text-accent hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Rocket, India
          </a>
          , building production GenAI systems for financial document processing — multi-agent
          orchestration, LLM extraction pipelines, and model evaluation.{" "}
          <Link to="/experience" className="text-accent hover:underline">
            See the case studies →
          </Link>
        </p>
      </section>

      {/* Tooling & workflow */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Tooling & workflow</h2>
        <p className="text-muted-foreground max-w-2xl">
          The short list of what I reach for day to day.
        </p>
        <div className="grid gap-4 sm:grid-cols-3">
          {tooling.map((group) => (
            <div key={group.group} className="bg-card border border-border rounded-lg p-5 space-y-2">
              <h3 className="text-sm font-semibold text-foreground">{group.group}</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Vision */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">What I'm after</h2>
        <p className="text-muted-foreground max-w-2xl">
          AI systems earn their place when they measurably change a workflow — not when they
          demo well. I want to keep building the layer that makes that happen: evaluation,
          orchestration, and the unglamorous engineering that turns an accuracy number into
          something a business runs on.
        </p>
      </section>

      {/* Beyond code */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Beyond code</h2>
        <p className="text-muted-foreground max-w-2xl">
          I tinker with smartphones, laptops, and PCs — hardware as much as software. Off the
          clock you'll also find me writing:{" "}
          <a
            href="https://namasivaayaml.hashnode.dev/"
            className="text-accent hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Hashnode
          </a>{" "}
          and my{" "}
          <a
            href={personalData.links.linkedin}
            className="text-accent hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          .
        </p>
      </section>

      {/* CTA */}
      <div className="flex flex-wrap gap-4 pt-4">
        <Button asChild>
          <Link to="/contact">Get in touch</Link>
        </Button>
        <Button variant="outline" asChild>
          <a href={`mailto:${personalData.email}`}>
            <HiMail className="w-4 h-4 mr-2" />
            Email
          </a>
        </Button>
        <Button variant="outline" asChild>
          <a href={RESUME_URL} download={RESUME_FILENAME}>
            <HiDownload className="w-4 h-4 mr-2" />
            Download résumé
          </a>
        </Button>
      </div>
    </div>
  );
}
