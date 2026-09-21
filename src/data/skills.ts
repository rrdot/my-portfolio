import type { SkillCategory } from "@/types";

// Example skills for the template. Keep only those that describe your own toolkit.
export const skillCategories: SkillCategory[] = [
  { title: "Languages", skills: ["HTML", "CSS", "JavaScript", "TypeScript"] },
  { title: "Frontend", skills: ["React", "Next.js", "Tailwind CSS"] },
  { title: "Backend", skills: ["Node.js", "REST APIs"] },
  { title: "Data", skills: ["SQL", "Data modeling"] },
  {
    title: "Tools & practices",
    skills: [
      "Git",
      "Figma",
      "Responsive design",
      "Accessibility",
      "Testing",
      "Documentation",
    ],
  },
];
