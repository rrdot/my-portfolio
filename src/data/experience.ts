import type { Experience } from "@/types";

// Example entries: replace these with your own roles, dates, and responsibilities.
export const experiences: Experience[] = [
  {
    company: "Your Company",
    role: "Your Current Role",
    start: "Start date",
    end: null,
    summary: "A short description of your role and the work you focus on.",
    responsibilities: [
      "Describe a responsibility or project you contributed to.",
      "Explain how you collaborated, solved a problem, or supported the team.",
      "Add a specific outcome from your work when you have one to share.",
    ],
    technologies: ["Tool one", "Tool two", "Tool three"],
  },
  {
    company: "Previous Company",
    role: "Your Previous Role",
    start: "Start date",
    end: "End date",
    summary: "Summarize another chapter of your professional journey.",
    responsibilities: [
      "Outline the kind of work you did in this role.",
      "Describe a useful skill you developed or a challenge you worked through.",
      "Share a contribution that helps visitors understand your experience.",
    ],
    technologies: ["Tool one", "Tool two"],
  },
];
