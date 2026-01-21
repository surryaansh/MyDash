// constants/projects.ts

/**
 * Defines the data for each project, including specific layout classes for the images.
 */
export const PROJECTS_DATA = [
  {
    name: "BARKCHAIN",
    description: "BarkChain is a MERN + Web3 application integrating Ethereum smart contracts to enable stray-dog adoptions. It implements ERC-20 token and ERC-721 NFT-based adoption certificates via MetaMask. It supports dog listings, adoption workflows, and SOS reporting.",
    keywords: ["TRUSTLESS INFRASTRUCTURE", "UX DESIGN", "SMART CONTRACTS"],
    images: [
      '/barkchain-1.png',
      '/barkchain-2.png',
      '/barkchain-3.png',
      '/barkchain-4.png',
    ],
    layout: {
      img1: "w-[45%] h-auto max-h-[45%] bottom-4 left-[13%] z-[10]",
      img2: "w-[25%] h-auto top-[5%] right-[44%] z-[20]",
      img3: "w-[22.5%] h-auto bottom-[18%] right-[17%] z-[30]",
      img4: "h-[92%] w-auto bottom-4 right-0 z-[25]"
    },
    link: "#",
    githubLink: "https://github.com"
  },
  {
    name: "MYDASH",
    description: "This is my modern, responsive, and optimized Next.js portfolio built with TypeScript and Tailwind CSS. It leverages reusable component abstractions and serverless API routes for dynamic content updates. Deployed on Vercel with a focus on maintainability, performance, and clean design.",
    keywords: ["PRODUCTIVITY", "FRONTEND DEV", "DATA VISUALIZATION"],
    images: [
      '/mydash-2.png',
      '/mydash-4.png',
    ],
    layout: {
      img1: "w-[24.75%] h-auto bottom-[10.875%] right-[24%] z-[30]",
      img2: "", 
      img3: "", 
      img4: "h-[92%] w-auto bottom-4 right-0 z-[25]"
    },
    link: "#",
    githubLink: "https://github.com"
  },
  {
    name: "SURU GPT",
    description: "SuruGPT is a context-aware LLM system with RAG-based memory pipeline. Implementing persistent conversational memory using embeddings and semantic retrieval. It features automated summarization, vector storage, and relevance-based context injection at inference time.",
    keywords: ["ARTIFICIAL INTELLIGENCE", "DEVELOPER TOOLS", "LLM"],
    images: [
      '/surugpt-1.png',
      '/surugpt-2.png',
      '/surugpt-3.png',
      '/surugpt-4.png',
    ],
    layout: {
      img1: "w-[45%] h-auto max-h-[45%] bottom-4 left-[13%] z-[10]",
      img2: "w-[25%] h-auto top-[5%] right-[44%] z-[20]",
      img3: "w-[22.5%] h-auto bottom-[12%] right-[23%] z-[30]",
      img4: "h-[92%] w-auto bottom-4 right-0 z-[25]"
    },
    link: "#",
    githubLink: "https://github.com"
  },
];

/**
 * Defines the list of project names to be displayed in the projects section.
 */
export const PROJECTS = PROJECTS_DATA.map(p => p.name);