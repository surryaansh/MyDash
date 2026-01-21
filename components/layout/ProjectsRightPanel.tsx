
import React from 'react';
import { PROJECTS_DATA } from '../../constants/projects.ts';

interface ProjectsRightPanelProps {
  isDarkMode: boolean;
  selectedProject: string;
}

export const ProjectsRightPanel: React.FC<ProjectsRightPanelProps> = ({ isDarkMode, selectedProject }) => {
  const grayTextClasses = `transition-colors duration-300 ease-in-out ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`;
  
  const activeProjectData = PROJECTS_DATA.find(p => p.name === selectedProject);

  /**
   * Generates animation classes for the ghost wrapper.
   * This handles the staggered entrance/exit of the project images.
   */
  const getEntranceClasses = (isSelected: boolean, index: number) => {
    const staggeredDelays = ['delay-[0ms]', 'delay-[100ms]', 'delay-[200ms]', 'delay-[300ms]'];
    
    if (isSelected) {
      return `opacity-100 translate-y-0 duration-700 ease-out ${staggeredDelays[index]}`;
    } else {
      return `opacity-0 translate-y-20 duration-300 ease-in delay-[0ms]`;
    }
  };

  /**
   * Base classes for the images to ensure they maintain their original positioning
   * and sizing while handling the hover interaction independently of the entrance delay.
   */
  const imageInteractionClasses = `transition-transform duration-500 ease-out hover:scale-[1.02] border-[0.5px] border-black object-cover pointer-events-auto`;

  return (
    <div className="w-full lg:col-span-2 flex flex-col lg:pl-6 pt-8 lg:pt-0">
      <div className={`flex justify-between text-[10px] py-2 ${grayTextClasses}`}>
        <span>03 WORK</span>
        <span>/03</span>
      </div>
      
      {/* Project Description Block - Tightened width for better alignment */}
      <div className={`text-[10px] uppercase leading-relaxed mb-6 max-w-[280px] lg:max-w-[320px] animate-fade-in ${grayTextClasses}`} key={selectedProject}>
        {activeProjectData?.description}
      </div>
      
      {/* Image Container - Scaled down min-height by ~20% to follow section scaling */}
      <div className="flex-1 relative w-full h-full min-h-[300px] lg:min-h-[420px] overflow-hidden">
        {PROJECTS_DATA.map((project) => {
          const isSelected = project.name === selectedProject;
          const { layout } = project;

          return (
            <div 
              key={project.name} 
              className={`absolute inset-0 w-full h-full ${isSelected ? 'z-10' : 'z-0'} pointer-events-none`}
            >
              {/* Highlight Image (Image 4) - Rendered first to ensure it's ALWAYS the background layer */}
              {layout.img4 && project.images.length > 0 && (
                <div className={`absolute inset-0 transition-all ${getEntranceClasses(isSelected, 3)}`}>
                  <img
                    src={project.images[project.images.length - 1]}
                    alt={`${project.name} main showcase`}
                    className={`absolute ${layout.img4} ${imageInteractionClasses}`}
                  />
                </div>
              )}

              {/* Image 1 - Rendered after 4 to overlap it (Fixes MyDash) */}
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

              {/* Image 3 - Rendered last to overlap everything else (Barkchain/SuruGPT) */}
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
  );
};
