import React, { useEffect } from 'react';
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
  const { scrollerRef, eventHandlers, animateScrollTo } = useHorizontalDragScroll({ autoScrollSpeed: 0 });
  
  // Duplicate projects for infinite loop on mobile (4 sets to ensure half-split logic works perfectly)
  const duplicatedProjects = [...PROJECTS, ...PROJECTS, ...PROJECTS, ...PROJECTS]; 

  // Handle project selection click
  const handleProjectClick = (project: string) => {
    setSelectedProject(project);
  };

  // Effect to handle scrolling when the selected project changes.
  // This ensures we calculate the scroll target AFTER the DOM has updated (e.g. font size expansion),
  // preventing the "hide half title" glitch caused by measuring old layout dimensions.
  useEffect(() => {
    if (window.innerWidth < 1024 && scrollerRef.current) {
        const projectIndex = PROJECTS.indexOf(selectedProject);
        
        // Find the button elements within the scrolling container
        const flexContainer = scrollerRef.current.children[0] as HTMLElement;
        if (!flexContainer) return;
        
        const buttons = flexContainer.children;
        
        if (projectIndex >= 0 && buttons.length > projectIndex) {
            // Get the target element from the FIRST set (the canonical positions)
            const targetElement = buttons[projectIndex] as HTMLElement;
            const targetLeft = targetElement.offsetLeft;

            // Calculate the width of one full set of items to handle infinite loop snapping
            const setMarkerElement = buttons[PROJECTS.length] as HTMLElement;
            const oneSetWidth = setMarkerElement ? setMarkerElement.offsetLeft : 0;

            animateScrollTo(targetLeft, oneSetWidth);
        }
    }
  }, [selectedProject, animateScrollTo]);

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
                    onClick={() => handleProjectClick(project)}
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
          {/* Padding Right (pr-6) matches Gap (gap-6) to ensure the infinite loop seam is invisible */}
          <div className="flex w-max items-center gap-6 pr-6">
            {duplicatedProjects.map((project, index) => {
              const isActive = project === selectedProject;
              return (
                 <button
                    key={`${project}-${index}`}
                    onClick={() => handleProjectClick(project)}
                    data-index={index}
                    // Note: Changed transition-all to transition-colors to prevent layout sizing transitions 
                    // from interfering with scroll offset calculations. This ensures accurate centering.
                    className={`whitespace-nowrap transition-colors duration-200 ease-in-out
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