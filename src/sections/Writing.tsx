import { ExternalLink } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import Reveal from "@/components/Reveal";
import blogsData from "@/data/blogs.json";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function Writing() {
  return (
    <section id="writing" className="bg-surface px-4 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeader index="06" label="NOTES & ESSAYS" title="Writing" />

        <div className="mt-10 space-y-6">
          {blogsData.map((post, i) => (
            <Reveal key={post.id} delay={i * 0.08}>
              <article className="group grid overflow-hidden rounded-xl border-2 border-foreground bg-card shadow-brutal transition-all duration-300 hover:-translate-y-1 hover:shadow-brutal-lg md:grid-cols-[1fr_320px]">
                <div className="flex flex-col p-6 md:p-8">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full border-2 border-foreground bg-primary px-3 py-1 font-mono text-[11px] font-bold shadow-brutal-xs">
                      {post.category}
                    </span>
                    <span className="rounded-full border-2 border-foreground bg-card px-3 py-1 font-mono text-[11px] font-bold shadow-brutal-xs">
                      {formatDate(post.date)}
                    </span>
                  </div>

                  <h3 className="mt-4 text-xl font-bold leading-snug md:text-2xl">{post.title}</h3>
                  <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">{post.excerpt}</p>

                  <ul className="mt-4 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border-2 border-foreground bg-card px-2.5 py-1 font-mono text-[10px] font-bold shadow-brutal-xs"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>

                  <a
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex items-center gap-2 pt-6 font-mono text-xs font-bold uppercase tracking-widest transition-colors hover:text-secondary"
                    aria-label={`Read ${post.title}`}
                  >
                    Read article
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </div>

                <div className="relative min-h-[220px] border-t-2 border-foreground bg-muted md:border-l-2 md:border-t-0">
                  <img
                    src={post.imageUrl}
                    alt=""
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
