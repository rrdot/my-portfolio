export interface Experience {
  company: string;
  role: string;
  start: string;
  end: string | null;
  summary: string;
  responsibilities: string[];
  technologies: string[];
}
export interface Project {
  slug: string;
  title: string;
  type: string;
  description: string;
  contribution: string[];
  technologies: string[];
  image?: string;
  github?: string | null;
  demo?: string | null;
  featured: boolean;
  context?: string;
  approach?: string[];
  responsibilities?: string[];
  challenges?: string[];
  learnings?: string[];
  screenshots?: { src: string; alt: string }[];
  visual: "shop" | "system" | "website";
}
export interface SkillCategory {
  title: string;
  skills: string[];
}
export interface SocialLink {
  label: string;
  href: string;
  icon: "github" | "linkedin" | "email";
}
export interface LearningItem {
  title: string;
  description: string;
}
