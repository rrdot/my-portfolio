import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Info } from "lucide-react";
import { projects } from "@/data/projects";
import { Badges } from "@/components/ui/badges";
import { ProjectVisual } from "@/components/projects/project-visual";
export const dynamicParams = false;
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((project) => project.slug === slug);
  return project
    ? {
        title: project.title,
        description: project.description,
        alternates: { canonical: `/projects/${slug}` },
        openGraph: {
          title: project.title,
          description: project.description,
          url: `/projects/${slug}`,
        },
      }
    : {};
}
export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((project) => project.slug === slug);
  if (!project) notFound();
  const sections = [
    { title: "What I worked on", items: project.contribution },
    { title: "Technical approach", items: project.approach },
    { title: "Responsibilities", items: project.responsibilities },
    { title: "Challenges", items: project.challenges },
    { title: "Key learnings", items: project.learnings },
  ];
  return (
    <main id="main" className="container project-detail">
      <Link href="/#projects" className="text-link">
        <ArrowLeft size={16} /> Back to selected work
      </Link>
      <p className="eyebrow">{project.type}</p>
      <h1>{project.title}</h1>
      <p className="detail-lead">{project.description}</p>
      <Badges items={project.technologies} />
      <ProjectVisual visual={project.visual} />
      <div className="detail-columns">
        <div>
          <section>
            <h2>Overview</h2>
            <p>{project.description}</p>
          </section>
          {project.context && (
            <section>
              <h2>Context</h2>
              <p>{project.context}</p>
            </section>
          )}
          {sections
            .filter((section) => section.items?.length)
            .map((section) => (
              <section key={section.title}>
                <h2>{section.title}</h2>
                <ul>
                  {section.items?.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
            ))}
          {Boolean(project.screenshots?.length) && (
            <section>
              <h2>Screenshots</h2>
              {project.screenshots?.map((screenshot) => (
                <Image
                  key={screenshot.src}
                  src={screenshot.src}
                  alt={screenshot.alt}
                  width={1200}
                  height={800}
                  sizes="(max-width: 760px) 100vw, 700px"
                  className="detail-screenshot"
                />
              ))}
            </section>
          )}
        </div>
        <aside>
          <p className="eyebrow">TECHNOLOGIES</p>
          <Badges items={project.technologies} />
          <p className="privacy-note">
            <Info size={18} /> Sample project. Replace this placeholder with
            your own work and add real project links when available.
          </p>
          {project.github && (
            <a
              className="text-link"
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              Repository <ArrowUpRight size={15} />
            </a>
          )}
          {project.demo && (
            <a
              className="text-link"
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
            >
              Live project <ArrowUpRight size={15} />
            </a>
          )}
        </aside>
      </div>
      <div className="detail-contact">
        <h2>Let’s build something dependable.</h2>
        <Link className="button primary" href="/#contact">
          Get in touch <ArrowUpRight size={17} />
        </Link>
      </div>
    </main>
  );
}
