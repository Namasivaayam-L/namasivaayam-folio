import { useState } from "react";
import { Check, Copy, ExternalLink } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import Reveal from "@/components/Reveal";
import publicationsData from "@/data/publications.json";

const publication = publicationsData[0];

export default function Publications() {
  const [copied, setCopied] = useState(false);

  const copyBibtex = async () => {
    try {
      await navigator.clipboard.writeText(publication.bibtex);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* Clipboard unavailable — the BibTeX stays visible in the details block. */
    }
  };

  return (
    <section id="publications" className="px-4 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeader index="06" label="PEER-REVIEWED" title="Publications" />

        <Reveal className="mt-10 rounded-xl border-2 border-foreground bg-card p-6 shadow-brutal transition-all duration-300 hover:-translate-y-1 hover:shadow-brutal-lg md:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border-2 border-foreground bg-secondary px-3 py-1 font-mono text-[11px] font-bold text-secondary-foreground shadow-brutal-xs">
              {publication.publisher}
            </span>
            <span className="rounded-full border-2 border-foreground bg-band px-3 py-1 font-mono text-[11px] font-bold shadow-brutal-xs">
              {publication.year}
            </span>
            <span className="rounded-full border-2 border-foreground bg-card px-3 py-1 font-mono text-[11px] font-bold shadow-brutal-xs">
              {publication.conference.split("(")[0].trim()}
            </span>
          </div>

          <h3 className="mt-5 text-xl font-bold leading-snug md:text-2xl">{publication.title}</h3>

          <p className="mt-3 text-sm font-semibold">{publication.authors.join(", ")}</p>
          <p className="font-mono text-xs text-muted-foreground">{publication.authorNote}</p>

          <p className="mt-4 font-mono text-xs font-bold uppercase tracking-widest text-muted-foreground">
            {publication.venue}
          </p>

          <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-muted-foreground">{publication.summary}</p>

          <details className="group mt-5 max-w-3xl border-t border-border pt-4">
            <summary className="cursor-pointer list-none text-sm font-medium transition-colors hover:text-foreground">
              Abstract
              <span className="ml-2 text-muted-foreground transition-transform group-open:rotate-90">›</span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{publication.abstract}</p>
          </details>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href={publication.link}
              target="_blank"
              rel="noopener noreferrer"
              className="press-effect inline-flex items-center gap-2 rounded-xl border-[3px] border-foreground bg-foreground px-5 py-2.5 text-sm font-bold text-background shadow-brutal-sm"
            >
              Read paper
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href={publication.doiUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border-[3px] border-foreground bg-card px-5 py-2.5 text-sm font-bold shadow-brutal-sm transition-transform hover:-translate-y-0.5"
            >
              DOI: {publication.doi}
            </a>
            <button
              type="button"
              onClick={copyBibtex}
              className="inline-flex items-center gap-2 rounded-xl border-[3px] border-foreground bg-card px-5 py-2.5 text-sm font-bold shadow-brutal-sm transition-transform hover:-translate-y-0.5"
              aria-label="Copy BibTeX citation"
            >
              {copied ? <Check className="h-4 w-4 text-primary" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
              {copied ? "Copied!" : "Copy BibTeX"}
            </button>
          </div>

          <details className="group mt-5">
            <summary className="cursor-pointer list-none font-mono text-xs font-bold uppercase tracking-widest text-muted-foreground">
              BibTeX
            </summary>
            <pre className="mt-3 overflow-x-auto rounded-lg border-2 border-foreground bg-foreground p-4 font-mono text-[11px] leading-relaxed text-background">
              {publication.bibtex}
            </pre>
          </details>
        </Reveal>
      </div>
    </section>
  );
}
