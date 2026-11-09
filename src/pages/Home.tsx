import Hero from "@/sections/Hero";
import Marquee from "@/sections/Marquee";
import About from "@/sections/About";
import Experience from "@/sections/Experience";
import Projects from "@/sections/Projects";
import Skills from "@/sections/Skills";
import Certificates from "@/sections/Certificates";
import Publications from "@/sections/Publications";
import Writing from "@/sections/Writing";
import Awards from "@/sections/Awards";
import Contact from "@/sections/Contact";

/** The single-page portfolio: hero → sections → contact. */
export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Certificates />
      <Publications />
      <Writing />
      <Awards />
      <Contact />
    </>
  );
}
