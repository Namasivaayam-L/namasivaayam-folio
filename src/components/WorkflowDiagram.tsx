import {
  FileInput,
  ScanText,
  ShieldCheck,
  UserCheck,
  TrendingUp,
  ChevronRight,
  ChevronDown,
} from "lucide-react";

interface Stage {
  title: string;
  description: string;
  icon: React.ReactNode;
}

/**
 * Production AI workflow diagram: document ingestion → extraction →
 * validation → human review → outcome measurement. A real, responsive
 * component (vertical on mobile, horizontal on desktop) rather than a
 * decorative illustration.
 */
const stages: Stage[] = [
  {
    title: "Ingestion",
    description: "Documents arrive from enterprise systems in wildly different formats.",
    icon: <FileInput className="w-5 h-5" aria-hidden="true" />,
  },
  {
    title: "Extraction",
    description: "LLM pipelines pull structured fields from every page.",
    icon: <ScanText className="w-5 h-5" aria-hidden="true" />,
  },
  {
    title: "Validation",
    description: "Cross-document checks verify fields against their sources.",
    icon: <ShieldCheck className="w-5 h-5" aria-hidden="true" />,
  },
  {
    title: "Human review",
    description: "Only flagged cases escalate to a person.",
    icon: <UserCheck className="w-5 h-5" aria-hidden="true" />,
  },
  {
    title: "Outcome measurement",
    description: "Accuracy and cost are tracked to catch drift.",
    icon: <TrendingUp className="w-5 h-5" aria-hidden="true" />,
  },
];

export default function WorkflowDiagram() {
  return (
    <ol
      className="grid gap-2 md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr_auto_1fr] md:items-stretch"
      aria-label="Production AI system lifecycle"
    >
      {stages.map((stage, index) => (
        <li key={stage.title} className="contents">
          <div className="flex flex-col gap-3 rounded-lg border-2 border-background bg-card p-4 shadow-brutal-light">
            <div className="flex items-center gap-2 text-secondary">
              {stage.icon}
              <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {index + 1}
              </span>
            </div>
            <p className="font-semibold text-foreground text-sm">{stage.title}</p>
            <p className="text-xs text-muted-foreground leading-relaxed">{stage.description}</p>
          </div>
          {index < stages.length - 1 && (
            <div
              className="flex items-center justify-center py-1 text-primary md:px-1 md:py-0"
              aria-hidden="true"
            >
              {/* Right arrow on desktop, down arrow on mobile */}
              <ChevronRight className="hidden md:block w-4 h-4 animate-pulse" />
              <ChevronDown className="md:hidden w-4 h-4 animate-pulse" />
            </div>
          )}
        </li>
      ))}
    </ol>
  );
}
