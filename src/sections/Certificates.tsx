import { useState } from "react";
import { ChevronDown, ExternalLink } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import Reveal from "@/components/Reveal";
import certificationsData from "@/data/certifications.json";

interface Certification {
  badgeId: string;
  name: string;
  issuer: string;
  earned: string;
  expires: string | null;
  expired?: boolean;
  featured?: boolean;
  note?: string;
}

const certifications: Certification[] = certificationsData;

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

function isExpired(cert: Certification): boolean {
  if (cert.expired) return true;
  if (!cert.expires) return false;
  return new Date(cert.expires) < new Date();
}

function CertCard({ cert, expanded }: { cert: Certification; expanded: boolean }) {
  const expired = isExpired(cert);
  const verifyUrl = `https://www.credly.com/badges/${cert.badgeId}/public_profile`;

  return (
    <div className="flex h-full flex-col rounded-xl border-2 border-foreground bg-card p-5 shadow-brutal transition-all duration-300 hover:-translate-y-1 hover:shadow-brutal-lg md:p-6">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full border-2 border-foreground bg-band px-3 py-1 font-mono text-[11px] font-bold shadow-brutal-xs">
          {cert.issuer} • {formatDate(cert.earned)}
        </span>
        {expired && (
          <span className="rounded-full border-2 border-foreground bg-glow px-3 py-1 font-mono text-[11px] font-bold shadow-brutal-xs">
            Expired
          </span>
        )}
      </div>

      <h3 className={`mt-4 font-bold leading-snug ${expanded ? "text-base" : "text-lg"}`}>{cert.name}</h3>

      {cert.note && <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{cert.note}</p>}

      <a
        href={verifyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto inline-flex items-center gap-1.5 pt-4 font-mono text-xs font-bold uppercase tracking-widest transition-colors hover:text-secondary"
        aria-label={`Verify ${cert.name} on Credly`}
      >
        View certificate
        <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
      </a>
    </div>
  );
}

export default function Certificates() {
  const [showAll, setShowAll] = useState(false);

  // Featured credentials always fill the top row — expired ones show an
  // "Expired" pill rather than disappearing (keeps the row balanced).
  const featured = certifications.filter((c) => c.featured);
  const rest = certifications.filter((c) => !c.featured && !isExpired(c));
  const expired = certifications.filter((c) => !c.featured && isExpired(c));
  const hidden = [...rest, ...expired];

  return (
    <section id="certificates" className="border-y-[6px] border-foreground bg-band py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader
          index="04"
          label="CREDENTIALS"
          title="Certifications"
          subtitle="Professional credentials — AWS & Google Cloud"
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {featured.map((cert, i) => (
            <Reveal key={cert.badgeId} delay={i * 0.08}>
              <CertCard cert={cert} expanded />
            </Reveal>
          ))}
        </div>

        {hidden.length > 0 && (
          <>
            {showAll && (
              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {hidden.map((cert) => (
                  <CertCard key={cert.badgeId} cert={cert} expanded={false} />
                ))}
              </div>
            )}

            <div className="mt-8 flex justify-start">
              <button
                type="button"
                onClick={() => setShowAll((v) => !v)}
                aria-expanded={showAll}
                className="press-effect inline-flex items-center gap-2 rounded-xl border-[3px] border-foreground bg-foreground px-6 py-3 font-bold text-background shadow-brutal"
              >
                {showAll ? "Hide" : `View all ${certifications.length} certificates`}
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${showAll ? "rotate-180" : ""}`}
                  aria-hidden="true"
                />
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
