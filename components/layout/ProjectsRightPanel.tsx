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
  const { layout } = project;

  return (
    <div className="w-full lg:col-span-2 flex flex-col lg:pl-6 pt-8 lg:pt-0">
      <div className={`flex justify-between text-[10px] py-2 ${grayTextClasses}`}>
        <span>03 WORK</span>
        <span>/03</span>
      </div>
      
      {/* Container for the dynamic image layout driven by data */}
      <div 
        key={project.name} 
        className="flex-1 relative w-full h-full animate-fade-in"
      >
        {/* Image 1 */}
        <img
          src={project.images[0]}
          alt={`${project.name} screenshot 1`}
          className={`${imageBaseClasses} ${layout.img1}`}
          aria-hidden="true"
        />

        {/* Image 2 */}
        <img
          src={project.images[1]}
          alt={`${project.name} screenshot 2`}
          className={`${imageBaseClasses} ${layout.img2}`}
          aria-hidden="true"
        />

        {/* Image 3 - Render only if exists and layout is provided */}
        {project.images.length > 3 && layout.img3 && (
          <img
            src={project.images[2]}
            alt={`${project.name} screenshot 3`}
            className={`${imageBaseClasses} ${layout.img3}`}
            aria-hidden="true"
          />
        )}

        {/* Image 4 - Use last image in array */}
        <img
          src={project.images.length > 3 ? project.images[3] : project.images[2]}
          alt={`${project.name} screenshot 4`}
          className={`${imageBaseClasses} ${layout.img4}`}
          aria-hidden="true"
        />
      </div>
    </div>
  );
};
