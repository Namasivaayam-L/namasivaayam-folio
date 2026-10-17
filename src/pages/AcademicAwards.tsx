import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Award, Education } from "@/types/awards";
import { ExternalLink, GraduationCap, Trophy } from "lucide-react";
import educationData from "@/data/education.json";
import awardsData from "@/data/awards.json";

const education: Education = educationData;
const awards: Award[] = awardsData;

const AcademicAwards = () => {
  return (
    <div className="space-y-10 animate-fade-in">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-foreground">Education & Recognition</h1>
        <p className="text-muted-foreground max-w-2xl">
          Where I studied and the recognition along the way.
        </p>
      </div>

      {/* Education — compact header card */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <GraduationCap className="h-5 w-5 text-accent" aria-hidden="true" />
          <h2 className="text-2xl font-bold text-foreground">Education</h2>
        </div>

        <div className="bg-card border border-border rounded-lg p-6 space-y-2">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="text-lg font-semibold text-foreground">{education.degree}</h3>
            <Badge variant="secondary" className="text-xs">
              CGPA {education.cgpa}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">{education.institution}</p>
          <p className="text-sm text-muted-foreground">{education.period}</p>
          {education.activities && (
            <p className="text-sm text-muted-foreground pt-2 border-t border-border">
              {education.activities}
            </p>
          )}
        </div>
      </section>

      {/* Awards — compact list */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-accent" aria-hidden="true" />
          <h2 className="text-2xl font-bold text-foreground">Awards & Recognition</h2>
        </div>

        <ul className="space-y-4">
          {awards.map((award) => (
            <li
              key={award.title}
              className="bg-card border border-border rounded-lg p-6 space-y-3"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-lg font-semibold text-foreground">{award.title}</h3>
                <Badge variant="outline" className="text-xs">
                  {award.date}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {award.description}
              </p>
              {award.linkedinUrl && (
                <Button variant="outline" size="sm" asChild>
                  <a href={award.linkedinUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View LinkedIn post
                  </a>
                </Button>
              )}
            </li>
          ))}
        </ul>
      </section>

      {/* Cross-link */}
      <p className="text-sm text-muted-foreground">
        Looking for certifications?{" "}
        <Link to="/certifications" className="text-accent hover:underline">
          See all 17 →
        </Link>
      </p>
    </div>
  );
};

export default AcademicAwards;
