import SectionHeader from "@/components/SectionHeader";
import Reveal from "@/components/Reveal";
import WorkflowDiagram from "@/components/WorkflowDiagram";

interface Stat {
  value: string;
  label: string;
  sub: string;
  /** Alternate lime / black cards as in the reference. */
  filled: boolean;
}

const STATS: Stat[] = [
  { value: "B.Tech", label: "AI & Data Science", sub: "MEPCO, 2024", filled: true },
  { value: "8.49", label: "CGPA / 10", sub: "Graduated 2024", filled: false },
  { value: "Python", label: "Primary language", sub: "+ SQL", filled: true },
  { value: "GenAI", label: "Primary focus", sub: "Agentic systems", filled: false },
];

export default function Impact() {
  return (
    <section id="impact" className="border-y-[6px] border-foreground bg-foreground px-4 py-20 text-background md:py-28">
      <div className="relative mx-auto max-w-6xl">
        <SectionHeader index="08" label="AT A GLANCE" title="Quick Profile" dotClass="text-primary" />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.07} y={20}>
              <div
                className={`group flex h-full flex-col justify-center rounded-xl border-[3px] border-background p-6 transition-all duration-300 hover:-translate-x-1 hover:-translate-y-2 ${
                  stat.filled ? "bg-primary text-primary-foreground" : "bg-foreground text-background"
                } shadow-brutal-light`}
              >
                <p className="mb-3 text-[38px] font-black leading-none tracking-tight transition-transform duration-300 group-hover:scale-105 group-hover:origin-left">
                  {stat.value}
                </p>
                <p className="mb-4 text-[15px] font-bold leading-tight transition-colors group-hover:text-secondary">
                  {stat.label}
                </p>
                <p className="mt-auto font-mono text-[10px] font-bold uppercase tracking-widest opacity-70">
                  {stat.sub}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="group mt-10 rounded-xl border-[3px] border-background bg-foreground p-6 transition-colors duration-300 hover:bg-[#111] md:p-8">
          <h3 className="mb-4 text-[18px] font-bold transition-colors group-hover:text-primary">
            How I build AI systems
          </h3>
          <p className="max-w-4xl text-pretty text-[15px] leading-loose text-background/80">
            I treat machine learning as a complete engineering system — not just model training. It starts with
            understanding the real problem and building clean data pipelines, then models validated against held-out
            evals for performance and real-world reliability. Production-ready APIs connect the models to
            applications, human-in-the-loop review keeps the risky decisions honest, and monitoring with retraining
            schedules keeps the whole system improving after launch. AI systems earn their place when they
            measurably change a workflow — not when they demo well.
          </p>
        </Reveal>

        <div className="mt-10">
          <Reveal>
            <h3 className="text-[18px] font-bold">How production AI actually runs</h3>
            <p className="mt-1 max-w-2xl text-sm text-background/70">
              Demos end at the model. Production systems keep going — validation, human review, and measuring
              whether it still works. This is the lifecycle I build around.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="mt-5">
            <WorkflowDiagram />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
