import React, { forwardRef } from 'react';
import { PROJECTS_DATA } from '../../constants/projects.ts';

interface ProjectsRightPanelProps {
  isDarkMode: boolean;
  selectedProject: string;
  isHoveringLink: boolean;
  relativeCursorPosition: { x: number; y: number };
  isScrolling: boolean;
  setIsHovering: (isHovering: boolean) => void;
}

export const ProjectsRightPanel = forwardRef<HTMLDivElement, ProjectsRightPanelProps>(
  ({ isDarkMode, selectedProject, isHoveringLink, relativeCursorPosition, isScrolling, setIsHovering }, ref) => {
    const grayTextClasses = `transition-colors duration-300 ease-in-out ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`;

    const project = PROJECTS_DATA.find(p => p.name === selectedProject);

    if (!project) {
      return (
        <div className="w-full lg:col-span-2 flex flex-col lg:pl-6 pt-8 lg:pt-0">
          <div className={`flex justify-between text-[10px] py-2 ${grayTextClasses}`}>
            <span>03 PROJECT</span>
            <span>/03</span>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <p>Project not found.</p>
          </div>
        </div>
      );
    }

    const imageBaseClasses = `absolute object-cover border ${isDarkMode ? 'border-neutral-800' : 'border-black'} transition-transform duration-300 hover:scale-[1.02]`;

    return (
      <div className="w-full lg:col-span-2 flex flex-col lg:pl-6 pt-8 lg:pt-0">
        <div className={`flex justify-between text-[10px] py-2 ${grayTextClasses}`}>
          <span>03 WORK</span>
          <span>/03</span>
        </div>
        
        {/* Container for the step-by-step image layout */}
        <div 
          ref={ref}
          key={project.name} 
          className="flex-1 relative w-full h-full animate-fade-in"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* This is the solid cursor, only visible when inside this container to prevent color inversion */}
          <div
            className="hidden lg:block"
            style={{
              position: 'absolute',
              top: relativeCursorPosition.y,
              left: relativeCursorPosition.x,
              width: `${isHoveringLink ? 60 : 40}px`,
              height: `${isHoveringLink ? 60 : 40}px`,
              backgroundColor: isDarkMode ? 'white' : 'black',
              borderRadius: '50%',
              pointerEvents: 'none',
              transform: 'translate(-50%, -50%)',
              zIndex: 10000,
              transition: 'width 0.2s ease, height 0.2s ease, opacity 0.2s ease-out',
              opacity: isScrolling ? 0 : 1,
            }}
            aria-hidden="true"
          />
          
          {/* Image 1 (barkchain-1.png) */}
          <img
            src={project.images[0]}
            alt={`${project.name} screenshot 1`}
            className={`${imageBaseClasses} w-[45%] h-auto max-h-[45%] bottom-4 left-[13%]`}
            style={{ zIndex: 10 }}
            aria-hidden="true"
          />

          {/* Image 2 (barkchain-2.png) */}
          <img
            src={project.images[1]}
            alt={`${project.name} screenshot 2`}
            className={`${imageBaseClasses} w-[25%] h-auto top-[8%] right-[44%]`}
            style={{ zIndex: 20 }}
            aria-hidden="true"
          />

          {/* Image 3 (barkchain-3.png) */}
          <img
            src={project.images[2]}
            alt={`${project.name} screenshot 3`}
            className={`${imageBaseClasses} w-[22.5%] h-auto bottom-[18%] right-[24%]`}
            style={{ zIndex: 30 }}
            aria-hidden="true"
          />

          {/* Image 4 (barkchain-4.png) */}
          <img
            src={project.images[3]}
            alt={`${project.name} screenshot 4`}
            className={`${imageBaseClasses} h-[92%] w-auto bottom-4 right-4`}
            style={{ zIndex: 25 }}
            aria-hidden="true"
          />

        </div>
      </div>
    );
  }
);
