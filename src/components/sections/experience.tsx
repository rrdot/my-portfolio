import { SectionHeading } from "@/components/ui/section-heading";
import { ExperienceCard } from "@/components/experience/experience-card";
import { experiences } from "@/data/experience";
export function ExperienceSection() {
  return (
    <section id="experience" className="section tinted">
      <div className="container">
        <SectionHeading
          number="02"
          eyebrow="THE JOURNEY SO FAR"
          title="Your journey, in a few chapters."
          description="Placeholder roles for your work, freelance projects, or internships. Replace these entries with your own experience."
        />
        <div className="experience-list">
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={experience.company}
              experience={experience}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
