import personalData from "@/data/personal.json";
import { PaletteRow } from "@/components/PaletteSwitcher";

const CREDIT_URL = "https://www.ayushranjane.in/";

/** "Chennai, Tamil Nadu, India" → "Chennai, India" for the compact tagline. */
const city = personalData.location
  .split(", ")
  .filter((_, i, arr) => i === 0 || i === arr.length - 1)
  .join(", ");

/** Decorative cat silhouette perching on the footer's top edge. */
function Cat() {
  return (
    <svg
      viewBox="0 0 100 72"
      className="pointer-events-none absolute bottom-full right-4 h-14 w-16 translate-y-px text-foreground md:right-8 md:h-16 md:w-20"
      aria-hidden="true"
      fill="currentColor"
    >
      <path d="M36 17 L31 3 L47 11 Z" />
      <path d="M64 17 L69 3 L53 11 Z" />
      <circle cx="50" cy="27" r="16" />
      <ellipse cx="50" cy="52" rx="25" ry="19" />
      <path
        d="M73 62 q15 -4 13 -19 q-1 -8 -9 -5 q-5 2 -3 6 q2 5 7 4"
        fill="none"
        stroke="currentColor"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <circle cx="44" cy="25" r="2.2" className="fill-background" />
      <circle cx="56" cy="25" r="2.2" className="fill-background" />
      <path
        d="M47 32 q3 3 6 0"
        fill="none"
        stroke="hsl(var(--background))"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="relative mt-auto border-t-2 border-foreground bg-foreground text-background">
      <Cat />

      <div className="px-4 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-md border-2 border-background bg-primary font-mono text-sm font-bold text-primary-foreground">
              NL
            </span>
            <span className="text-sm font-bold">{personalData.name}</span>
          </div>

          <p className="text-center font-mono text-xs text-background/60">
            {personalData.title} — {city}
          </p>

          <a
            href="#top"
            className="rounded-md border-2 border-background px-3 py-1.5 text-xs font-bold transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            Back to top ↑
          </a>
        </div>

        <div className="mx-auto mt-6 flex max-w-6xl flex-col items-center justify-between gap-3 border-t border-background/15 pt-5 sm:flex-row">
          <PaletteRow />
          <p className="text-center font-mono text-[11px] text-background/60">
            © {new Date().getFullYear()} {personalData.name} ·{" "}
            <a
              href={CREDIT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-dotted underline-offset-2 hover:text-primary"
            >
              Design inspired by ayushranjane.in
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
