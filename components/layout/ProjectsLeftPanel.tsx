import React, { useState } from 'react';

interface ProjectsLeftPanelProps {
  isDarkMode: boolean;
}

const projects = [
  "GARDEN",
  "CATALOG",
  "EXPLORER",
  "FAUCET",
  "GARDEN DASHBOARD",
  "POSSIBLE WORKS",
  "MERRY"
];

export const ProjectsLeftPanel: React.FC<ProjectsLeftPanelProps> = ({ isDarkMode }) => {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const grayTextClasses = `transition-colors duration-300 ease-in-out ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`;

  return (
    <div className="w-full lg:w-1/2 flex flex-col lg:pr-6 py-8">
      <div className={`flex justify-between text-[10px] py-2 ${grayTextClasses}`}>
        <span>02 WORK</span>
        <span>/02</span>
      </div>
      <div className="flex-1 flex flex-col justify-center pt-8 pb-12">
        <nav>
          <ul onMouseLeave={() => setHoveredProject(null)}>
            {projects.map((project) => {
              // An item is "active" if it's GARDEN and nothing is hovered, OR if it's being hovered directly.
              const isActive = (project === 'GARDEN' && !hoveredProject) || project === hoveredProject;

              return (
                <li key={project}>
                  <button
                    onMouseEnter={() => setHoveredProject(project)}
                    className={`w-full text-left transition-all duration-200 ease-in-out leading-none md:leading-tight
                      ${isActive
                        ? 'text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter text-[#FF4500]'
                        : 'text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight'
                      }`
                    }
                  >
                    {project}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
};