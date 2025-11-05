import { Badge } from "@/components/ui/badge";
import experienceData from "@/data/experience.json";

export default function Experience() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-foreground">Changelog from my journey</h1>
        <p className="text-muted-foreground">
          I've been working on building innovative ML solutions for the past years.
          <br />
          Here's a timeline of my journey.
        </p>
      </div>

      {/* Timeline */}
      <div className="relative space-y-8 before:absolute before:left-0 before:top-0 before:h-full before:w-px before:bg-border">
        {experienceData.map((exp, index) => (
          <div key={exp.id} className="relative pl-8 animate-slide-in" style={{ animationDelay: `${index * 100}ms` }}>
            {/* Timeline dot */}
            <div className="absolute left-0 top-1 -translate-x-1/2 w-2 h-2 rounded-full bg-accent"></div>

            {/* Duration Badge */}
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-muted text-muted-foreground text-sm rounded-full">
                {exp.duration}
              </span>
            </div>

            {/* Content Card */}
            <div className="bg-card border border-border rounded-lg p-6 space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-foreground">{exp.role} · {exp.company}</h3>
                {exp.location && (
                  <p className="text-sm text-muted-foreground">{exp.location}</p>
                )}
              </div>

              {/* Contributions */}
              <ul className="space-y-2">
                {exp.contributions.map((contribution, idx) => (
                  <li key={idx} className="text-sm text-muted-foreground flex gap-2">
                    <span className="text-accent">•</span>
                    <span>{contribution}</span>
                  </li>
                ))}
              </ul>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                {exp.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
