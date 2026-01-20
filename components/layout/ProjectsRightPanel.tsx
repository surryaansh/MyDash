
import React from 'react';
import { PROJECTS_DATA } from '../../constants/projects.ts';

interface ProjectsRightPanelProps {
  isDarkMode: boolean;
  selectedProject: string;
}

export const ProjectsRightPanel: React.FC<ProjectsRightPanelProps> = ({ isDarkMode, selectedProject }) => {
  const grayTextClasses = `transition-colors duration-300 ease-in-out ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`;
  
  /**
   * Generates animation classes for the wrapper div based on its index and selection state.
   * This handles the entrance/exit of the project images with staggered delays.
   */
  const getAnimClasses = (isSelected: boolean, index: number) => {
    const staggeredDelays = ['delay-[0ms]', 'delay-[100ms]', 'delay-[200ms]', 'delay-[300ms]'];
    
    if (isSelected) {
      return `opacity-100 translate-y-0 duration-700 ease-out ${staggeredDelays[index]}`;
    } else {
      return `opacity-0 translate-y-20 duration-300 ease-in delay-[0ms] pointer-events-none`;
    }
  };

  /**
   * Interaction classes for the inner image element.
   * By isolating the hover scale on a child element, it remains unaffected by 
   * the parent's staggered entrance delays, making the pop-out immediate.
   */
  const interactionClasses = `w-full h-full object-cover border-[0.5px] border-black transition-transform duration-500 ease-out hover:scale-[1.02]`;

  return (
    <div className="w-full lg:col-span-2 flex flex-col lg:pl-6 pt-8 lg:pt-0">
      <div className={`flex justify-between text-[10px] py-2 ${grayTextClasses}`}>
        <span>03 WORK</span>
        <span>/03</span>
      </div>
      
      <div className="flex-1 relative w-full h-full overflow-hidden">
        {PROJECTS_DATA.map((project) => {
          const isSelected = project.name === selectedProject;
          const { layout } = project;

          return (
            <div 
              key={project.name} 
              className={`absolute inset-0 w-full h-full ${isSelected ? 'z-10' : 'z-0'}`}
            >
              {/* Image 1 Wrapper */}
              {layout.img1 && project.images[0] && (
                <div className={`absolute ${layout.img1} transition-all ${getAnimClasses(isSelected, 0)}`}>
                  <img
                    src={project.images[0]}
                    alt={`${project.name} preview 1`}
                    className={interactionClasses}
                  />
                </div>
              )}

              {/* Image 2 Wrapper */}
              {layout.img2 && project.images[1] && (
                <div className={`absolute ${layout.img2} transition-all ${getAnimClasses(isSelected, 1)}`}>
                  <img
                    src={project.images[1]}
                    alt={`${project.name} preview 2`}
                    className={interactionClasses}
                  />
                </div>
              )}

              {/* Image 3 Wrapper */}
              {layout.img3 && project.images[2] && (
                <div className={`absolute ${layout.img3} transition-all ${getAnimClasses(isSelected, 2)}`}>
                  <img
                    src={project.images[2]}
                    alt={`${project.name} preview 3`}
                    className={interactionClasses}
                  />
                </div>
              )}

              {/* Highlight Image Wrapper */}
              {layout.img4 && project.images.length > 0 && (
                <div className={`absolute ${layout.img4} transition-all ${getAnimClasses(isSelected, 3)}`}>
                  <img
                    src={project.images[project.images.length - 1]}
                    alt={`${project.name} main showcase`}
                    className={interactionClasses}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
