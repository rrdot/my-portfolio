import type { Project } from "@/types";

// Fictional examples to demonstrate the layout; these are not completed work.
export const projects: Project[] = [
  {
    slug: "sample-online-store",
    title: "Online Store",
    type: "Sample e-commerce project",
    description:
      "A placeholder for an online store project. Describe the product, its audience, and the experience you designed.",
    contribution: [
      "Describe your role in the project",
      "Explain a feature or design decision",
    ],
    technologies: ["React", "TypeScript", "CSS"],
    github: null,
    demo: null,
    featured: true,
    visual: "shop",
    context:
      "This is a fictional project example. Replace it with the background, purpose, and scope of a real project.",
    approach: [
      "Describe how you organized the interface and components.",
      "Explain your technology choices and how you used them.",
    ],
    challenges: ["Add a challenge you encountered and how you approached it."],
    learnings: ["Share what you learned and what you would explore next."],
  },
  {
    slug: "sample-task-dashboard",
    title: "Task Dashboard",
    type: "Sample web application",
    description:
      "A placeholder for a dashboard or productivity app. Use this space to explain the problem the project addresses.",
    contribution: [
      "Describe the screens or features you built",
      "Explain how you organized the application",
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    github: null,
    demo: null,
    featured: true,
    visual: "system",
    context:
      "This fictional example shows how to present an application case study. Replace all content with your own project details.",
    approach: [
      "Outline the main components and data flow.",
      "Describe how you considered usability and responsive behavior.",
    ],
    challenges: [
      "Describe a real tradeoff or technical challenge from your project.",
    ],
    learnings: ["Summarize a lesson you can apply to future work."],
  },
  {
    slug: "sample-creative-website",
    title: "Creative Website",
    type: "Sample website project",
    description:
      "A placeholder for a landing page or brand website. Highlight the visual direction and the experience you wanted to create.",
    contribution: [
      "Describe your design or development work",
      "Explain how you adapted the layout for different screens",
    ],
    technologies: ["HTML", "CSS", "JavaScript"],
    github: null,
    demo: null,
    featured: true,
    visual: "website",
    context:
      "This is sample content for a website case study, not a claim of client work. Add your own brief and goals here.",
    approach: [
      "Describe the page structure and visual system.",
      "Explain how you approached accessibility and performance.",
    ],
    challenges: ["Add a design or implementation challenge."],
    learnings: ["Share what you would improve in a future iteration."],
  },
];
