const WORDS = ["GenAI", "Agents", "RAG", "Evals", "Pipelines", "Deploy", "Impact", "Ship"];

/** Scrolling ticker strip between the hero and the first section. */
export default function Marquee() {
  return (
    <div className="overflow-hidden border-y-2 border-foreground bg-foreground py-3" aria-hidden="true">
      <div className="animate-marquee flex w-max items-center">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center">
            {WORDS.map((word) => (
              <span
                key={`${copy}-${word}`}
                className="flex items-center gap-6 pr-6 font-mono text-sm font-bold uppercase tracking-widest text-background"
              >
                {word}
                <span className="text-primary">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
