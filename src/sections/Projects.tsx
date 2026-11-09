import { ChevronDown, ExternalLink } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import Reveal from "@/components/Reveal";
import experienceData from "@/data/experience.json";
import type { ExperienceEntry, Workstream } from "@/types/experience";
import {
  FileCheck2,
  Lightbulb,
  ScanText,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

const entries: ExperienceEntry[] = experienceData;

/**
 * Work highlights are the "Selected work" workstreams living in experience.json —
 * single source of truth. This section renders them as full-width cards
 * (reference: ayushranjane.in #projects), so Experience itself stays a
 * lean timeline.
 */
const projects = entries.flatMap((entry) =>
  entry.roles.flatMap((role) =>
    (role.workstreams ?? []).map((ws) => ({
      ws,
      company: entry.company,
      companyUrl: entry.companyUrl,
    })),
  ),
);

const PROJECT_ICONS: Record<string, LucideIcon> = {
  "in-a-box": FileCheck2,
  "pyroai-docs": ScanText,
  "ai-guardian": ShieldCheck,
  "idea-code": Lightbulb,
};

/** Palette-driven tinted panels stand in for the reference's cover images. */
const PANEL_TONES = [
  "bg-band/50",
  "bg-glow/50",
  "bg-primary/25",
  "bg-secondary/25",
];

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <li className="rounded-full border-2 border-foreground bg-card px-3 py-1 font-mono text-[11px] font-bold shadow-brutal-xs">
      {children}
    </li>
  );
}

function ProjectCard({
  ws,
  company,
  companyUrl,
  index,
}: {
  ws: Workstream;
  company: string;
  companyUrl?: string;
  index: number;
}) {
  const Icon = PROJECT_ICONS[ws.id] ?? Lightbulb;
  const number = String(index + 1).padStart(2, "0");
  // Reference cards alternate lime / black category pills.
  const pillClass =
    index % 2 === 0
      ? "bg-band text-foreground"
      : "bg-foreground text-background";
  const panelTone = PANEL_TONES[index % PANEL_TONES.length];

  return (
    <Reveal>
      <article className="overflow-hidden rounded-xl border-2 border-foreground bg-background shadow-brutal-8">
        <div className="grid lg:grid-cols-[1.2fr_1fr]">
          {/* ---------- Left: the work item ---------- */}
          <div className="p-6 md:p-8">
            <div className="flex items-start justify-between gap-4">
              <span
                className={`rounded-full border-2 border-foreground px-3.5 py-1.5 font-mono text-[11px] font-bold uppercase tracking-wide ${pillClass}`}
              >
                {ws.subtitle}
              </span>
              <span
                className="shrink-0 text-4xl font-black leading-none text-foreground/10 md:text-5xl"
                aria-hidden="true"
              >
                {number}
              </span>
            </div>

            <h3 className="mt-5 text-3xl font-bold tracking-tight md:text-4xl">
              {ws.name}
            </h3>

            <p className="mt-4 text-[17px] leading-relaxed text-muted-foreground">
              {ws.outcome}
            </p>

            <div className="mt-6">
              <div className="flex items-center gap-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-secondary" aria-hidden="true" />
                <span className="font-mono text-xs font-bold uppercase tracking-widest">
                  The problem
                </span>
              </div>
              <p className="mt-2 border-l-2 border-border pl-4 text-sm leading-relaxed text-muted-foreground">
                {ws.problem}
              </p>
            </div>

            {ws.approach.length > 0 && (
              <details className="group mt-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
                  <span className="flex items-center gap-2.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-primary" aria-hidden="true" />
                    <span className="font-mono text-xs font-bold uppercase tracking-widest">
                      Engineering approach
                    </span>
                  </span>
                  <ChevronDown
                    className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180"
                    aria-hidden="true"
                  />
                </summary>
                <ul className="mt-3 space-y-2 border-l-2 border-border pl-4 text-sm leading-relaxed text-muted-foreground">
                  {ws.approach.map((item, idx) => (
                    <li key={idx} className="flex gap-2">
                      <span className="font-black text-secondary" aria-hidden="true">
                        •
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </details>
            )}

            {ws.metrics.length > 0 && (
              <div className="mt-6 border-t border-border pt-6">
                <ul className="flex flex-wrap gap-x-10 gap-y-4">
                  {ws.metrics.map((metric) => (
                    <li key={metric.label}>
                      <span className="block text-2xl font-black leading-none md:text-3xl">
                        {metric.value}
                      </span>
                      <span className="mt-1 block font-mono text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
                        {metric.label}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <ul className="mt-6 flex flex-wrap gap-2">
              {ws.stack.map((tech) => (
                <Chip key={tech}>{tech}</Chip>
              ))}
            </ul>
          </div>

          {/* ---------- Right: typographic cover panel + action bar ---------- */}
          <div className="flex flex-col border-t-2 border-foreground lg:border-l-2 lg:border-t-0">
            <div
              className={`relative flex min-h-[240px] flex-1 flex-col justify-between overflow-hidden bg-dots p-6 ${panelTone}`}
            >
              {/* Oversized watermark fills the panel's mid-section like the
                  reference's full-bleed artwork. */}
              <span
                className="pointer-events-none absolute inset-0 flex select-none items-center justify-center text-[15rem] font-black leading-none text-foreground/10"
                aria-hidden="true"
              >
                {number}
              </span>
              <span
                className="pointer-events-none absolute -bottom-16 -left-12 h-44 w-44 rounded-full border-2 border-foreground/20"
                aria-hidden="true"
              />
              <span
                className="pointer-events-none absolute -bottom-6 right-8 h-20 w-20 rotate-45 border-2 border-foreground/20"
                aria-hidden="true"
              />

              <div className="relative flex items-start justify-between gap-3">
                <span className="flex h-14 w-14 items-center justify-center rounded-xl border-2 border-foreground bg-card shadow-brutal-sm">
                  <Icon className="h-7 w-7" aria-hidden="true" />
                </span>
                <span className="mt-1 font-mono text-[11px] font-bold uppercase tracking-widest text-foreground/60">
                  Engagement {number}
                </span>
              </div>

              <div className="relative">
                <p className="text-3xl font-black leading-[1.05] tracking-tighter md:text-4xl">
                  {ws.name}
                </p>
                <span
                  className="mt-3 block h-1 w-20 bg-foreground"
                  aria-hidden="true"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 border-t-2 border-foreground">
              <span className="flex items-center justify-center gap-2 bg-band px-4 py-3.5 font-mono text-[11px] font-bold uppercase tracking-widest">
                <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full border border-foreground bg-green-500" />
                </span>
                In production
              </span>
              {companyUrl ? (
                <a
                  href={companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 border-l-2 border-foreground bg-card px-4 py-3.5 font-mono text-[11px] font-bold uppercase tracking-widest transition-colors hover:bg-foreground hover:text-background"
                >
                  {company}
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              ) : (
                <span className="flex items-center justify-center gap-2 border-l-2 border-foreground bg-card px-4 py-3.5 font-mono text-[11px] font-bold uppercase tracking-widest">
                  {company}
                </span>
              )}
            </div>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="px-4 py-20 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          index="03"
          label="ON THE JOB"
          title="Work Highlights"
          subtitle="Built at Rocket, India — running in production"
        />

        <div className="mt-14 space-y-20">
          {projects.map((project, index) => (
            <ProjectCard key={project.ws.id} index={index} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
}
