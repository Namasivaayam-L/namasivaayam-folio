import { Link, useLocation } from "react-router-dom";
import { HiHome, HiBriefcase, HiFolder, HiDocument, HiUser, HiMail, HiCode, HiMenu } from "react-icons/hi";
import { FaGithub, FaLinkedin, FaDiscord, FaAward } from "react-icons/fa";
import { cn } from "@/lib/utils";
import personalData from "@/data/personal.json";
import navigationData from "@/data/navigation.json";
import socialLinksData from "@/data/social-links.json";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { RESUME_URL, RESUME_FILENAME } from "@/lib/links";
import ThemeToggle from "@/components/ThemeToggle";

// Icon mapping for dynamic icon rendering
const iconMap = {
  HiHome,
  HiBriefcase,
  HiFolder,
  HiDocument,
  HiUser,
  HiMail,
  HiCode,
  FaDiscord,
  FaLinkedin,
  FaGithub,
  FaAward,
};

type NavItem =
  | { type: "link"; name: string; href: string; icon: string }
  | { type: "group"; name: string; items: { name: string; href: string; icon: string }[] };

const typedNavigation: NavItem[] = navigationData;

/** Secondary destinations surfaced in the footer instead of the primary nav. */
const footerLinks = [
  { name: "Certifications", href: "/certifications" },
  { name: "Education & Recognition", href: "/academic-awards" },
];

function NavLink({
  to,
  name,
  icon,
  isActive,
  closeOnClick,
}: {
  to: string;
  name: string;
  icon: string;
  isActive: boolean;
  closeOnClick: boolean;
}) {
  const IconComponent = iconMap[icon as keyof typeof iconMap];
  const navLink = (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all border border-transparent",
        isActive
          ? "bg-primary text-primary-foreground shadow-sm"
          : "text-sidebar-foreground hover:bg-sidebar-accent/50"
      )}
    >
      {IconComponent && <IconComponent className="w-4 h-4" />}
      <span>{name}</span>
    </Link>
  );

  return closeOnClick ? <SheetClose asChild>{navLink}</SheetClose> : navLink;
}

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

      <nav className="flex-1 px-3 py-4 space-y-1" aria-label="Primary">
        {typedNavigation.map((item) => {
          if (item.type === "group") {
            return (
              <div key={item.name} className="pt-3 space-y-1">
                <p className="px-3 pb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {item.name}
                </p>
                {item.items.map((subItem) => (
                  <div key={subItem.href} className="pl-3">
                    <NavLink
                      to={subItem.href}
                      name={subItem.name}
                      icon={subItem.icon}
                      isActive={location.pathname === subItem.href}
                      closeOnClick={closeOnClick}
                    />
                  </div>
                ))}
              </div>
            );
          }

          return (
            <NavLink
              key={item.href}
              to={item.href}
              name={item.name}
              icon={item.icon}
              isActive={location.pathname === item.href}
              closeOnClick={closeOnClick}
            />
          );
        })}
      </nav>

      <div className="p-4 border-t border-border space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-medium text-muted-foreground">More</p>
            <ThemeToggle />
          </div>
          <div className="flex flex-col gap-1">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "text-sm rounded-md px-2 py-1 transition-colors",
                  location.pathname === link.href
                    ? "text-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.name}
              </Link>
            ))}
            <a
              href={RESUME_URL}
              download={RESUME_FILENAME}
              className="text-sm rounded-md px-2 py-1 text-muted-foreground hover:text-foreground transition-colors"
            >
              Download Résumé
            </a>
          </div>
        </div>

        <div>
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
          <div className="max-w-4xl mx-auto flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center text-sm text-muted-foreground">
            <p>
              Made by {personalData.name.split(" ")[0]} | © {new Date().getFullYear()}
            </p>
            <div className="flex items-center gap-4">
              {footerLinks.map((link) => (
                <Link key={link.href} to={link.href} className="hover:text-foreground transition-colors">
                  {link.name}
                </Link>
              ))}
              <Link to="/contact" className="text-accent hover:underline">
                Reach out →
              </Link>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
