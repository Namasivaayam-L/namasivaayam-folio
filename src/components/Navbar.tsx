import { useState, type MouseEvent } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import personalData from "@/data/personal.json";
import { RESUME_URL, RESUME_FILENAME } from "@/lib/links";
import { PaletteButton, PaletteRow } from "@/components/PaletteSwitcher";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Timeline", href: "#experience" },
  { label: "Work", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Certificates", href: "#certificates" },
  { label: "Publications", href: "#publications" },
  { label: "Contact", href: "#contact" },
];

/** Monogram badge: bordered lime square with an inner circle and initials. */
function Monogram() {
  return (
    <span className="relative flex h-9 w-9 items-center justify-center rounded-lg border-2 border-foreground bg-primary shadow-brutal-sm transition-transform group-hover:-translate-y-0.5">
      <span className="relative flex h-5 w-5 items-center justify-center rounded-full border-[1.5px] border-foreground">
        <span className="text-[10px] font-black uppercase tracking-tighter text-foreground">NL</span>
        <span className="absolute -right-[1.5px] -top-[1.5px] h-1.5 w-1.5 rounded-full border border-foreground bg-secondary" />
      </span>
    </span>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);

  /** The Work link lands on the fanned deck (cards + arrows) instead of the
   *  section top — title + deck + controls never fit one viewport together.
   *  Hash stays #projects; other links keep native anchor scrolling. */
  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href !== "#projects") return;
    const deck = document.getElementById("projects-deck");
    if (!deck) return; // mobile stack has no deck → native scroll to the section
    e.preventDefault();
    if (location.hash !== "#projects") history.pushState(null, "", "#projects");
    deck.scrollIntoView({ block: "start" }); // behavior "auto" defers to CSS smooth scroll
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 pb-4">
      <div className="mx-auto flex max-w-6xl items-center justify-between rounded-xl border-2 border-foreground bg-background/70 px-4 py-2.5 shadow-brutal backdrop-blur-md">
        <a href="#top" className="group flex items-center gap-3">
          <Monogram />
          <span className="hidden text-sm font-bold tracking-tight text-foreground sm:block">{personalData.name}</span>
        </a>

        {/* Full link row only fits from xl (1280px); below that the sheet
            carries every link, so the header never overflows. */}
        <nav className="hidden items-center gap-6 xl:flex" aria-label="Main">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="rounded-md px-2 py-1 text-[14px] font-bold text-foreground transition-all hover:-translate-y-0.5 hover:bg-primary"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <PaletteButton />
          <a
            href={personalData.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-lg border-2 border-foreground bg-card transition-all hover:-translate-y-0.5 hover:bg-foreground hover:text-background"
            aria-label="GitHub"
          >
            <FaGithub className="h-4 w-4" aria-hidden="true" />
          </a>
          <a
            href={personalData.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-lg border-2 border-foreground bg-card transition-all hover:-translate-y-0.5 hover:border-[#0A66C2] hover:bg-[#0A66C2] hover:text-white"
            aria-label="LinkedIn"
          >
            <FaLinkedin className="h-4 w-4" aria-hidden="true" />
          </a>
          <a
            href={RESUME_URL}
            download={RESUME_FILENAME}
            className="ml-2 flex h-9 items-center justify-center rounded-lg border-2 border-foreground bg-secondary px-5 text-[14px] font-bold text-secondary-foreground shadow-brutal-sm transition-transform hover:-translate-y-0.5"
          >
            Resume
          </a>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-lg border-2 border-foreground bg-card xl:hidden"
              aria-label="Open menu"
            >
              {open ? <HiX className="h-5 w-5" aria-hidden="true" /> : <HiMenu className="h-5 w-5" aria-hidden="true" />}
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="flex w-72 flex-col gap-6 border-l-2 border-foreground bg-background">
            <SheetTitle className="sr-only">Navigation menu</SheetTitle>
            <SheetDescription className="sr-only">
              Jump to a section of my portfolio, or grab my resume and social links.
            </SheetDescription>
            <nav className="flex flex-col gap-2" aria-label="Mobile">
              {NAV_LINKS.map((link) => (
                <SheetClose asChild key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="rounded-lg border-2 border-foreground bg-card px-4 py-3 text-base font-bold shadow-brutal-sm transition-transform hover:-translate-y-0.5 hover:bg-primary"
                  >
                    {link.label}
                  </a>
                </SheetClose>
              ))}
            </nav>

            <div className="flex flex-col gap-3">
              <a
                href={RESUME_URL}
                download={RESUME_FILENAME}
                className="flex h-10 items-center justify-center rounded-lg border-2 border-foreground bg-secondary px-5 text-sm font-bold text-secondary-foreground shadow-brutal-sm"
              >
                Resume
              </a>
              <div className="flex gap-2">
                <a
                  href={personalData.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-foreground bg-card hover:bg-foreground hover:text-background"
                  aria-label="GitHub"
                >
                  <FaGithub className="h-5 w-5" aria-hidden="true" />
                </a>
                <a
                  href={personalData.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-foreground bg-card hover:border-[#0A66C2] hover:bg-[#0A66C2] hover:text-white"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin className="h-5 w-5" aria-hidden="true" />
                </a>
              </div>
            </div>

            {/* Palette picker lives in the footer of the sheet so the mobile
                menu mirrors the desktop navbar's capabilities. */}
            <div className="mt-auto rounded-lg border-2 border-foreground bg-foreground p-3">
              <PaletteRow />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
