import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { personal } from "@/data/personal";
export function About() {
  return (
    <section id="about" className="section container">
      <div className="about-layout">
        <SectionHeading
          number="01"
          eyebrow="A LITTLE ABOUT ME"
          title="A little curiosity. A lot of possibility."
        />
        <div className="about-copy">
          {personal.about.map((text) => (
            <p key={text}>{text}</p>
          ))}
          <a className="text-link" href="#experience">
            Explore my journey <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
      <div className="stats">
        {personal.highlights.map((item) => (
          <div key={item.value}>
            <strong className="text-stat">
              {item.value}
              <span>↗</span>
            </strong>
            <p>{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
