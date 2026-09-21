import { Braces, PanelsTopLeft, Server, Database, Wrench } from "lucide-react";
import { skillCategories } from "@/data/skills";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badges } from "@/components/ui/badges";
const icons = [Braces, PanelsTopLeft, Server, Database, Wrench];
export function Skills() {
  return (
    <section id="skills" className="section tinted">
      <div className="container">
        <SectionHeading
          number="04"
          eyebrow="MY TOOLKIT"
          title="The right tools. A solid foundation."
          description="An example toolkit for a developer portfolio. Customize these categories to match your own skills."
        />
        <div className="skills-grid">
          {skillCategories.map((category, index) => {
            const Icon = icons[index];
            return (
              <article
                className={`skill-card ${index === 4 ? "wide" : ""}`}
                key={category.title}
              >
                <div className="skill-title">
                  <span>
                    <Icon size={21} />
                  </span>
                  <h3>{category.title}</h3>
                  <small>0{index + 1}</small>
                </div>
                <Badges items={category.skills} />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
