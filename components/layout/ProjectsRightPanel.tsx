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

  const imageBaseClasses = `absolute object-cover rounded-xl border shadow-lg transition-all duration-300 hover:scale-105 hover:z-40 ${
    isDarkMode ? 'border-gray-700/50' : 'border-gray-200'
  }`;

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
        {/* New Creative Collage Layout */}
        <div className="w-full md:w-2/3 min-h-[400px] md:min-h-[500px] relative">
          {/* Image 1 (Main Landscape) -> Top-left foundation */}
          <img
            src={project.images[0]}
            alt={`${project.name} screenshot 1`}
            className={`${imageBaseClasses} w-3/4 h-auto top-0 left-0`}
            style={{ zIndex: 10 }}
            aria-hidden="true"
          />

          {/* Image 3 (Square/Component) -> Middle-left, connecting element with higher elevation */}
          <img
            src={project.images[2]}
            alt={`${project.name} screenshot 3`}
            className={`${imageBaseClasses} w-2/5 h-auto top-1/2 left-[5%] shadow-2xl`}
            style={{ zIndex: 30 }}
            aria-hidden="true"
          />

          {/* Image 2 (Tall Portrait) -> Right side, vertical element */}
          <img
            src={project.images[1]}
            alt={`${project.name} screenshot 2`}
            className={`${imageBaseClasses} w-[30%] h-auto top-[5%] right-[5%]`}
            style={{ zIndex: 20 }}
            aria-hidden="true"
          />

          {/* Image 4 (Second Landscape) -> Bottom-right anchor */}
          <img
            src={project.images[3]}
            alt={`${project.name} screenshot 4`}
            className={`${imageBaseClasses} w-7/12 h-auto bottom-0 right-0`}
            style={{ zIndex: 20 }}
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
}