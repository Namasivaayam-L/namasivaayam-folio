import { ExternalLink, Trophy } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import Reveal from "@/components/Reveal";
import awardsData from "@/data/awards.json";

const awards = awardsData;

export default function Awards() {
  return (
    <section id="awards" className="border-y-2 border-foreground bg-dots px-4 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeader index="08" label="HONORS" title="Awards & Recognition" />

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {awards.map((award, i) => (
            <Reveal key={award.title} delay={i * 0.08}>
              <div className="flex h-full flex-col rounded-xl border-2 border-foreground bg-card p-6 shadow-brutal transition-all duration-300 hover:-translate-y-1 hover:shadow-brutal-lg md:p-8">
                <div className="flex items-start justify-between gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border-2 border-foreground bg-glow">
                    <Trophy className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="rounded-full border-2 border-foreground bg-band px-3 py-1 font-mono text-[11px] font-bold shadow-brutal-xs">
                    {award.date}
                  </span>
                </div>

                <h3 className="mt-4 text-lg font-bold leading-snug">{award.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{award.description}</p>

                <a
                  href={award.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 self-start rounded-lg border-2 border-foreground bg-card px-4 py-2 text-sm font-bold shadow-brutal-xs transition-transform hover:-translate-y-0.5 hover:bg-primary"
                  aria-label={`View "${award.title}" on LinkedIn`}
                >
                  View LinkedIn post
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
