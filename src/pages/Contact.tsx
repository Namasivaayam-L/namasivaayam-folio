import { Button } from "@/components/ui/button";
import { HiMail } from "react-icons/hi";
import { FaDiscord, FaLinkedin, FaGithub, FaAward } from "react-icons/fa";
import personalData from "@/data/personal.json";

export default function Contact() {
  return (
    <div className="space-y-12 animate-fade-in flex flex-col items-center justify-center min-h-[60vh]">
      <div className="text-center space-y-6 max-w-2xl">
        <h1 className="text-4xl font-bold text-foreground">Contact</h1>
        
        <p className="text-muted-foreground">
          If you're building in / excited about AI or just wanna chat — here are the ways to reach me.
        </p>

  {/* Contact Options Grid */}
  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full">
            <Button className="w-full" asChild>
              <a href={`mailto:${personalData.email}`} target="_blank" rel="noopener noreferrer">
                <HiMail className="w-4 h-4 mr-2" />
                Email
              </a>
            </Button>

            <Button className="w-full" asChild>
              <a href={personalData.links.discord} target="_blank" rel="noopener noreferrer">
                <FaDiscord className="w-4 h-4 mr-2" />
                Discord
              </a>
            </Button>

            <Button className="w-full" asChild>
              <a href={personalData.links.linkedin} target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="w-4 h-4 mr-2" />
                LinkedIn
              </a>
            </Button>

            <Button className="w-full" asChild>
              <a href={personalData.links.github} target="_blank" rel="noopener noreferrer">
                <FaGithub className="w-4 h-4 mr-2" />
                GitHub
              </a>
            </Button>

            <Button className="w-full" asChild>
              <a href={personalData.links.credly} target="_blank" rel="noopener noreferrer">
                <FaAward className="w-4 h-4 mr-2" />
                Credly
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
