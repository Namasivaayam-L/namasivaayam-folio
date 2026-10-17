import { Button } from "@/components/ui/button";
import { HiMail } from "react-icons/hi";
import { FaDiscord, FaLinkedin, FaGithub, FaAward } from "react-icons/fa";
import personalData from "@/data/personal.json";

interface Channel {
  name: string;
  description: string;
  href: string;
  icon: React.ReactNode;
}

const channels: Channel[] = [
  {
    name: "Email",
    description: "Best for anything substantive — roles, collaborations, questions.",
    href: `mailto:${personalData.email}`,
    icon: <HiMail className="w-5 h-5" aria-hidden="true" />,
  },
  {
    name: "LinkedIn",
    description: "For professional updates and messaging.",
    href: personalData.links.linkedin,
    icon: <FaLinkedin className="w-5 h-5" aria-hidden="true" />,
  },
  {
    name: "GitHub",
    description: "Where the code lives — issues and discussions welcome.",
    href: personalData.links.github,
    icon: <FaGithub className="w-5 h-5" aria-hidden="true" />,
  },
  {
    name: "Credly",
    description: "Verified certifications and credentials.",
    href: personalData.links.credly,
    icon: <FaAward className="w-5 h-5" aria-hidden="true" />,
  },
  {
    name: "Discord",
    description: "Quickest for a casual hello.",
    href: personalData.links.discord,
    icon: <FaDiscord className="w-5 h-5" aria-hidden="true" />,
  },
];

export default function Contact() {
  return (
    <div className="space-y-10 animate-fade-in">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-foreground">Contact</h1>
        <p className="text-muted-foreground max-w-2xl">
          If you're building in or excited about AI — or just want to compare notes on production
          LLM systems — I'd like to hear from you. Email gets the fastest reply.
        </p>
      </div>

      {/* Primary CTA */}
      <div className="bg-card border border-border rounded-lg p-6 space-y-4">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Reach me directly at</p>
          <a
            href={`mailto:${personalData.email}`}
            className="text-xl font-semibold text-foreground hover:text-accent transition-colors break-all"
          >
            {personalData.email}
          </a>
        </div>
        <Button asChild>
          <a href={`mailto:${personalData.email}`}>
            <HiMail className="w-4 h-4 mr-2" />
            Send an email
          </a>
        </Button>
        <p className="text-xs text-muted-foreground">Based in {personalData.location}</p>
      </div>

      {/* All channels */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Other channels</h2>
        <ul className="grid gap-3 sm:grid-cols-2">
          {channels.map((channel) => (
            <li key={channel.name}>
              <a
                href={channel.href}
                target={channel.href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="group flex items-start gap-3 bg-card border border-border rounded-lg p-4 hover:shadow-md hover:border-accent/40 transition-all"
              >
                <span className="text-accent mt-0.5 shrink-0">{channel.icon}</span>
                <span className="min-w-0">
                  <span className="block text-sm font-medium text-foreground group-hover:text-accent transition-colors">
                    {channel.name}
                  </span>
                  <span className="block text-xs text-muted-foreground mt-0.5">
                    {channel.description}
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
