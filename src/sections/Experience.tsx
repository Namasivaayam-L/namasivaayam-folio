import { ChevronDown } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import Reveal from "@/components/Reveal";
import experienceData from "@/data/experience.json";
import education from "@/data/education.json";
import type { ExperienceEntry, Role, Workstream } from "@/types/experience";

const entries: ExperienceEntry[] = experienceData;

function StackChip({ children }: { children: React.ReactNode }) {
  return (
    <li className="rounded-full border-2 border-foreground bg-card px-3 py-1 font-mono text-[11px] font-bold shadow-brutal-xs">
      {children}
    </li>
  );
}

function WorkstreamCard({ ws }: { ws: Workstream }) {
  return (
    <div className="rounded-lg border-2 border-foreground bg-background p-4 md:p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <h4 className="text-lg font-bold">{ws.name}</h4>
        <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
          {ws.subtitle}
        </span>
      </div>

      {ws.metrics.length > 0 && (
        <ul className="mt-3 flex flex-wrap gap-2">
          {ws.metrics.map((metric) => (
            <li
              key={metric.label}
              className="rounded-md border-2 border-foreground bg-primary/25 px-3 py-1.5"
              aria-label={`${metric.value}: ${metric.label}`}
            >
              <span className="block text-base font-black leading-none">{metric.value}</span>
              <span className="font-mono text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
                {metric.label}
              </span>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-4 space-y-3 text-sm leading-relaxed">
        <p>
          <span className="font-black">Problem. </span>
          <span className="text-muted-foreground">{ws.problem}</span>
        </p>
        <p>
          <span className="font-black">Outcome. </span>
          <span className="text-muted-foreground">{ws.outcome}</span>
        </p>
      </div>

      {ws.approach.length > 0 && (
        <details className="group mt-4 border-t border-border pt-3">
          <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium transition-colors hover:text-foreground">
            <span>Engineering approach</span>
            <ChevronDown
              className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-180"
              aria-hidden="true"
            />
          </summary>
          <ul className="space-y-2 pt-3 text-sm text-muted-foreground">
            {ws.approach.map((item, idx) => (
              <li key={idx} className="flex gap-2">
                <span className="font-black text-secondary" aria-hidden="true">
                  •
                </span>
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </details>
      )}

      {ws.stack.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-2">
          {ws.stack.map((tech) => (
            <StackChip key={tech}>{tech}</StackChip>
          ))}
        </ul>
      )}
    </div>
  );
}

function RoleCard({ role, company, companyUrl, companyNote }: {
  role: Role;
  company: string;
  companyUrl?: string;
  companyNote?: string;
}) {
  return (
    <div className="rounded-xl border-2 border-foreground bg-card p-6 shadow-brutal transition-all duration-300 hover:-translate-y-1 hover:shadow-brutal-lg md:p-8">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h3 className="text-2xl font-bold leading-tight">{role.title}</h3>
        <span className="shrink-0 rounded-md border-2 border-foreground bg-band px-2.5 py-1 font-mono text-xs font-bold shadow-brutal-xs">
          {role.period}
        </span>
      </div>

      <p className="mt-2 font-mono text-sm font-bold">
        {companyUrl ? (
          <a href={companyUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
            {company}
          </a>
        ) : (
          company
        )}
        {companyNote && <span className="font-normal text-muted-foreground"> ({companyNote})</span>}
      </p>
      {role.location && <p className="mt-1 font-mono text-xs text-muted-foreground">{role.location}</p>}

      {role.summary && <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">{role.summary}</p>}

      {role.highlights && (
        <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
          {role.highlights.map((highlight, idx) => (
            <li key={idx} className="flex gap-2">
              <span className="font-black text-secondary" aria-hidden="true">
                →
              </span>
              <span className="leading-relaxed">{highlight}</span>
            </li>
          ))}
        </ul>
      )}

      {role.workstreams && (
        <div className="mt-6 space-y-4">
          <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            Selected work
          </p>
          {role.workstreams.map((ws) => (
            <WorkstreamCard key={ws.id} ws={ws} />
          ))}
        </div>
      )}

      {role.stack && (
        <ul className="mt-6 flex flex-wrap gap-2">
          {role.stack.map((tech) => (
            <StackChip key={tech}>{tech}</StackChip>
          ))}
        </ul>
      )}
    </div>
  );
}

function TimelineItem({ side, children }: { side: "left" | "right"; children: React.ReactNode }) {
  return (
    <li className="group relative pl-14 md:grid md:grid-cols-2 md:gap-14 md:pl-0">
      <span
        className="absolute left-[32px] top-8 z-10 h-6 w-6 -translate-x-1/2 rounded-full border-4 border-foreground bg-band shadow-brutal-sm transition-transform group-hover:scale-125 md:left-1/2"
        aria-hidden="true"
      />
      <div className={side === "left" ? "md:col-start-1" : "md:col-start-2"}>{children}</div>
    </li>
  );
}

export default function Experience() {
  // The reference alternates left / right starting on the left of the line.
  const sides: Array<"left" | "right"> = ["left", "right", "left"];

  return (
    <section id="experience" className="overflow-hidden bg-surface px-4 py-20 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeader index="02" label="MILESTONES TIMELINE" title="Experience & Education" align="center" />

        <div className="relative mt-14">
          <div
            className="absolute bottom-0 left-[32px] top-0 w-0.5 -translate-x-1/2 bg-foreground md:left-1/2"
            aria-hidden="true"
          />

          <ol className="space-y-12">
            {entries.flatMap((entry, entryIdx) =>
              entry.roles.map((role, roleIdx) => (
                <TimelineItem key={role.id} side={sides[Math.min(entryIdx * 2 + roleIdx, sides.length - 1)]}>
                  <Reveal>
                    <RoleCard
                      role={role}
                      company={entry.company}
                      companyUrl={entry.companyUrl}
                      companyNote={entry.companyNote}
                    />
                  </Reveal>
                </TimelineItem>
              ))
            )}

            {/* Education closes the timeline. */}
            <TimelineItem side="left">
              <Reveal>
                <div className="rounded-xl border-2 border-foreground bg-card p-6 shadow-brutal transition-all duration-300 hover:-translate-y-1 hover:shadow-brutal-lg md:p-8">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <h3 className="text-2xl font-bold leading-tight">{education.degree}</h3>
                    <span className="shrink-0 rounded-md border-2 border-foreground bg-band px-2.5 py-1 font-mono text-xs font-bold shadow-brutal-xs">
                      {education.period}
                    </span>
                  </div>
                  <p className="mt-2 font-mono text-sm font-bold">{education.institution}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    <StackChip>Graduated {education.graduation}</StackChip>
                    <StackChip>CGPA {education.cgpa}</StackChip>
                  </ul>
                  <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">{education.activities}</p>
                </div>
              </Reveal>
            </TimelineItem>
          </ol>
        </div>
      </div>
    </section>
  );
}
