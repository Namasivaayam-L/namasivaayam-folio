import { Brain, Code, MapPin } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import Reveal from "@/components/Reveal";
import personalData from "@/data/personal.json";

const BUILD_ITEMS = [
  "Document extraction pipelines that reach 90% accuracy",
  "Multi-agent orchestration with LangGraph & LangChain",
  "RAG systems with measurable retrieval quality",
  "LLM eval harnesses benchmarking production models",
  "HITL workflows & cloud-native deployments",
];

/** At-a-glance stat cards (moved from the retired Quick Profile section). */
const STATS = [
  { value: "GenAI", label: "Primary focus", sub: "Agentic systems", filled: true },
  { value: "B.Tech", label: "AI & Data Science", sub: "MEPCO, 2024", filled: false },
  { value: "Python", label: "Primary language", sub: "Language & framework agnostic", filled: true },
  { value: "8.49", label: "CGPA / 10", sub: "Graduated 2024", filled: false },
];

function MetaChip({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <li className="inline-flex cursor-default items-center gap-2 rounded-md border-2 border-foreground bg-card px-3 py-1.5 text-sm font-bold shadow-brutal-sm">
      {icon}
      {children}
    </li>
  );
}

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden px-4 py-20 md:py-28">
      <div className="pointer-events-none absolute left-0 top-1/4 h-96 w-96 rounded-full bg-secondary/10 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute right-0 top-1/4 h-64 w-64 rounded-full bg-primary/20 blur-3xl" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionHeader index="01" label="WHO I AM" title="About" />

        <div className="mt-8 flex flex-col gap-6">
          <div className="grid gap-6 lg:grid-cols-12">
            {/* Summary */}
            <Reveal className="group flex flex-col justify-between rounded-xl border-2 border-foreground bg-card p-6 shadow-brutal transition-all duration-300 hover:-translate-y-1 hover:shadow-brutal-lg md:p-8 lg:col-span-7">
              <div>
                <p className="relative z-10 text-[17px] leading-relaxed text-foreground">
                  I am a Machine Learning Engineer specializing in{" "}
                  <span className="rounded-sm bg-primary/30 px-1 py-0.5 font-black">Generative AI</span>,{" "}
                  <span className="rounded-sm bg-secondary/30 px-1 py-0.5 font-black">Multi-Modal Systems</span>,
                  and full-stack development — currently shipping production GenAI for financial
                  document processing at Rocket. Recent work: a modular{" "}
                  <span className="rounded-sm bg-secondary/30 px-1 py-0.5 font-black">
                    decision graph
                  </span>{" "}
                  that lifted reviewer-agreed accuracy from{" "}
                  <span className="rounded-sm bg-primary/30 px-1 py-0.5 font-black">29% to 77% (2.7x)</span> and
                  cut wrong classifications by{" "}
                  <span className="rounded-sm bg-primary/30 px-1 py-0.5 font-black">95%</span> across ~17,500
                  weekly inbound items. I also took document extraction accuracy from{" "}
                  <span className="rounded-sm bg-primary/30 px-1 py-0.5 font-black">9% to 90%</span> with a
                  production Gemini pipeline, and led the end-to-end ML development of an{" "}
                  <span className="rounded-sm bg-secondary/30 px-1 py-0.5 font-black">
                    LLM validation framework
                  </span>{" "}
                  that benchmarks in-production models against top market competitors. Experienced in building{" "}
                  <span className="rounded-sm bg-primary/30 px-1 py-0.5 font-black">
                    HITL, RAG, &amp; cloud-native deployments
                  </span>
                  .
                </p>
                <p className="mt-6 text-[15px] font-medium text-muted-foreground">
                  I've been coding since 2018 — full-stack web apps first, then traditional ML,
                  and now production GenAI. The constant: taking something that works in a
                  notebook and making it hold up in the real world.
                </p>
                <p className="mt-3 text-[15px] font-medium text-muted-foreground">
                  Currently learning, building, testing, and shipping. Beyond code I tinker with
                  phones, laptops, and PCs — and write on{" "}
                  <a
                    href="https://namasivaayaml.hashnode.dev/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-foreground underline decoration-dotted underline-offset-2 hover:text-secondary"
                  >
                    Hashnode
                  </a>
                  .
                </p>
              </div>

              <ul className="mt-8 flex flex-wrap gap-3">
                <MetaChip icon={<MapPin className="h-4 w-4" aria-hidden="true" />}>{personalData.location}</MetaChip>
                <MetaChip icon={<Code className="h-4 w-4" aria-hidden="true" />}>ML Engineer</MetaChip>
              </ul>
            </Reveal>

            {/* What I build */}
            <Reveal
              delay={0.1}
              className="group rounded-xl border-2 border-foreground bg-primary p-6 shadow-brutal transition-all duration-300 hover:-translate-y-1 hover:shadow-brutal-lg md:p-8 lg:col-span-5"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-md border-2 border-foreground bg-card transition-transform duration-300 group-hover:rotate-12">
                  <Brain className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="text-xl font-bold text-primary-foreground">What I build</h3>
              </div>
              <ul className="mt-6 space-y-4 text-[15px] font-bold text-primary-foreground">
                {BUILD_ITEMS.map((item) => (
                  <li key={item} className="group/item flex gap-2 transition-transform hover:translate-x-1">
                    <span className="font-black">→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* At-a-glance stat cards (formerly the Quick Profile section) */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.07} y={20}>
                <div
                  className={`group flex h-full flex-col justify-center rounded-xl border-2 border-foreground p-6 shadow-brutal transition-all duration-300 hover:-translate-x-1 hover:-translate-y-2 ${
                    stat.filled ? "bg-primary text-primary-foreground" : "bg-foreground text-background"
                  }`}
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
        </div>
      </div>
    </section>
  );
}
