import { Info } from "lucide-react";
import { projects } from "@/data/projects";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectGrid } from "@/components/projects/project-grid";
export function Projects() {
  return (
    <section id="projects" className="section container">
      <SectionHeading
        number="03"
        eyebrow="SELECTED WORK"
        title="A few things you could create."
        description="Example project cards for your future work. Replace these with projects that tell your story."
      />
      <ProjectGrid projects={projects.filter((project) => project.featured)} />
      <p className="project-disclaimer">
        <Info size={14} /> These are fictional examples. Add your own projects,
        images, and links.
      </p>
    </section>
  );
}
