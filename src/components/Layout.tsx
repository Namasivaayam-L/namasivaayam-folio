import { Link, useLocation } from "react-router-dom";
import { HiHome, HiBriefcase, HiFolder, HiDocument, HiUser, HiMail, HiCode } from "react-icons/hi";
import { HiWrench } from "react-icons/hi2";
import { FaGithub, FaLinkedin, FaDiscord, FaAward } from "react-icons/fa";
import { cn } from "@/lib/utils";
import personalData from "@/data/personal.json";
import navigationData from "@/data/navigation.json";
import socialLinksData from "@/data/social-links.json";

// Icon mapping for dynamic icon rendering
const iconMap = {
  HiHome,
  HiBriefcase, 
  HiFolder,
  HiDocument,
  HiUser,
  HiMail,
  HiCode,
  HiWrench,
  FaDiscord,
  FaLinkedin,
  FaGithub,
  FaAward,
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 w-64 border-r border-border bg-sidebar-background flex flex-col">
        {/* Profile Section */}
        <div className="p-6 border-b border-border">
          <div className="flex flex-col items-center gap-3 mb-2">
            <img 
              src="images/namachu-dp-cropped.jpg" 
              alt={personalData.name}
              className="w-24 h-24 rounded-full object-cover"
            />
            <div className="flex flex-col items-center">
              <h2 className="font-semibold text-sm text-foreground">{personalData.name.split(" ")[0]}</h2>
              <p className="text-xs text-muted-foreground">{personalData.title.split("|")[0].trim()}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navigationData.map((item) => {
            const IconComponent = iconMap[item.icon as keyof typeof iconMap];
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  // Changed transition-colors to transition-all for smoother border animation
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all border border-transparent",
                  isActive
                    ? // Active: Black BG, White Text.
                      // Active Hover: Invert back to transparent/white, Black Text, Black Border.
                      "bg-black text-white hover:bg-transparent hover:text-black hover:border-black shadow-sm"
                    : // Inactive: Standard text.
                      // Inactive Hover: Light gray background.
                      "text-sidebar-foreground hover:bg-sidebar-accent/50"
                )}
              >
                {IconComponent && <IconComponent className="w-4 h-4" />}
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Connect Section */}
        <div className="p-4 border-t border-border">
          <p className="text-xs font-medium text-muted-foreground mb-3">Connect</p>
          <div className="flex gap-2">
            {socialLinksData.map((link) => {
              const IconComponent = iconMap[link.icon as keyof typeof iconMap];
              const href = personalData.links[link.key as keyof typeof personalData.links];
              return (
                <a
                  key={link.name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={link.name}
                >
                  {IconComponent && <IconComponent className="w-5 h-5" />}
                </a>
              );
            })}
          </div>
        </div>
      </aside>
      {/* Sidebar */}

      {/* Main Content */}
      <main className="ml-64 flex-1">
        <div className="max-w-4xl mx-auto px-8 py-12">
          {children}
        </div>

        {/* Footer */}
        <footer className="ml-64 border-t border-border py-6 px-8">
          <div className="max-w-4xl mx-auto flex justify-between items-center text-sm text-muted-foreground">
            <p>Made by {personalData.name.split(" ")[0]} | © 2025</p>
            <button className="hover:text-foreground transition-colors">Reach out →</button>
          </div>
        </footer>
      </main>
    </div>
  );
}
