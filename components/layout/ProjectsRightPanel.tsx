
import React from 'react';
import { PROJECTS_DATA } from '../../constants/projects.ts';

interface ProjectsRightPanelProps {
  isDarkMode: boolean;
  selectedProject: string;
}

export const ProjectsRightPanel: React.FC<ProjectsRightPanelProps> = ({ isDarkMode, selectedProject }) => {
  const grayTextClasses = `transition-colors duration-300 ease-in-out ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`;
  
  /**
   * Handles staggered entrance animations.
   */
  const getEntranceClasses = (isSelected: boolean, index: number) => {
    const staggeredDelays = ['delay-[0ms]', 'delay-[100ms]', 'delay-[200ms]', 'delay-[300ms]'];
    
    if (isSelected) {
      return `opacity-100 translate-y-0 duration-700 ease-out ${staggeredDelays[index]}`;
    } else {
      return `opacity-0 translate-y-10 duration-300 ease-in delay-[0ms]`;
    }
  };

  /**
   * High-performance interaction classes.
   */
  const imageInteractionClasses = `transition-transform duration-500 ease-out hover:scale-[1.02] border-[0.5px] border-black object-cover pointer-events-auto`;

  return (
    <div className="w-full lg:col-span-2 flex flex-col lg:pl-6 pt-8 lg:pt-0 min-w-0 isolation-isolate">
      <div className={`flex justify-between text-[10px] py-2 ${grayTextClasses}`}>
        <span>03 WORK</span>
        <span>/03</span>
      </div>
      
      {/* 
          The Coordinate Stage:
          This container uses aspect-ratio to ensure that 100% width/height 
          always represents the same relative space for the absolute children.
      */}
      <div className="flex-1 flex items-center justify-center overflow-hidden">
        <div className="relative w-full aspect-[4/3] lg:aspect-auto lg:h-full max-h-[75vh]">
          {PROJECTS_DATA.map((project) => {
            const isSelected = project.name === selectedProject;
            const { layout } = project;

            return (
              <div 
                key={project.name} 
                className={`absolute inset-0 w-full h-full transition-opacity duration-300 ${isSelected ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}
              >
                {/* Highlight Image (Image 4) - The Background Layer */}
                {layout.img4 && project.images.length > 0 && (
                  <div className={`absolute inset-0 transition-all ${getEntranceClasses(isSelected, 3)}`}>
                    <img
                      src={project.images[project.images.length - 1]}
                      alt={`${project.name} main showcase`}
                      className={`absolute ${layout.img4} ${imageInteractionClasses}`}
                    />
                  </div>
                )}

                {/* Image 1 - (Fixes MyDash overlap) */}
                {layout.img1 && project.images[0] && (
                  <div className={`absolute inset-0 transition-all ${getEntranceClasses(isSelected, 0)}`}>
                    <img
                      src={project.images[0]}
                      alt={`${project.name} preview 1`}
                      className={`absolute ${layout.img1} ${imageInteractionClasses}`}
                    />
                  </div>
                )}

                {/* Image 2 */}
                {layout.img2 && project.images[1] && (
                  <div className={`absolute inset-0 transition-all ${getEntranceClasses(isSelected, 1)}`}>
                    <img
                      src={project.images[1]}
                      alt={`${project.name} preview 2`}
                      className={`absolute ${layout.img2} ${imageInteractionClasses}`}
                    />
                  </div>
                )}

                {/* Image 3 - (Barkchain/SuruGPT top layer) */}
                {layout.img3 && project.images[2] && (
                  <div className={`absolute inset-0 transition-all ${getEntranceClasses(isSelected, 2)}`}>
                    <img
                      src={project.images[2]}
                      alt={`${project.name} preview 3`}
                      className={`absolute ${layout.img3} ${imageInteractionClasses}`}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
