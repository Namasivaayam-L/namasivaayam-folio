import { Link, useLocation } from "react-router-dom";
import { HiHome, HiBriefcase, HiFolder, HiDocument, HiUser, HiMail, HiCode, HiMenu } from "react-icons/hi";
import { HiWrench } from "react-icons/hi2";
import { FaGithub, FaLinkedin, FaDiscord, FaAward } from "react-icons/fa";
import { cn } from "@/lib/utils";
import personalData from "@/data/personal.json";
import navigationData from "@/data/navigation.json";
import socialLinksData from "@/data/social-links.json";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

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

function SidebarContent({
  location,
  closeOnClick = false,
}: {
  location: ReturnType<typeof useLocation>;
  closeOnClick?: boolean;
}) {
  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b border-border">
        <div className="flex flex-col items-center gap-3 mb-2">
          <img
            src="images/namachu-dp-cropped.jpg"
            alt={personalData.name}
            className="w-24 h-24 rounded-full object-cover"
          />
          <div className="flex flex-col items-center">
            <h2 className="font-semibold text-lg text-foreground">{personalData.name.split(" ")[0]}</h2>
            <p className="text-sm text-muted-foreground">{personalData.title.split("|")[0].trim()}</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {navigationData.map((item) => {
          const IconComponent = iconMap[item.icon as keyof typeof iconMap];
          const isActive = location.pathname === item.href;
          const navLink = (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all border border-transparent",
                isActive
                  ? "bg-black text-white hover:bg-transparent hover:text-black hover:border-black shadow-sm"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50"
              )}
            >
              {IconComponent && <IconComponent className="w-4 h-4" />}
              <span>{item.name}</span>
            </Link>
          );

          return closeOnClick ? (
            <SheetClose asChild key={item.name}>
              {navLink}
            </SheetClose>
          ) : (
            navLink
          );
        })}
      </nav>

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
    </div>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  return (
    <div className="flex min-h-screen w-full bg-background">
      <aside className="hidden md:flex fixed inset-y-0 left-0 w-64 border-r border-border bg-sidebar-background flex-col">
        <SidebarContent location={location} />
      </aside>

      <Sheet>
        <SheetTrigger asChild>
          <button
            type="button"
            className="md:hidden fixed top-2 left-2 z-50 inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-foreground shadow-sm transition hover:bg-muted"
            aria-label="Open navigation menu"
          >
            <HiMenu className="h-5 w-5" />
          </button>
        </SheetTrigger>
        <SheetContent side="left" className="md:hidden">
          <SheetTitle className="sr-only">Navigation menu</SheetTitle>
          <SidebarContent location={location} closeOnClick={true} />
        </SheetContent>
      </Sheet>

      <main className="flex-1 md:ml-64">
        <div className="max-w-4xl mx-auto px-4 pt-16 pb-12 sm:px-6 md:px-8 md:pt-12">
          {children}
        </div>

        <footer className="border-t border-border py-6 px-4 sm:px-6 md:px-8">
          <div className="max-w-4xl mx-auto flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center text-sm text-muted-foreground">
            <p>Made by {personalData.name.split(" ")[0]} | © 2025</p>
            <button className="hover:text-foreground transition-colors">Reach out →</button>
          </div>
        </footer>
      </main>
    </div>
  );
}
