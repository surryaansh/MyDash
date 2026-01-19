import React from 'react';
import { PROJECTS_DATA } from '../../constants/projects.ts';

interface ProjectsRightPanelProps {
  isDarkMode: boolean;
  selectedProject: string;
}

export const ProjectsRightPanel: React.FC<ProjectsRightPanelProps> = ({ isDarkMode, selectedProject }) => {
  const grayTextClasses = `transition-colors duration-300 ease-in-out ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`;
  
  // Base classes for the images including the transition properties
  const imageBaseClasses = `absolute object-cover border-[0.5px] border-black transition-all duration-700 ease-out hover:scale-[1.02]`;

  return (
    <div className="w-full lg:col-span-2 flex flex-col lg:pl-6 pt-8 lg:pt-0">
      <div className={`flex justify-between text-[10px] py-2 ${grayTextClasses}`}>
        <span>03 WORK</span>
        <span>/03</span>
      </div>
      
      <div className="flex-1 relative w-full h-full">
        {PROJECTS_DATA.map((project) => {
          const isSelected = project.name === selectedProject;
          const { layout } = project;

          // Animation classes based on selection state
          const animClasses = (delayClass: string) => 
            `${isSelected ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12 pointer-events-none'} ${delayClass}`;

          return (
            <div 
              key={project.name} 
              className={`absolute inset-0 w-full h-full ${isSelected ? 'z-10' : 'z-0'}`}
            >
              {/* Image 1 - Stagger 0ms */}
              <img
                src={project.images[0]}
                alt={`${project.name} preview 1`}
                className={`${imageBaseClasses} ${layout.img1} ${animClasses('delay-[0ms]')}`}
                aria-hidden="true"
              />

              {/* Image 2 - Stagger 100ms */}
              <img
                src={project.images[1]}
                alt={`${project.name} preview 2`}
                className={`${imageBaseClasses} ${layout.img2} ${animClasses('delay-[100ms]')}`}
                aria-hidden="true"
              />

              {/* Image 3 - Stagger 200ms */}
              {project.images.length > 3 && layout.img3 && (
                <img
                  src={project.images[2]}
                  alt={`${project.name} preview 3`}
                  className={`${imageBaseClasses} ${layout.img3} ${animClasses('delay-[200ms]')}`}
                  aria-hidden="true"
                />
              )}

              {/* Highlight Image - Stagger 300ms */}
              <img
                src={project.images.length > 3 ? project.images[3] : project.images[2]}
                alt={`${project.name} main showcase`}
                className={`${imageBaseClasses} ${layout.img4} ${animClasses('delay-[300ms]')}`}
                aria-hidden="true"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
