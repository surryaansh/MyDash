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

  // Updated classes: removed shadows, kept thin black border and no rounded corners.
  const imageBaseClasses = `absolute object-cover border border-black transition-all duration-300 ease-in-out hover:scale-105`;

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
        
        {/* New Curated Collage Layout inspired by user's BARKCHAIN image */}
        <div className="w-full md:w-2/3 min-h-[500px] md:min-h-full relative">
          
          {/* Image 3: Bottom-right, furthest back */}
          <img
            src={project.images[2]}
            alt={`${project.name} screenshot 3`}
            className={`${imageBaseClasses} w-[45%] h-auto bottom-[5%] right-0 hover:z-30`}
            aria-hidden="true"
          />

          {/* Image 4: Left, behind */}
          <img
            src={project.images[3]}
            alt={`${project.name} screenshot 4`}
            className={`${imageBaseClasses} w-[48%] h-auto top-[8%] left-0 z-10 hover:z-30`}
            aria-hidden="true"
          />

          {/* Image 2: Right, behind */}
          <img
            src={project.images[1]}
            alt={`${project.name} screenshot 2`}
            className={`${imageBaseClasses} w-[45%] h-auto top-[15%] right-[5%] z-10 hover:z-30`}
            aria-hidden="true"
          />

          {/* Image 1: Central, top */}
          <img
            src={project.images[0]}
            alt={`${project.name} screenshot 1`}
            className={`${imageBaseClasses} w-[55%] h-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 hover:z-30`}
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
}
