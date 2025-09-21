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

  // Base classes for images: no rounded corners, thin black border, no shadow.
  const imageBaseClasses = `absolute object-cover border border-black transition-transform duration-300 hover:scale-105 hover:z-40`;

  return (
    <div className="w-full lg:col-span-2 flex flex-col lg:pl-6 pt-8 lg:pt-0">
      <div className={`flex justify-between text-[10px] py-2 ${grayTextClasses}`}>
        <span>03 WORK</span>
        <span>/03</span>
      </div>
      <div key={project.name} className="flex-1 flex flex-col md:flex-row gap-8 py-8 animate-fade-in">
        <div className="w-full md:w-1/3 flex flex-col">
          <p className="text-base leading-relaxed">{project.description}</p>
        </div>
        {/* Step-by-step collage layout */}
        <div className="w-full md:w-2/3 min-h-[400px] md:min-h-[500px] relative">
          {/* Image 1: barkchain-1.png, positioned as requested */}
          <img
            src={project.images[0]}
            alt={`${project.name} screenshot 1`}
            className={`${imageBaseClasses} bottom-0 left-8 w-2/3 h-auto`}
            style={{ zIndex: 10 }}
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
}
