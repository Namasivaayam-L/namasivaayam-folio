import Reveal from "@/components/Reveal";

interface SectionHeaderProps {
  /** Two-digit section number, e.g. "01". */
  index: string;
  /** Right-side label, e.g. "WHO I AM". */
  label: string;
  /** Heading text; a colored period is appended. */
  title: string;
  /** Color class for the trailing period, e.g. "text-secondary". */
  dotClass?: string;
  /** Optional mono subtitle under the heading. */
  subtitle?: string;
  /** "split" = heading left / badge right; "center" = stacked and centered. */
  align?: "split" | "center";
}

export default function SectionHeader({
  index,
  label,
  title,
  dotClass = "text-secondary",
  subtitle,
  align = "split",
}: SectionHeaderProps) {
  const badge = (
    <span className="hidden shrink-0 border-2 border-foreground bg-card px-3 py-1 font-mono text-xs font-bold uppercase tracking-widest text-muted-foreground shadow-brutal-sm sm:block">
      {index} / {label}
    </span>
  );

  const heading = (
    <h2 className="cursor-default text-5xl font-black tracking-tighter transition-transform hover:-translate-y-1 sm:text-6xl">
      {title}
      <span className={`inline-block transition-transform duration-300 hover:rotate-12 ${dotClass}`}>.</span>
    </h2>
  );

  if (align === "center") {
    return (
      <Reveal className="flex flex-col items-center gap-4 text-center">
        {heading}
        {badge}
        {subtitle && (
          <p className="font-mono text-xs font-bold uppercase tracking-widest text-muted-foreground">{subtitle}</p>
        )}
      </Reveal>
    );
  }

  return (
    <Reveal className="flex items-end justify-between gap-4">
      <div className="min-w-0">
        {heading}
        {subtitle && (
          <p className="mt-3 font-mono text-xs font-bold uppercase tracking-widest text-muted-foreground">
            {subtitle}
          </p>
        )}
      </div>
      {badge}
    </Reveal>
  );
}
