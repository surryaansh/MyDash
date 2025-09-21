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
  const imageBaseClasses = `absolute object-cover border ${isDarkMode ? 'border-neutral-800' : 'border-black'} transition-transform duration-300 hover:scale-[1.02]`;

  return (
    <div className="w-full lg:col-span-2 flex flex-col lg:pl-6 pt-8 lg:pt-0">
      <div className={`flex justify-between text-[10px] py-2 ${grayTextClasses}`}>
        <span>03 WORK</span>
        <span>/03</span>
      </div>
      
      {/* 
        The key change is here: The images are now in a container that takes up the full space,
        not sharing it with a description. This allows for positioning based on the user's sketch.
      */}
      <div key={project.name} className="flex-1 relative w-full py-8 animate-fade-in" style={{ minHeight: '400px' }}>
        
        {/* Image 1 (Bottom Left, Horizontal) */}
        <img
          src={project.images[0]}
          alt={`${project.name} screenshot 1`}
          className={`${imageBaseClasses} w-3/5 h-auto bottom-0 left-0`}
          style={{ zIndex: 10 }}
          aria-hidden="true"
        />

        {/* Image 2 (Top Center, Vertical) */}
        <img
          src={project.images[1]}
          alt={`${project.name} screenshot 2`}
          className={`${imageBaseClasses} w-2/5 h-auto top-[10%] left-[20%]`}
          style={{ zIndex: 20 }}
          aria-hidden="true"
        />

        {/* Image 4 (Top Right, Tall Vertical) */}
        <img
          src={project.images[3]}
          alt={`${project.name} screenshot 4`}
          className={`${imageBaseClasses} w-1/3 h-5/6 top-0 right-0 object-top`}
          style={{ zIndex: 30 }}
          aria-hidden="true"
        />

        {/* Image 3 (Middle Right, Horizontal) */}
        <img
          src={project.images[2]}
          alt={`${project.name} screenshot 3`}
          className={`${imageBaseClasses} w-1/2 h-auto top-1/3 left-1/2 -translate-x-1/4`}
          style={{ zIndex: 40 }}
          aria-hidden="true"
        />

      </div>
    </div>
  );
}
