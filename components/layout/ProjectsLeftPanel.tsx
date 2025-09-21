import React from 'react';
import { PROJECTS } from '../../constants/projects.ts';

interface ProjectsLeftPanelProps {
  isDarkMode: boolean;
  selectedProject: string;
  setSelectedProject: (project: string) => void;
}

/**
 * Displays a selectable list of projects.
 */
export const ProjectsLeftPanel: React.FC<ProjectsLeftPanelProps> = ({ isDarkMode, selectedProject, setSelectedProject }) => {
  const grayTextClasses = `transition-colors duration-300 ease-in-out ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`;

  return (
    <div className={`w-full lg:col-span-1 flex flex-col lg:pr-6 pb-8 lg:pb-0 lg:border-r ${isDarkMode ? 'lg:border-[#efeeee]' : 'lg:border-black'}`}>
      <div className={`flex justify-between text-[10px] py-2 ${grayTextClasses}`}>
        <span>02 PROJECT</span>
        <span>/02</span>
      </div>
      <div className="flex-1 flex flex-col pt-3">
        <nav aria-label="Project selection">
          <ul role="list">
            {PROJECTS.map((project) => {
              const isActive = project === selectedProject;

              return (
                <li key={project} className={isActive ? 'mb-4' : 'mb-5'}>
                  <button
                    onClick={() => setSelectedProject(project)}
                    className={`w-full text-left transition-all duration-200 ease-in-out leading-none md:leading-tight
                      ${isActive
                        ? 'text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter text-[#FF4500] no-cursor-invert'
                        : 'text-2xl font-normal tracking-tight'
                      }`
                    }
                    aria-pressed={isActive}
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