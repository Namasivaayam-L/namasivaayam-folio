import { Brain, Code, GraduationCap, MapPin } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import Reveal from "@/components/Reveal";
import personalData from "@/data/personal.json";
import education from "@/data/education.json";

const BUILD_ITEMS = [
  "Document extraction pipelines that reach 90% accuracy",
  "Multi-agent orchestration with LangGraph & LangChain",
  "RAG systems with measurable retrieval quality",
  "LLM eval harnesses benchmarking production models",
  "HITL workflows & cloud-native deployments",
];

const WORKFLOW = [
  { step: "01", title: "Frame", desc: "Define the metric before the model." },
  { step: "02", title: "Data", desc: "Profile, label, and version it." },
  { step: "03", title: "Prototype", desc: "Small model first, iterate fast." },
  { step: "04", title: "Evaluate", desc: "Held-out evals and error analysis." },
  { step: "05", title: "Ship", desc: "Containerize, monitor, alert." },
  { step: "06", title: "Iterate", desc: "Feed production signals back in." },
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
                  and full-stack development. I pioneered a production Gemini-based solution for structured
                  data extraction, lifting document accuracy from{" "}
                  <span className="rounded-sm bg-primary/30 px-1 py-0.5 font-black">9% to 90%</span>, and led
                  the end-to-end ML development of an{" "}
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
                <MetaChip icon={<GraduationCap className="h-4 w-4" aria-hidden="true" />}>
                  CGPA {education.cgpa}
                </MetaChip>
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

          {/* How I work */}
          <Reveal className="relative z-10 overflow-hidden rounded-xl border-2 border-foreground bg-foreground p-6 text-background md:p-8">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-md border-2 border-background bg-secondary">
                <Brain className="h-5 w-5 text-secondary-foreground" aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-xl font-bold">How I work</h3>
                <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-background/50">
                  Engineering workflow
                </p>
              </div>
            </div>

            <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
              {WORKFLOW.map((item) => (
                <li
                  key={item.step}
                  className="group/step rounded-md border border-background/20 bg-background/5 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary"
                >
                  <span className="block w-fit bg-background/10 pr-3 font-mono text-[10px] font-bold text-background/50 transition-colors group-hover/step:text-primary">
                    {item.step}
                  </span>
                  <p className="mt-2 font-bold text-band">{item.title}</p>
                  <p className="mt-1 font-mono text-[11px] leading-snug text-background/60">{item.desc}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
