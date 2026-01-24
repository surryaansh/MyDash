import React from 'react';
import { PROJECTS } from '../../constants/projects.ts';
import { useHorizontalDragScroll } from '../../hooks/useHorizontalDragScroll.ts';

interface ProjectsLeftPanelProps {
  isDarkMode: boolean;
  selectedProject: string;
  setSelectedProject: (project: string) => void;
}

/**
 * Displays a selectable list of projects.
 * On Desktop: Vertical list.
 * On Mobile: Horizontal infinite drag-scrollable loop.
 */
export const ProjectsLeftPanel: React.FC<ProjectsLeftPanelProps> = ({ isDarkMode, selectedProject, setSelectedProject }) => {
  const grayTextClasses = `transition-colors duration-300 ease-in-out ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`;
  
  // Hook for mobile drag scroll
  const { scrollerRef, eventHandlers } = useHorizontalDragScroll({ autoScrollSpeed: 0.5 });
  
  // Duplicate projects for infinite loop on mobile
  const duplicatedProjects = [...PROJECTS, ...PROJECTS, ...PROJECTS]; // Tripled to ensure smooth fill

  return (
    <div className={`w-full lg:col-span-1 flex flex-col lg:pr-6 pb-2 lg:pb-0 lg:border-r ${isDarkMode ? 'lg:border-[#efeeee]' : 'lg:border-black'}`}>
      <div className={`flex justify-between text-[10px] py-2 ${grayTextClasses}`}>
        <span>02 PROJECT</span>
        <span>/02</span>
      </div>
      
      {/* Desktop Vertical List */}
      <div className="hidden lg:flex flex-1 flex-col pt-3">
        <nav aria-label="Project selection">
          <ul role="list">
            {PROJECTS.map((project) => {
              const isActive = project === selectedProject;

              return (
                <li key={project} className={isActive ? 'mb-4' : 'mb-5'}>
                  <button
                    onClick={() => setSelectedProject(project)}
                    className={`w-full text-left transition-all duration-200 ease-in-out leading-tight
                      ${isActive
                        ? 'text-6xl font-black tracking-tighter text-[#FF4500] no-cursor-invert'
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

      {/* Mobile Horizontal Marquee */}
      <div 
        ref={scrollerRef}
        className="flex lg:hidden overflow-x-auto no-scrollbar pt-2 pb-6 cursor-none select-none"
        {...eventHandlers}
      >
        <div className="flex w-max items-center gap-6 pr-6">
          {duplicatedProjects.map((project, index) => {
            const isActive = project === selectedProject;
            // Note: We use index in key here because items are duplicated
            return (
               <button
                  key={`${project}-${index}`}
                  onClick={() => setSelectedProject(project)}
                  className={`whitespace-nowrap transition-all duration-200 ease-in-out
                    ${isActive
                      ? 'text-4xl font-black tracking-tighter text-[#FF4500]'
                      : 'text-2xl font-normal tracking-tight'
                    }`
                  }
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