// constants/projects.ts

/**
 * Defines the data for each project, including specific layout classes for the images.
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
    layout: {
      img1: "w-[45%] h-auto max-h-[45%] bottom-4 left-[13%] z-[10]",
      img2: "w-[25%] h-auto top-[8%] right-[44%] z-[20]",
      img3: "w-[22.5%] h-auto bottom-[18%] right-[22%] z-[30]",
      img4: "h-[92%] w-auto bottom-4 right-0 z-[25]"
    },
    link: "#"
  },
  {
    name: "MYDASH",
    description: "MyDash is a comprehensive dashboard application for managing personal projects and productivity, featuring a clean UI and powerful integrations.",
    keywords: ["PRODUCTIVITY", "FRONTEND DEV", "DATA VISUALIZATION"],
    images: [
      '/mydash-2.png',
      '/mydash-4.png',
    ],
    layout: {
      img1: "w-[24.75%] h-auto bottom-[10.875%] right-[20%] z-[30]",
      img2: "", 
      img3: "", 
      img4: "h-[92%] w-auto bottom-4 right-0 z-[25]"
    },
    link: "#"
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
    layout: {
      img1: "w-[45%] h-auto max-h-[45%] bottom-4 left-[13%] z-[10]",
      img2: "w-[25%] h-auto top-[8%] right-[44%] z-[20]",
      img3: "w-[22.5%] h-auto bottom-[12%] right-[28%] z-[30]",
      img4: "h-[92%] w-auto bottom-4 right-0 z-[25]"
    },
    link: "#"
  },
];

/**
 * Defines the list of project names to be displayed in the projects section.
 */
export const PROJECTS = PROJECTS_DATA.map(p => p.name);
