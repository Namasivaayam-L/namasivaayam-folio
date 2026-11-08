import { useState } from "react";
import { useForm } from "react-hook-form";
import { Check, Copy, ExternalLink, Send } from "lucide-react";
import { FaAward, FaDiscord, FaGithub, FaLinkedin } from "react-icons/fa";
import Reveal from "@/components/Reveal";
import personalData from "@/data/personal.json";
import socialLinksData from "@/data/social-links.json";

const REASONS = ["Internship", "Research", "Project collab", "Just saying hi"];

interface SocialStyle {
  href: string;
  label: string;
  icon: React.ReactNode;
  className: string;
}

/** Brand-styled social destinations, driven by social-links.json. */
function useSocials(): SocialStyle[] {
  const icons: Record<string, React.ReactNode> = {
    github: <FaGithub className="h-4 w-4" aria-hidden="true" />,
    linkedin: <FaLinkedin className="h-4 w-4" aria-hidden="true" />,
    credly: <FaAward className="h-4 w-4" aria-hidden="true" />,
    discord: <FaDiscord className="h-4 w-4" aria-hidden="true" />,
  };
  const brand: Record<string, string> = {
    github: "bg-card text-foreground hover:bg-muted",
    linkedin: "bg-[#0077b5] text-white hover:brightness-110",
    credly: "bg-[#FF5A21] text-white hover:brightness-110",
    discord: "bg-[#5865F2] text-white hover:brightness-110",
  };
  const order = ["github", "linkedin", "credly", "discord"];

  return socialLinksData
    .slice()
    .sort((a, b) => order.indexOf(a.key) - order.indexOf(b.key))
    .map((link) => ({
      href: personalData.links[link.key as keyof typeof personalData.links],
      label: link.name,
      icon: icons[link.key],
      className: brand[link.key],
    }));
}

interface FormValues {
  name: string;
  email: string;
  message: string;
}

export default function Contact() {
  const [reason, setReason] = useState(REASONS[0]);
  const [copied, setCopied] = useState(false);
  const socials = useSocials();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { name: "", email: "", message: "" },
  });

  const messageLength = watch("message")?.length ?? 0;

  const onSubmit = (data: FormValues) => {
    const subject = `[Portfolio] ${reason} — ${data.name}`;
    const body = `${data.message}\n\n— ${data.name} (${data.email})\nReaching out about: ${reason}`;
    window.location.href = `mailto:${personalData.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    reset();
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personalData.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* Clipboard unavailable — the address stays visible. */
    }
  };

  const inputClass =
    "rounded-xl border-[2.5px] border-foreground bg-card px-4 py-3 text-[15px] font-medium text-foreground outline-none transition-shadow placeholder:text-muted-foreground focus:shadow-brutal-md";

  return (
    <section id="contact" className="bg-surface bg-dotgrid px-4 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Pitch card */}
          <Reveal className="relative flex flex-col justify-between rounded-[24px] border-[3px] border-foreground bg-band p-8 shadow-brutal-8 lg:col-span-5 md:p-12">
            <div>
              <span className="mb-6 inline-block rounded-sm bg-foreground px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-widest text-band">
                10 / Contact
              </span>
              <h2 className="text-balance text-[3.5rem] font-black leading-[0.95] tracking-tight text-foreground md:text-[4rem]">
                Let's build
                <br />
                something
                <br />
                impactful
                <span className="text-glow">.</span>
              </h2>
              <p className="mt-6 max-w-[280px] text-[16px] font-medium leading-relaxed text-foreground/90">
                Open to AI/ML roles, research collaborations, and hard problems in production GenAI. Tell me what
                you're building.
              </p>

              <div className="mt-6 inline-flex items-center gap-2 rounded-full border-2 border-foreground bg-card px-4 py-2 text-xs font-bold shadow-brutal-sm">
                <span className="relative flex h-3 w-3" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex h-3 w-3 rounded-full border-[1.5px] border-foreground bg-band" />
                </span>
                Usually replies within 24 hours
              </div>
            </div>

            <div className="mt-12 flex flex-col gap-4">
              <div className="flex flex-col gap-2 rounded-xl border-[3px] border-foreground bg-card p-3 shadow-brutal-md sm:flex-row sm:items-center sm:justify-between sm:p-2">
                <span className="break-all font-mono text-[14px] font-bold sm:pl-3">{personalData.email}</span>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="press-effect inline-flex shrink-0 items-center justify-center gap-2 self-end rounded-lg bg-foreground px-5 py-2.5 text-xs font-bold text-background transition-transform sm:self-auto"
                  aria-label="Copy email address"
                >
                  {copied ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : <Copy className="h-3.5 w-3.5" aria-hidden="true" />}
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>

              <div className="mt-2 grid grid-cols-2 gap-3">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group flex items-center justify-between rounded-xl border-[3px] border-foreground px-4 py-3 text-sm font-bold shadow-brutal-md transition-all hover:-translate-y-1 ${social.className}`}
                    aria-label={social.label}
                  >
                    <span className="flex items-center gap-2">
                      {social.icon}
                      {social.label}
                    </span>
                    <ExternalLink className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Form card — col-span lives on Reveal: it is the actual grid child. */}
          <Reveal delay={0.1} className="lg:col-span-7">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex h-full flex-col rounded-[24px] border-[3px] border-foreground bg-card p-8 shadow-brutal-8 md:p-12"
            >
              <div className="mb-8">
                <h3 className="mb-2 text-3xl font-black tracking-tight md:text-4xl">Send a message</h3>
                <p className="font-mono text-sm font-bold text-muted-foreground">
                  Tell me what you're working on. I'll reply by email.
                </p>
              </div>

              <div className="mb-6">
                <p className="mb-3 font-mono text-[11px] font-bold uppercase tracking-widest">I'm reaching out about</p>
                <div className="flex flex-wrap gap-2" role="group" aria-label="Reason for reaching out">
                  {REASONS.map((option) => {
                    const active = reason === option;
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setReason(option)}
                        aria-pressed={active}
                        className={`rounded-full border-[2.5px] border-foreground px-4 py-1.5 text-[13px] font-bold transition-all ${
                          active
                            ? "bg-foreground text-background shadow-[2.5px_2.5px_0_0_hsl(var(--glow))]"
                            : "bg-card hover:-translate-y-0.5 hover:shadow-brutal-xs"
                        }`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mb-6 grid gap-6 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label htmlFor="contact-name" className="font-mono text-[11px] font-bold uppercase tracking-widest">
                    Your name
                  </label>
                  <input
                    id="contact-name"
                    placeholder="Jane Doe"
                    className={inputClass}
                    aria-invalid={!!errors.name}
                    {...register("name", { required: "Please enter your name" })}
                  />
                  {errors.name && (
                    <span className="font-mono text-xs text-destructive">{errors.name.message}</span>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="contact-email" className="font-mono text-[11px] font-bold uppercase tracking-widest">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    placeholder="jane@company.com"
                    className={inputClass}
                    aria-invalid={!!errors.email}
                    {...register("email", {
                      required: "Please enter your email",
                      pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email" },
                    })}
                  />
                  {errors.email && (
                    <span className="font-mono text-xs text-destructive">{errors.email.message}</span>
                  )}
                </div>
              </div>

              <div className="relative mb-8 flex flex-col gap-2">
                <label htmlFor="contact-message" className="font-mono text-[11px] font-bold uppercase tracking-widest">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  rows={6}
                  maxLength={500}
                  placeholder="What's the project or role, and how can I help?"
                  className={`${inputClass} resize-none pb-8 leading-relaxed`}
                  aria-invalid={!!errors.message}
                  {...register("message", { required: "Please add a message" })}
                />
                <span className="pointer-events-none absolute bottom-3 right-4 font-mono text-[10px] font-bold text-muted-foreground">
                  {messageLength} / 500
                </span>
                {errors.message && (
                  <span className="font-mono text-xs text-destructive">{errors.message.message}</span>
                )}
              </div>

              <div className="mt-auto flex flex-col-reverse items-start justify-between gap-6 sm:flex-row sm:items-center">
                <p className="max-w-[200px] font-mono text-[11px] font-bold leading-relaxed text-muted-foreground">
                  Sends a direct email straight to my inbox.
                </p>
                <button
                  type="submit"
                  className="press-effect inline-flex items-center gap-2 rounded-xl border-[3px] border-foreground bg-glow px-6 py-3 font-bold text-foreground shadow-brutal-md transition-all hover:-translate-y-1"
                >
                  Send message
                  <Send className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
