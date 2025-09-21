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

  // Placeholder styles for image containers. You can replace the divs with <img> tags.
  const placeholderBase = 'rounded-xl border shadow-lg flex items-center justify-center text-sm text-gray-500';
  const placeholderColors = [
    'bg-pink-100 border-pink-200',
    'bg-blue-100 border-blue-200',
    'bg-green-100 border-green-200',
    'bg-yellow-100 border-yellow-200',
  ];
  if(isDarkMode) {
    placeholderColors[0] = 'bg-pink-900/30 border-pink-700/50';
    placeholderColors[1] = 'bg-blue-900/30 border-blue-700/50';
    placeholderColors[2] = 'bg-green-900/30 border-green-700/50';
    placeholderColors[3] = 'bg-yellow-900/30 border-yellow-700/50';
  }

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
        <div className="w-full md:w-2/3 min-h-[400px] md:min-h-0 relative">
          {/* Image Collage Placeholders - Replace these with your <img> tags */}
          <div
            title="Project image 1"
            className={`absolute w-[60%] h-[50%] bottom-[10%] left-[5%] transform transition-transform duration-300 hover:scale-105 hover:z-40 ${placeholderBase} ${placeholderColors[0]}`}
            style={{ zIndex: 10 }}
          ><p>Image 1</p></div>
          <div
            title="Project image 2"
            className={`absolute w-[55%] h-[70%] bottom-0 right-[5%] transform transition-transform duration-300 hover:scale-105 hover:z-40 ${placeholderBase} ${placeholderColors[1]}`}
            style={{ zIndex: 20 }}
          ><p>Image 2</p></div>
          <div
            title="Project image 3"
            className={`absolute w-[35%] h-[30%] bottom-0 left-[25%] transform transition-transform duration-300 hover:scale-105 hover:z-40 ${placeholderBase} ${placeholderColors[2]}`}
            style={{ zIndex: 30 }}
          ><p>Image 3</p></div>
           <div
            title="Project image 4"
            className={`absolute w-[30%] h-[40%] bottom-[35%] right-[2%] transform transition-transform duration-300 hover:scale-105 hover:z-40 ${placeholderBase} ${placeholderColors[3]}`}
            style={{ zIndex: 0 }}
          ><p>Image 4</p></div>
        </div>
      </div>
    </div>
  );
}