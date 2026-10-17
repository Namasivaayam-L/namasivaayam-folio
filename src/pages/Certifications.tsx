import { Badge } from "@/components/ui/badge";
import { ExternalLink, Award } from "lucide-react";
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

const typedCertifications: Certification[] = certificationsData;

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

function isExpired(cert: Certification): boolean {
  if (cert.expired) return true;
  if (!cert.expires) return false;
  return new Date(cert.expires) < new Date();
}

function FeaturedCard({ cert }: { cert: Certification }) {
  return (
    <div className="rounded-lg border border-accent/40 bg-card p-6 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-3">
        <Award className="w-6 h-6 text-accent shrink-0 mt-1" aria-hidden="true" />
        <Badge variant="secondary" className="text-xs shrink-0">
          {cert.issuer}
        </Badge>
      </div>

      <div className="space-y-1">
        <h3 className="text-lg font-semibold text-foreground leading-snug">{cert.name}</h3>
        <p className="text-sm text-muted-foreground">{cert.issuer}</p>
      </div>

      {cert.note && (
        <p className="text-sm text-muted-foreground leading-relaxed flex-1">{cert.note}</p>
      )}

      <div className="flex items-center justify-between pt-2 border-t border-border">
        <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
          <span>Earned {formatDate(cert.earned)}</span>
          {cert.expires && <span>Valid until {formatDate(cert.expires)}</span>}
        </div>
        <a
          href={`https://www.credly.com/badges/${cert.badgeId}/public_profile`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-xs text-accent hover:underline shrink-0"
          aria-label={`Verify ${cert.name} on Credly`}
        >
          <ExternalLink className="w-3.5 h-3.5 mr-1" aria-hidden="true" />
          Verify
        </a>
      </div>
    </div>
  );
}

function CompactRow({ cert }: { cert: Certification }) {
  const expired = isExpired(cert);

  return (
    <li className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-3 border-b border-border last:border-b-0">
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-foreground">{cert.name}</p>
        <p className="text-xs text-muted-foreground">
          {cert.issuer} · Earned {formatDate(cert.earned)}
          {cert.expires && ` · ${expired ? "Expired" : "Valid until"} ${formatDate(cert.expires)}`}
        </p>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        {expired && (
          <Badge variant="outline" className="text-xs text-destructive border-destructive/40">
            Expired
          </Badge>
        )}
        <a
          href={`https://www.credly.com/badges/${cert.badgeId}/public_profile`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-xs text-accent hover:underline"
          aria-label={`Verify ${cert.name} on Credly`}
        >
          <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
        </a>
      </div>
    </li>
  );
}

export default function Certifications() {
  // Active (non-expired) certs: featured first, then grouped by issuer.
  const active = typedCertifications.filter((c) => !isExpired(c));
  const featured = active.filter((c) => c.featured);
  const rest = active.filter((c) => !c.featured);
  const byIssuer = rest.reduce<Record<string, Certification[]>>((acc, cert) => {
    (acc[cert.issuer] ??= []).push(cert);
    return acc;
  }, {});

  // Expired certs sink to the very bottom.
  const expired = typedCertifications.filter((c) => isExpired(c));

  return (
    <div className="space-y-10 animate-fade-in">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-foreground">Certifications</h1>
        <p className="text-muted-foreground max-w-2xl">
          {typedCertifications.length} professional certifications across AWS and Google Cloud —
          spanning generative AI, cloud architecture, Kubernetes, and infrastructure. Every badge
          links to its public Credly verification.
        </p>
      </div>

      {/* Featured professional certifications */}
      {featured.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Professional level</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {featured.map((cert) => (
              <FeaturedCard key={cert.badgeId} cert={cert} />
            ))}
          </div>
        </section>
      )}

      {/* Remaining active, grouped by issuer */}
      {Object.entries(byIssuer).map(([issuer, certs]) => (
        <section key={issuer} className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">
            {issuer} <span className="text-sm font-normal text-muted-foreground">({certs.length})</span>
          </h2>
          <ul className="bg-card border border-border rounded-lg px-5">
            {certs.map((cert) => (
              <CompactRow key={cert.badgeId} cert={cert} />
            ))}
          </ul>
        </section>
      ))}

      {/* Expired — always last */}
      {expired.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-muted-foreground">Expired</h2>
          <ul className="bg-card border border-border rounded-lg px-5 opacity-80">
            {expired.map((cert) => (
              <CompactRow key={cert.badgeId} cert={cert} />
            ))}
          </ul>
        </section>
      )}

      {typedCertifications.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No certifications yet. Check back soon!</p>
        </div>
      )}
    </div>
  );
}
