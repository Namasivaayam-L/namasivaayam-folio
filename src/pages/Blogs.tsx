import { Badge } from "@/components/ui/badge";
import blogsData from "@/data/blogs.json";

export default function Blogs() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-foreground">Pensieve</h1>
        <p className="text-muted-foreground">
          A collection of thoughts, ideas, and musings. You can check more of my writings on my{" "}
          <a
            href="https://medium.com/@namasivaayam"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            Medium
          </a>{" "}
          profile.
        </p>
      </div>

      {/* Blog Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {blogsData.map((blog, index) => (
          <div
            key={blog.id}
            className="group bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all animate-slide-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Placeholder Image */}
            <div className="h-48 bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center">
              <div className="text-center p-6">
                <h3 className="text-2xl font-bold text-foreground">{blog.title.split(":")[0]}</h3>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors line-clamp-2">
                  {blog.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-2 line-clamp-3">{blog.excerpt}</p>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  {new Date(blog.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                <Badge variant="secondary" className="text-xs">
                  {blog.category}
                </Badge>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {blogsData.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No blog posts yet. Check back soon!</p>
        </div>
      )}
    </div>
  );
}
