import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, ExternalLink, Route } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import SectionHeader from "@/components/SectionHeader";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
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
 * single source of truth. On desktop the cards are laid out as a fanned deck
 * (reference: ayushranjane.in #projects); on mobile they stack vertically, so
 * Experience itself stays a lean timeline.
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
  "decision-graph": Route,
  "in-a-box": FileCheck2,
  "pyroai-docs": ScanText,
  "ai-guardian": ShieldCheck,
};

/** Palette-driven tinted panels stand in for the reference's cover images. */
const PANEL_TONES = [
  "bg-band/50",
  "bg-glow/50",
  "bg-primary/25",
  "bg-secondary/25",
];

/** Signed fan slot for a card: circular distance from the active card. */
function fanSlot(index: number, active: number, count: number): number {
  const raw = ((index - active) % count + count) % count; // 0 … count-1
  return raw > count / 2 ? raw - count : raw;
}

/** Uniform fan scale: the deck renders 15% smaller than the reference geometry
 *  (lengths shrink, angles are preserved, so the arc shape stays identical). */
const FAN_SCALE = 0.85;

/** Fan geometry per slot distance (px / deg / scale / z-index / opacity). */
function fanStyle(slot: number) {
  const dir = Math.sign(slot);
  const dist = Math.abs(slot);
  if (dist === 0) return { x: 0, rotate: 0, scale: FAN_SCALE, opacity: 1, zIndex: 40 };
  if (dist === 1)
    return { x: 170 * FAN_SCALE * dir, rotate: 9 * dir, scale: 0.95 * FAN_SCALE, opacity: 1, zIndex: 30 };
  return { x: 300 * FAN_SCALE * dir, rotate: 17 * dir, scale: 0.9 * FAN_SCALE, opacity: 0.9, zIndex: 20 };
}

const pad2 = (n: number) => String(n).padStart(2, "0");

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
  isActive,
  isOpen,
  onToggle,
}: {
  ws: Workstream;
  company: string;
  companyUrl?: string;
  index: number;
  /** Interactive/focusable card (fan active card, or any card in stack mode). */
  isActive: boolean;
  isOpen: boolean;
  onToggle: (open: boolean) => void;
}) {
  const Icon = PROJECT_ICONS[ws.id] ?? Lightbulb;
  const number = pad2(index + 1);
  // Reference cards alternate lime / black category pills.
  const pillClass =
    index % 2 === 0
      ? "bg-band text-foreground"
      : "bg-foreground text-background";
  const panelTone = PANEL_TONES[index % PANEL_TONES.length];

  return (
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
            <details
              className="group mt-5"
              open={isOpen}
              onToggle={(e) => onToggle(e.currentTarget.open)}
            >
              <summary
                tabIndex={isActive ? undefined : -1}
                className="flex cursor-pointer list-none items-center justify-between gap-3"
              >
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
                tabIndex={isActive ? undefined : -1}
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
  );
}

export default function Projects() {
  const reduceMotion = useReducedMotion();
  const count = projects.length;

  const [active, setActive] = useState(0);
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(min-width: 1024px)").matches,
  );
  const [deckHeight, setDeckHeight] = useState(0);
  const wrapRefs = useRef<Array<HTMLDivElement | null>>([]);

  // Track the lg breakpoint so mobile keeps the plain vertical stack.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => setIsDesktop(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // The deck is absolutely positioned: its height follows the tallest card
  // (ResizeObserver also catches "Engineering approach" expands).
  useLayoutEffect(() => {
    if (!isDesktop) return;
    const measure = () =>
      setDeckHeight(Math.max(0, ...wrapRefs.current.map((el) => el?.offsetHeight ?? 0)));
    measure();
    const ro = new ResizeObserver(measure);
    wrapRefs.current.forEach((el) => el && ro.observe(el));
    return () => ro.disconnect();
  }, [isDesktop]);

  const goTo = (next: number) => {
    setActive((next + count) % count);
    setOpenIdx(null); // collapse any open expand before it becomes a side card
  };

  const toggle = (i: number, open: boolean) =>
    setOpenIdx((cur) => (open ? i : cur === i ? null : cur));

  const card = (project: (typeof projects)[number], i: number) => (
    <ProjectCard
      key={project.ws.id}
      {...project}
      index={i}
      isActive={!isDesktop || i === active}
      isOpen={openIdx === i}
      onToggle={(open) => toggle(i, open)}
    />
  );

  return (
    <section id="projects" className="overflow-x-clip px-4 py-20 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          index="03"
          label="ON THE JOB"
          title="Work Highlights"
          subtitle="Built at Rocket, India — running in production"
        />

        {isDesktop ? (
          <div className="mt-14">
            {/* Fanned deck: all cards absolute, bottom-anchored, transforms per slot.
                Height reserves the *visual* deck (layout height × FAN_SCALE) so the
                controls sit right under the scaled-down cards. */}
            <div className="relative" style={{ height: deckHeight ? deckHeight * FAN_SCALE : undefined }}>
              {projects.map((project, i) => {
                const isActive = i === active;
                const style = fanStyle(fanSlot(i, active, count));
                return (
                  <motion.div
                    key={project.ws.id}
                    ref={(el) => {
                      wrapRefs.current[i] = el;
                    }}
                    className={cn(
                      "absolute bottom-0 left-0 right-0 mx-auto w-full max-w-6xl",
                      isActive ? "cursor-default" : "cursor-pointer",
                    )}
                    style={{ transformOrigin: "bottom center", zIndex: style.zIndex }}
                    initial={false}
                    animate={{
                      x: style.x,
                      rotate: style.rotate,
                      scale: style.scale,
                      opacity: style.opacity,
                    }}
                    transition={{ duration: reduceMotion ? 0 : 0.45, ease: "easeOut" }}
                    aria-hidden={!isActive}
                    onClick={() => {
                      if (!isActive) goTo(i);
                    }}
                  >
                    <div className={cn(!isActive && "pointer-events-none")}>
                      <Reveal delay={i * 0.05}>{card(project, i)}</Reveal>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Deck controls */}
            <div className="mt-10 flex items-center justify-center gap-5">
              <button
                type="button"
                onClick={() => goTo(active - 1)}
                aria-label="Previous work item"
                className="flex h-11 w-11 items-center justify-center rounded-xl border-2 border-foreground bg-card shadow-brutal-sm transition-all hover:-translate-y-0.5 hover:shadow-brutal"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              <span className="font-mono text-sm font-bold tracking-widest">
                {pad2(active + 1)} / {pad2(count)}
              </span>
              <button
                type="button"
                onClick={() => goTo(active + 1)}
                aria-label="Next work item"
                className="flex h-11 w-11 items-center justify-center rounded-xl border-2 border-foreground bg-card shadow-brutal-sm transition-all hover:-translate-y-0.5 hover:shadow-brutal"
              >
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        ) : (
          /* Mobile: plain vertical stack. */
          <div className="mt-14 space-y-20">
            {projects.map((project, i) => (
              <Reveal key={project.ws.id}>{card(project, i)}</Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
