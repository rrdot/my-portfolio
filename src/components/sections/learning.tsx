import { ArrowUpRight, BookOpen, GraduationCap } from "lucide-react";
import { learningItems } from "@/data/learning";
import { personal } from "@/data/personal";
import { SectionHeading } from "@/components/ui/section-heading";
export function Learning() {
  return (
    <section id="learning" className="section container learning-section">
      <div className="learning-intro">
        <SectionHeading
          number="05"
          eyebrow="ALWAYS A WORK IN PROGRESS"
          title="Learning what comes next."
          description="Expanding my understanding of how software is built, delivered, and operated."
        />
        <span className="learning-label">
          <BookOpen size={14} /> Active learning · Personal development
        </span>
        <p className="learning-note">
          Example learning topics. Replace these with subjects you’re curious
          about.
        </p>
      </div>
      <div className="learning-grid">
        {learningItems.map((item) => (
          <article key={item.title}>
            <h3>
              {item.title}
              <ArrowUpRight size={16} />
            </h3>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
      <div className="education">
        <GraduationCap size={25} />
        <div>
          <p className="eyebrow">EDUCATION</p>
          <h3>{personal.education.degree}</h3>
          <p>{personal.education.school}</p>
        </div>
        <span>{personal.education.years}</span>
      </div>
    </section>
  );
}
