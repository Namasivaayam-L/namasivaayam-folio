import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import personalData from "@/data/personal.json";
import { RESUME_URL, RESUME_FILENAME } from "@/lib/links";

const ROLE_TEXT = "ML ENGINEER";

/** Type-on effect for the hero role box (instant when motion is reduced). */
function useTypedRole(): string {
  const reduceMotion = useReducedMotion();
  const [typed, setTyped] = useState(reduceMotion ? ROLE_TEXT : "");

  useEffect(() => {
    if (reduceMotion) return;
    let i = 0;
    const timer = window.setInterval(() => {
      i += 1;
      setTyped(ROLE_TEXT.slice(0, i));
      if (i >= ROLE_TEXT.length) window.clearInterval(timer);
    }, 90);
    return () => window.clearInterval(timer);
  }, [reduceMotion]);

  return typed;
}

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const typed = useTypedRole();

  const rise = (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 40 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease: "easeOut" as const },
        };

  return (
    <section id="top" className="relative flex min-h-screen w-full flex-col overflow-hidden bg-surface">
      {/* Graph-paper lines */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-10" aria-hidden="true">
        <div className="h-full w-full bg-lines" />
      </div>

      <div className="relative z-20 mx-auto flex w-full max-w-[1400px] flex-1 flex-col px-6 pt-32 lg:flex-row lg:px-12 lg:pt-40">
        {/* Copy */}
        <motion.div
          className="relative z-30 mt-0 flex w-full flex-col items-start lg:mt-4 lg:w-[55%]"
          {...rise(0)}
        >
          <h1 className="relative flex flex-col items-start whitespace-nowrap text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-[4.5rem] lg:text-[5rem] xl:text-[6rem]">
            <span>
              {personalData.name}
              <span className="mb-2 ml-2 inline-block h-4 w-4 rounded-full bg-band md:h-5 md:w-5 lg:mb-4" />
            </span>
            <span className="mt-2 inline-flex h-[44px] w-[200px] items-center border-2 border-foreground bg-primary px-4 font-mono text-xl uppercase tracking-widest text-primary-foreground shadow-brutal-sm sm:h-[52px] sm:w-[260px] sm:text-2xl md:mt-4 lg:h-[60px] lg:w-[310px] lg:text-3xl">
              {typed}
              <span className="animate-caret ml-0.5 inline-block h-[1.1em] w-[3px] bg-foreground" aria-hidden="true" />
            </span>
          </h1>

          <p className="mt-4 max-w-[22rem] text-base font-medium leading-snug text-foreground/80 sm:text-lg lg:mt-6 lg:max-w-[28rem] lg:text-xl">
            Engineering production GenAI systems. I build end-to-end machine learning applications —
            from document extraction pipelines to multi-agent orchestration and LLM evaluation.
          </p>

          <div className="mt-6 flex flex-col gap-3 lg:mt-8">
            <a
              href="#experience"
              className="w-[200px] rounded-md border border-foreground bg-foreground px-8 py-2.5 text-center font-medium text-background transition-colors hover:bg-foreground/90 lg:py-3"
            >
              View Experience
            </a>
            <a
              href="#contact"
              className="w-[200px] rounded-md border border-foreground bg-transparent px-8 py-2.5 text-center font-medium text-foreground transition-colors hover:bg-foreground/5 lg:py-3"
            >
              Contact Me
            </a>
            <a
              href={RESUME_URL}
              download={RESUME_FILENAME}
              className="w-[200px] rounded-md border border-foreground bg-transparent px-8 py-2.5 text-center font-medium text-foreground transition-colors hover:bg-foreground/5 lg:py-3"
            >
              Resume
            </a>
          </div>
        </motion.div>

        {/* Portrait visual */}
        <div className="pointer-events-none absolute bottom-0 right-0 z-10 flex h-[60vh] w-full items-end justify-center lg:h-[85vh] lg:w-[65%] lg:justify-end xl:w-[60%]">
          <div className="relative flex h-full w-full max-w-[500px] items-end justify-center lg:max-w-[750px] lg:justify-end xl:max-w-[850px]">
            <div className="absolute left-[5%] top-[20%] h-[250px] w-[250px] rounded-full bg-glow lg:left-[15%] lg:top-[15%] lg:h-[400px] lg:w-[400px]" />
            <div className="absolute right-0 top-[30%] h-[350px] w-[220px] bg-band lg:-right-[5%] lg:top-[25%] lg:h-[550px] lg:w-[350px]" />

            {/* Profile portrait */}
            <div className="relative z-10 flex h-full items-end">
              <div className="mb-6 flex flex-col items-center gap-4 rounded-t-[140px] rounded-b-3xl border-4 border-foreground bg-card px-10 pb-7 pt-12 shadow-brutal lg:mb-10">
                <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border-2 border-foreground lg:h-40 lg:w-40">
                  <img
                    src={`${import.meta.env.BASE_URL}images/namachu-dp-cropped.jpg`}
                    alt={personalData.name}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
