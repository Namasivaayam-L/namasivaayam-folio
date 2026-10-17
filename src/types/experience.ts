export interface WorkstreamMetric {
  /** Short punchy value, e.g. "9% → 90%" or "67%" */
  value: string;
  /** What the value measures, e.g. "Extraction accuracy" */
  label: string;
}

export interface Workstream {
  id: string;
  /** System codename, e.g. "PyroAI Docs" */
  name: string;
  /** One-line descriptor, e.g. "GenAI Document Extraction" */
  subtitle: string;
  /** The problem the system solves */
  problem: string;
  /** The outcome delivered, quantified where possible */
  outcome: string;
  /** Specific technical contributions and approach */
  approach: string[];
  /** Highlighted numbers shown as chips */
  metrics: WorkstreamMetric[];
  /** Short stack associated with this workstream */
  stack: string[];
}

export interface Role {
  id: string;
  title: string;
  /** Human-readable period, e.g. "Jul 2024 – Present" */
  period: string;
  location?: string;
  /** Short framing for the role */
  summary?: string;
  /** Detailed case studies for this role */
  workstreams?: Workstream[];
  /** Simpler bullet highlights (used for shorter roles) */
  highlights?: string[];
  stack?: string[];
}

export interface ExperienceEntry {
  id: string;
  company: string;
  companyUrl?: string;
  /** e.g. "formerly Mr. Cooper" */
  companyNote?: string;
  /** Roles in reverse-chronological order (most recent first) */
  roles: Role[];
}
