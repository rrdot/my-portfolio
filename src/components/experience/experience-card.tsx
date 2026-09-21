import { ArrowUpRight } from "lucide-react";
import type { Experience } from "@/types";
import { dateLabel } from "@/lib/utils";
import { Badges } from "@/components/ui/badges";
export function ExperienceCard({
  experience,
  index,
}: {
  experience: Experience;
  index: number;
}) {
  return (
    <article className="experience-card">
      <div className="experience-date">
        <span className="timeline-dot" />
        <span>
          {dateLabel(experience.start)} —{" "}
          {experience.end ? dateLabel(experience.end) : "Present"}
        </span>
        {!experience.end && <span className="current-badge">Current role</span>}
        <span className="experience-index" aria-hidden="true">
          0{index + 1}
        </span>
      </div>
      <div className="experience-content">
        <div className="experience-title">
          <div>
            <h3>{experience.role}</h3>
            <p>{experience.company}</p>
          </div>
          <ArrowUpRight size={20} />
        </div>
        <p className="experience-summary">{experience.summary}</p>
        <ul>
          {experience.responsibilities.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <Badges items={experience.technologies} />
      </div>
    </article>
  );
}
