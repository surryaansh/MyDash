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

  // Updated classes: removed shadow, increased hover z-index.
  const imageBaseClasses = `absolute object-cover border border-black transition-all duration-300 hover:scale-105 hover:z-50`;

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
        
        {/* New "One-by-One" Linear Collage Layout */}
        <div className="w-full md:w-2/3 min-h-[500px] md:min-h-[600px] relative">
          {/* Image 1: Left-most */}
          <img
            src={project.images[0]}
            alt={`${project.name} screenshot 1`}
            className={`${imageBaseClasses} top-[10%] left-0 w-2/5 h-auto z-10`}
            aria-hidden="true"
          />

          {/* Image 2: Middle-left */}
          <img
            src={project.images[1]}
            alt={`${project.name} screenshot 2`}
            className={`${imageBaseClasses} top-[25%] left-[20%] w-2/5 h-auto z-20`}
            aria-hidden="true"
          />

          {/* Image 3: Middle-right */}
          <img
            src={project.images[2]}
            alt={`${project.name} screenshot 3`}
            className={`${imageBaseClasses} top-[5%] left-[40%] w-2/5 h-auto z-30`}
            aria-hidden="true"
          />

          {/* Image 4: Right-most (the tall one) */}
          <img
            src={project.images[3]}
            alt={`${project.name} screenshot 4`}
            className={`${imageBaseClasses} top-[15%] left-[60%] w-2/5 h-auto max-h-[80%] z-40`}
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
}
