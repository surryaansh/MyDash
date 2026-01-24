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
 * On Mobile: Horizontal infinite drag-scrollable loop (no auto-scroll).
 */
export const ProjectsLeftPanel: React.FC<ProjectsLeftPanelProps> = ({ isDarkMode, selectedProject, setSelectedProject }) => {
  const grayTextClasses = `transition-colors duration-300 ease-in-out ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`;
  
  // Hook for mobile drag scroll - Speed 0 disables auto-scrolling
  const { scrollerRef, eventHandlers, setScrollPosition } = useHorizontalDragScroll({ autoScrollSpeed: 0 });
  
  // Duplicate projects for infinite loop on mobile (4 sets to ensure half-split logic works perfectly)
  const duplicatedProjects = [...PROJECTS, ...PROJECTS, ...PROJECTS, ...PROJECTS]; 

  const handleProjectClick = (e: React.MouseEvent<HTMLButtonElement>, project: string) => {
    setSelectedProject(project);
    
    // Mobile only: Scroll selected to start
    if (window.innerWidth < 1024 && scrollerRef.current) { 
        const button = e.currentTarget;
        const container = scrollerRef.current;
        
        // Calculate the button's position relative to the container's visible area
        const rect = button.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        const relativeLeft = rect.left - containerRect.left;
        
        // Add current scroll position to get the absolute scroll target
        // This puts the clicked button exactly at the left edge (0 index visual position)
        const targetScrollLeft = container.scrollLeft + relativeLeft;
        
        setScrollPosition(targetScrollLeft); 
    }
  };

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

      {/* Mobile Horizontal Marquee with Fade Mask */}
      <div 
        className="relative flex lg:hidden overflow-hidden"
        style={{
          maskImage: 'linear-gradient(to right, black 85%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, black 85%, transparent 100%)'
        }}
      >
        <div 
          ref={scrollerRef}
          className="flex overflow-x-auto no-scrollbar pt-2 pb-2 cursor-none select-none w-full"
          {...eventHandlers}
        >
          <div className="flex w-max items-center gap-6 pr-12">
            {duplicatedProjects.map((project, index) => {
              const isActive = project === selectedProject;
              return (
                 <button
                    key={`${project}-${index}`}
                    onClick={(e) => handleProjectClick(e, project)}
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
    </div>
  );
};