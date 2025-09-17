import React from 'react';

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
  const grayTextClasses = `transition-colors duration-300 ease-in-out ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`;

  return (
    <div className="w-full lg:w-1/2 flex flex-col lg:pr-6 py-8">
      <div className={`flex justify-between text-[10px] py-2 ${grayTextClasses}`}>
        <span>02 WORK</span>
        <span>/02</span>
      </div>
      <div className="flex-1 flex flex-col justify-center pt-8 pb-12">
        <nav>
          <ul>
            {projects.map((project) => (
              <li key={project} className="my-1 md:my-2">
                {project === 'GARDEN' ? (
                  <button className="w-full text-left text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tighter text-[#FF4500]">
                    {project}
                  </button>
                ) : (
                  <button className="w-full text-left text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight transition-all duration-300 ease-in-out hover:font-extrabold hover:text-[#FF4500] hover:scale-105 hover:translate-x-4 origin-left">
                    {project}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};
