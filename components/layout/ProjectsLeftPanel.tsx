
import React from 'react';
import { PROJECTS } from '../../constants/projects.ts';
import { useHorizontalDragScroll } from '../../hooks/useHorizontalDragScroll.ts';

interface ProjectsLeftPanelProps {
  isDarkMode: boolean;
  selectedProject: string;
  setSelectedProject: (project: string) => void;
}

/**
 * Displays a selectable list of projects in a horizontal ticker.
 */
export const ProjectsLeftPanel: React.FC<ProjectsLeftPanelProps> = ({ isDarkMode, selectedProject, setSelectedProject }) => {
  const { scrollerRef, eventHandlers } = useHorizontalDragScroll();
  const grayTextClasses = `transition-colors duration-300 ease-in-out ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`;
  
  // Duplicate for infinite loop
  const duplicatedProjects = [...PROJECTS, ...PROJECTS, ...PROJECTS];

  return (
    <div className={`w-full flex flex-col pb-4 ${isDarkMode ? 'border-b-[#efeeee]' : 'border-b-black'}`}>
      <div className={`flex justify-between text-[10px] py-2 ${grayTextClasses}`}>
        <span>02 WORK</span>
        <span>/02</span>
      </div>
      
      <div
        ref={scrollerRef}
        className="overflow-x-auto no-scrollbar cursor-none select-none py-4"
        role="region"
        aria-label="Project selection carousel"
        {...eventHandlers}
      >
        <div className="flex w-max items-center gap-12 px-4" role="list">
          {duplicatedProjects.map((project, index) => {
            const isActive = project === selectedProject;
            // Use index as part of key because of duplication
            return (
              <button
                key={`${project}-${index}`}
                onClick={() => setSelectedProject(project)}
                className={`transition-all duration-300 ease-in-out whitespace-nowrap
                  ${isActive
                    ? 'text-4xl md:text-6xl font-black tracking-tighter text-[#FF4500] no-cursor-invert scale-105'
                    : 'text-3xl md:text-5xl font-light tracking-tight opacity-50 hover:opacity-100 hover:scale-105'
                  }`
                }
                aria-pressed={isActive}
              >
                {project}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
