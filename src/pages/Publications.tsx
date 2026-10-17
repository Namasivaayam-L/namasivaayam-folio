import { useState } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import publicationsData from "@/data/publications.json";
import { Publication } from "@/types/awards";
import { ExternalLink, Copy, Check } from "lucide-react";
import projectsData from "@/data/projects.json";
import { Project } from "@/types/projects";

const typedPublications: Publication[] = publicationsData;
const typedProjects: Project[] = projectsData;

function BibTeXBlock({ bibtex }: { bibtex: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(bibtex);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable (e.g. non-secure context) — fall through silently.
    }
  };

  return (
    <div className="rounded-lg border border-border bg-muted/40">
      <div className="flex items-center justify-between px-4 py-2 border-b border-border">
        <span className="text-xs font-medium text-muted-foreground">BibTeX</span>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
          aria-label={copied ? "BibTeX copied" : "Copy BibTeX"}
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-accent" aria-hidden="true" />
              <span>Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="p-4 text-xs text-muted-foreground overflow-x-auto">
        <code>{bibtex}</code>
      </pre>
    </div>
  );
}

function PublicationCard({ publication }: { publication: Publication }) {
  const [showAbstract, setShowAbstract] = useState(false);
  const relatedProject = publication.relatedSlug
    ? typedProjects.find((p) => p.slug === publication.relatedSlug)
    : undefined;

  return (
    <article className="bg-card border border-border rounded-lg p-6 space-y-5">
      {/* Title */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-foreground leading-snug">
          {publication.title}
        </h2>
        <p className="text-sm text-muted-foreground">
          {publication.authors.join(", ")}
          {publication.authorNote && (
            <span className="text-muted-foreground/80"> — {publication.authorNote}</span>
          )}
        </p>
      </div>

      {/* Venue metadata */}
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="secondary" className="text-xs">
          {publication.publisher ?? "IEEE"}
        </Badge>
        <Badge variant="outline" className="text-xs">
          {publication.year}
        </Badge>
        {publication.doi && (
          <span className="text-xs text-muted-foreground font-mono">DOI: {publication.doi}</span>
        )}
      </div>

      <p className="text-sm text-muted-foreground">{publication.conference}</p>
      {publication.venue && (
        <p className="text-sm text-muted-foreground">{publication.venue}</p>
      )}

      {/* Summary / abstract */}
      {publication.summary && (
        <p className="text-sm text-muted-foreground leading-relaxed">{publication.summary}</p>
      )}

      {publication.abstract && (
        <div className="text-sm">
          <button
            type="button"
            onClick={() => setShowAbstract(!showAbstract)}
            className="inline-flex items-center gap-1.5 font-medium text-foreground hover:text-accent transition-colors"
            aria-expanded={showAbstract}
          >
            {showAbstract ? "Hide abstract" : "Show abstract"}
          </button>
          {showAbstract && (
            <p className="mt-2 text-muted-foreground leading-relaxed italic border-l-2 border-border pl-3">
              {publication.abstract}
            </p>
          )}
        </div>
      )}

      {/* Links */}
      <div className="flex flex-wrap items-center gap-3">
        <Button variant="outline" size="sm" asChild>
          <a href={publication.link} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="w-4 h-4 mr-2" />
            View on IEEE Xplore
          </a>
        </Button>
        {publication.doiUrl && (
          <a
            href={publication.doiUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-accent hover:underline"
          >
            doi.org
          </a>
        )}
        {relatedProject && (
          <Link to="/projects" className="text-sm text-accent hover:underline">
            Code: {relatedProject.name} →
          </Link>
        )}
      </div>

      {/* BibTeX */}
      {publication.bibtex && <BibTeXBlock bibtex={publication.bibtex} />}
    </article>
  );
}

export default function Publications() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-foreground">Publications</h1>
        <p className="text-muted-foreground max-w-2xl">
          Peer-reviewed research in reinforcement learning for traffic signal control — the
          academic foundation under the multi-agent RL work in my independent projects.
        </p>
      </div>

      <div className="space-y-6">
        {typedPublications.map((publication) => (
          <PublicationCard key={publication.doi ?? publication.title} publication={publication} />
        ))}
      </div>

      {typedPublications.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No publications yet. Check back soon!</p>
        </div>
      )}
    </div>
  );
}
