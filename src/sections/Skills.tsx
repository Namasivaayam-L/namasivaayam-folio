import SectionHeader from "@/components/SectionHeader";
import Reveal from "@/components/Reveal";
import skillsData from "@/data/skills.json";

const categories = skillsData.categories;

/** Tooling inventory folded in from the retired About page. */
const TOOLING = [
  "VS Code",
  "GitHub",
  "GitHub Copilot",
  "Cline",
  "Linux",
  "Bash",
  "Hugging Face",
  "Jupyter",
  "DataGrip",
  "Docker",
  "GitHub Actions",
  "GKE",
];

/** Badge color rotation: lime → pink → black, as in the reference. */
function badgeClass(index: number): string {
  const variant = index % 3;
  if (variant === 0) return "bg-primary text-primary-foreground";
  if (variant === 1) return "bg-secondary text-secondary-foreground";
  return "bg-foreground text-background";
}

export default function Skills() {
  return (
    <section id="skills" className="border-y-2 border-foreground bg-dots px-4 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeader index="04" label="CORE COMPETENCIES" title="Skills & Tools" />

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {categories.map((category, i) => (
            <Reveal
              key={category.name}
              delay={(i % 3) * 0.08}
              className={i % 2 === 1 ? "lg:mt-10" : undefined}
            >
              <div className="h-full rounded-xl border-2 border-foreground bg-card p-6 shadow-brutal transition-all duration-300 hover:-translate-y-1 hover:shadow-brutal-lg">
                <span
                  className={`inline-block rounded-full border-2 border-foreground px-3 py-1 text-[11px] font-bold shadow-brutal-xs ${badgeClass(i)}`}
                >
                  {category.name}
                </span>

                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{category.blurb}</p>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <li
                      key={skill}
                      className="cursor-default rounded-full border-2 border-foreground bg-card px-3 py-1.5 text-sm font-bold shadow-brutal-xs transition-transform hover:-translate-y-0.5"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Daily tooling — folded in from the retired About page. */}
        <Reveal className="mt-6 rounded-xl border-2 border-foreground bg-foreground p-6 text-background shadow-brutal">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h3 className="text-lg font-bold">Daily tooling</h3>
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-background/60">
              The short list of what I reach for day to day
            </span>
          </div>
          <ul className="mt-4 flex flex-wrap gap-2">
            {TOOLING.map((tool) => (
              <li
                key={tool}
                className="rounded-full border-2 border-background/40 bg-background/5 px-3 py-1.5 font-mono text-[11px] font-bold"
              >
                {tool}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
