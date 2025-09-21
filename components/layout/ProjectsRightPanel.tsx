import React from 'react';
import { PROJECTS_DATA } from '../../constants/projects.ts';

interface ProjectsRightPanelProps {
  isDarkMode: boolean;
  selectedProject: string;
}

export const ProjectsRightPanel: React.FC<ProjectsRightPanelProps> = ({ isDarkMode, selectedProject }) => {
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

  const imageBaseClasses = `absolute object-cover border-[0.5px] border-black transition-transform duration-300 hover:scale-[1.02]`;

  // --- Conditional classes for specific projects ---
  const isMydash = project.name === 'MYDASH';

  const firstImageClasses = isMydash
    ? 'w-[42%] h-auto max-h-[42%] bottom-4 left-[16%]' // size reduced by ~7%, moved right 3%
    : 'w-[45%] h-auto max-h-[45%] bottom-4 left-[13%]';

  const secondImageClasses = isMydash
    ? 'w-[28%] h-auto top-[42%] right-[27%]' // size increased by 10%, moved left 3%, down 4%
    : 'w-[25%] h-auto top-[8%] right-[44%]';

  const secondImageZIndex = isMydash ? 40 : 20;

  // Conditionally set the classes for the third image to adjust its position for 'SURU GPT'.
  const thirdImagePositionClasses = project.name === 'SURU GPT'
    ? 'bottom-[12%] right-[28%]'
    : 'bottom-[18%] right-[24%]';

  return (
    <div className="w-full lg:col-span-2 flex flex-col lg:pl-6 pt-8 lg:pt-0">
      <div className={`flex justify-between text-[10px] py-2 ${grayTextClasses}`}>
        <span>03 WORK</span>
        <span>/03</span>
      </div>
      
      {/* Container for the step-by-step image layout */}
      <div 
        key={project.name} 
        className="flex-1 relative w-full h-full animate-fade-in"
      >
        {/* Image 1 */}
        <img
          src={project.images[0]}
          alt={`${project.name} screenshot 1`}
          className={`${imageBaseClasses} ${firstImageClasses}`}
          style={{ zIndex: 10 }}
          aria-hidden="true"
        />

        {/* Image 2 */}
        <img
          src={project.images[1]}
          alt={`${project.name} screenshot 2`}
          className={`${imageBaseClasses} ${secondImageClasses}`}
          style={{ zIndex: secondImageZIndex }}
          aria-hidden="true"
        />

        {/* Image 3 (barkchain-3.png) - Conditionally render for projects with 4 images */}
        {project.images.length > 3 && (
          <img
            src={project.images[2]}
            alt={`${project.name} screenshot 3`}
            className={`${imageBaseClasses} w-[22.5%] h-auto ${thirdImagePositionClasses}`}
            style={{ zIndex: 30 }}
            aria-hidden="true"
          />
        )}

        {/* Image 4 (barkchain-4.png) - Use last image in array */}
        <img
          src={project.images.length > 3 ? project.images[3] : project.images[2]}
          alt={`${project.name} screenshot 4`}
          className={`${imageBaseClasses} h-[92%] w-auto bottom-4 right-0`}
          style={{ zIndex: 25 }}
          aria-hidden="true"
        />

      </div>
    </div>
  );
};
