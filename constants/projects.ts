// constants/projects.ts

/**
 * Defines the data for each project.
 */
export const PROJECTS_DATA = [
  {
    name: "BARKCHAIN",
    description: "Garden is a next-gen Bitcoin bridge designed for speed, scale, and trustlessness — built on intents with zero-custody atomic swaps under the hood.",
    keywords: ["TRUSTLESS INFRASTRUCTURE", "UX DESIGN", "SMART CONTRACTS"],
    images: [
      '/barkchain-1.png',
      '/barkchain-2.png',
      '/barkchain-3.png',
      '/barkchain-4.png',
    ],
    link: "#" // Placeholder
  },
  {
    name: "MYDASH",
    description: "MyDash is a comprehensive dashboard application for managing personal projects and productivity, featuring a clean UI and powerful integrations.",
    keywords: ["PRODUCTIVITY", "FRONTEND DEV", "DATA VISUALIZATION"],
    images: [
      '/mydash-1.png',
      '/mydash-2.png',
      '/mydash-3.png',
      '/mydash-4.png',
    ],
    link: "#" // Placeholder
  },
  {
    name: "SURU GPT",
    description: "Suru GPT leverages the latest in large language models to provide a conversational AI assistant tailored for software development workflows.",
    keywords: ["ARTIFICIAL INTELLIGENCE", "DEVELOPER TOOLS", "LLM"],
    images: [
      '/surugpt-1.png',
      '/surugpt-2.png',
      '/surugpt-3.png',
      '/surugpt-4.png',
    ],
    link: "#" // Placeholder
  },
];

/**
 * Defines the list of project names to be displayed in the projects section.
 */
export const PROJECTS = PROJECTS_DATA.map(p => p.name);