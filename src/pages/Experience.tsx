import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import experienceData from "@/data/experience.json";
import { ExperienceEntry, Role, Workstream } from "@/types/experience";

function WorkstreamSection({ workstream }: { workstream: Workstream }) {
  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-5">
      {/* Header */}
      <div className="space-y-1">
        <h3 className="text-xl font-semibold text-foreground">{workstream.name}</h3>
        <p className="text-sm text-muted-foreground">{workstream.subtitle}</p>
      </div>

      {/* Highlighted metrics */}
      <div className="flex flex-wrap gap-3">
        {workstream.metrics.map((metric) => (
          <div
            key={metric.label}
            className="bg-muted rounded-lg px-4 py-2 flex flex-col"
            aria-label={`${metric.value}: ${metric.label}`}
          >
            <span className="text-lg font-bold text-foreground">{metric.value}</span>
            <span className="text-xs text-muted-foreground">{metric.label}</span>
          </div>
        ))}
      </div>

      {/* Problem & Outcome */}
      <div className="space-y-4 text-sm">
        <div>
          <h4 className="font-semibold text-foreground mb-1">Problem</h4>
          <p className="text-muted-foreground leading-relaxed">{workstream.problem}</p>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-1">Outcome</h4>
          <p className="text-muted-foreground leading-relaxed">{workstream.outcome}</p>
        </div>
      </div>

      {/* Engineering approach — collapsible detail */}
      <Collapsible>
        <CollapsibleTrigger className="group flex w-full items-center justify-between border-t border-border pt-4 text-sm font-medium text-foreground hover:text-accent transition-colors">
          <span>Engineering approach</span>
          <ChevronDown
            className="w-4 h-4 text-muted-foreground transition-transform group-data-[state=open]:rotate-180"
            aria-hidden="true"
          />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <ul className="space-y-2 pt-3 text-sm text-muted-foreground">
            {workstream.approach.map((item, idx) => (
              <li key={idx} className="flex gap-2">
                <span className="text-accent" aria-hidden="true">
                  •
                </span>
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </CollapsibleContent>
      </Collapsible>

      {/* Workstream stack */}
      <div className="flex flex-wrap gap-2 pt-1">
        {workstream.stack.map((tech) => (
          <Badge key={tech} variant="secondary" className="text-xs">
            {tech}
          </Badge>
        ))}
      </div>
    </div>
  );
}

function RoleSection({ role }: { role: Role }) {
  return (
    <div className="space-y-5">
      {/* Role header */}
      <div className="space-y-1">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="text-2xl font-bold text-foreground">{role.title}</h3>
          <span className="inline-block px-3 py-1 bg-muted text-muted-foreground text-sm rounded-full">
            {role.period}
          </span>
        </div>
        {role.location && <p className="text-sm text-muted-foreground">{role.location}</p>}
        {role.summary && (
          <p className="text-muted-foreground max-w-2xl">{role.summary}</p>
        )}
      </div>

      {/* Workstreams (case studies) */}
      {role.workstreams && (
        <div className="space-y-6">
          {role.workstreams.map((workstream) => (
            <WorkstreamSection key={workstream.id} workstream={workstream} />
          ))}
        </div>
      )}

      {/* Simple highlights for shorter roles */}
      {role.highlights && (
        <ul className="space-y-2 text-sm text-muted-foreground">
          {role.highlights.map((highlight, idx) => (
            <li key={idx} className="flex gap-2">
              <span className="text-accent" aria-hidden="true">
                •
              </span>
              <span className="leading-relaxed">{highlight}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Role-level stack */}
      {role.stack && (
        <div className="flex flex-wrap gap-2">
          {role.stack.map((tech) => (
            <Badge key={tech} variant="outline" className="text-xs">
              {tech}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Experience() {
  const typedExperience: ExperienceEntry[] = experienceData;

  return (
    <div className="space-y-10 animate-fade-in">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-foreground">Professional Experience</h1>
        <p className="text-muted-foreground max-w-2xl">
          Production AI systems at Rocket — document intelligence, multi-agent orchestration, and
          model evaluation, told as case studies: the problem, what I built, how, and what changed.
        </p>
      </div>

      {typedExperience.map((entry) => (
        <section key={entry.id} className="space-y-8">
          {/* Company header */}
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-foreground">
              {entry.companyUrl ? (
                <a
                  href={entry.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors"
                >
                  {entry.company}
                </a>
              ) : (
                entry.company
              )}
              {entry.companyNote && (
                <span className="text-base font-normal text-muted-foreground ml-2">
                  ({entry.companyNote})
                </span>
              )}
            </h2>
          </div>

          {/* Roles, most recent first */}
          <div className="space-y-12">
            {entry.roles.map((role) => (
              <RoleSection key={role.id} role={role} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
