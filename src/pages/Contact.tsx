import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import personalData from "@/data/personal.json";

export default function Contact() {
  return (
    <div className="space-y-12 animate-fade-in flex flex-col items-center justify-center min-h-[60vh]">
      <div className="text-center space-y-6 max-w-2xl">
        <h1 className="text-4xl font-bold text-foreground">Contact</h1>
        
        <p className="text-muted-foreground">
          If you're building in / excited about AI or just wanna chat, say hi on X!
        </p>

        {/* Twitter CTA */}
        <div className="flex items-center justify-center gap-4 p-6 bg-card border border-border rounded-lg">
          <div className="flex-1 text-left">
            <p className="text-sm text-foreground">Connect with me on X for AI engineering insights & more</p>
          </div>
          <Button asChild>
            <a href={personalData.links.twitter} target="_blank" rel="noopener noreferrer">
              Follow
            </a>
          </Button>
        </div>

        {/* Book a Call */}
        <div className="pt-4">
          <Button variant="outline" size="lg" asChild>
            <a href={`mailto:${personalData.email}`}>
              <ExternalLink className="w-4 h-4 mr-2" />
              Book a call
            </a>
          </Button>
        </div>

        {/* Decorative Element */}
        <div className="pt-12 opacity-50">
          <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto">
            <circle cx="50" cy="50" r="40" fill="url(#gradient)" />
            <defs>
              <linearGradient id="gradient" x1="0" y1="0" x2="100" y2="100">
                <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.3" />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
}
