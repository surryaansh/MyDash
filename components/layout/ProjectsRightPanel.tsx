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
          <span>03 WORK</span>
          <span>/03</span>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <p>Project not found.</p>
        </div>
      </div>
    );
  }

  const borderClass = isDarkMode ? 'border-[#efeeee]' : 'border-black';

  return (
    <div className="w-full lg:col-span-2 flex flex-col lg:pl-6 pt-8 lg:pt-0">
      <div className={`flex justify-between text-[10px] py-2 ${grayTextClasses}`}>
        <span>03 WORK</span>
        <span>/03</span>
      </div>
      <div key={project.name} className="flex-1 flex flex-col pt-8 pb-4 animate-fade-in">
        {/* Project Description (more compact) */}
        <div className="w-full md:w-1/2 mb-12">
          <p className="text-base leading-relaxed">{project.description}</p>
        </div>
        
        {/* Single Left-Aligned and Resized Image Layout */}
        <div className="flex-1 flex justify-start items-start">
          <img
            src={project.images[0]}
            alt={`${project.name} screenshot 1`}
            className={`object-contain border ${borderClass} max-w-full md:max-w-lg`}
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
}
