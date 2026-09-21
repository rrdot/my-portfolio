import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/types";
import { Badges } from "@/components/ui/badges";
import { ProjectVisual } from "./project-visual";
export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <article className="project-card">
      {project.image ? (
        <div className="project-image">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 760px) 100vw, 33vw"
          />
        </div>
      ) : (
        <ProjectVisual visual={project.visual} />
      )}
      <div className="project-content">
        <p className="project-type">
          <span>0{index + 1}</span>
          {project.type}
        </p>
        <h3>
          <Link href={`/projects/${project.slug}`}>{project.title}</Link>
        </h3>
        <p className="project-description">{project.description}</p>
        <div className="project-contribution">
          <p>MY CONTRIBUTION</p>
          <ul>
            {project.contribution.slice(0, 2).map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <Badges items={project.technologies} />
        <div className="project-bottom">
          <Link href={`/projects/${project.slug}`} className="text-link">
            Project details <ArrowUpRight size={17} />
          </Link>
          <span>Sample project</span>
        </div>
        {(project.github || project.demo) && (
          <div className="project-links">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                Repository ↗
              </a>
            )}
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noopener noreferrer">
                Live project ↗
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
