import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { ExperienceSection } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { EngineeringFocus } from "@/components/sections/engineering-focus";
import { Learning } from "@/components/sections/learning";
import { Contact } from "@/components/sections/contact";
export const metadata: Metadata = { alternates: { canonical: "/" } };
export const revalidate = 86400;
export default function Home() {
  return (
    <main id="main">
      <div id="top" />
      <Hero />
      <About />
      <ExperienceSection />
      <Projects />
      <Skills />
      <EngineeringFocus />
      <Learning />
      <Contact />
    </main>
  );
}
