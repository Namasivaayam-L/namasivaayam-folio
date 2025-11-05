import { Link, useLocation } from "react-router-dom";
import { Home, Briefcase, FolderGit2, FileText, User, Mail, Wrench, Github, Linkedin, Twitter, Award } from "lucide-react";
import { cn } from "@/lib/utils";
import personalData from "@/data/personal.json";

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "Experience", href: "/experience", icon: Briefcase },
  { name: "Projects", href: "/projects", icon: FolderGit2 },
  { name: "Blogs", href: "/blogs", icon: FileText },
  { name: "About", href: "/about", icon: User },
  { name: "Contact", href: "/contact", icon: Mail },
  { name: "Tools", href: "/tools", icon: Wrench },
];

const socialLinks = [
  { name: "Twitter", icon: Twitter, href: personalData.links.twitter },
  { name: "LinkedIn", icon: Linkedin, href: personalData.links.linkedin },
  { name: "GitHub", icon: Github, href: personalData.links.github },
  { name: "Credly", icon: Award, href: personalData.links.credly },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 w-48 border-r border-border bg-sidebar-background flex flex-col">
        {/* Profile Section */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center text-white font-semibold text-sm">
              {personalData.name.split(" ").map(n => n[0]).join("")}
            </div>
            <div>
              <h2 className="font-semibold text-sm text-foreground">{personalData.name.split(" ")[0]}</h2>
              <p className="text-xs text-muted-foreground">{personalData.title.split("|")[0].trim()}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                )}
              >
                <Icon className="w-4 h-4" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Connect Section */}
        <div className="p-4 border-t border-border">
          <p className="text-xs font-medium text-muted-foreground mb-3">Connect</p>
          <div className="flex gap-2">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={link.name}
                >
                  <Icon className="w-4 h-4" />
                </a>
              );
            })}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-48 flex-1">
        <div className="max-w-4xl mx-auto px-8 py-12">
          {children}
        </div>

        {/* Footer */}
        <footer className="ml-48 border-t border-border py-6 px-8">
          <div className="max-w-4xl mx-auto flex justify-between items-center text-sm text-muted-foreground">
            <p>Made by {personalData.name.split(" ")[0]} | © 2025</p>
            <button className="hover:text-foreground transition-colors">Reach out →</button>
          </div>
        </footer>
      </main>
    </div>
  );
}
