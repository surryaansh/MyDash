import React from 'react';
import { PROJECTS_DATA } from '../../constants/projects.ts';
import { ArrowUpRightIcon } from '../icons/ArrowUpRightIcon.tsx';

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
      <div className={`flex justify-between text-[10px] py-2 items-center`}>
        <span className={grayTextClasses}>03 WORK</span>
        <div className="flex items-center gap-4">
          <span className={grayTextClasses}>/03</span>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${project.name} project`}
            className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${isDarkMode ? 'border-gray-600 hover:border-white' : 'border-gray-400 hover:border-black'}`}
          >
            <ArrowUpRightIcon className="w-5 h-5" />
          </a>
        </div>
      </div>
      <div key={project.name} className="flex-1 flex flex-col md:flex-row gap-8 py-8 animate-fade-in">
        <div className="w-full md:w-1/3 flex flex-col justify-between">
          <p className="text-base md:text-lg leading-relaxed">{project.description}</p>
          <div className="flex flex-col gap-2 pt-8">
            {project.keywords.map(keyword => (
              <span key={keyword} className="text-sm font-medium tracking-widest">{keyword}</span>
            ))}
          </div>
        </div>
        <div className="w-full md:w-2/3 min-h-[400px] md:min-h-0 relative">
          {/* Image Collage Placeholders - Replace these with your <img> tags */}
          <div
            title="Project image 1"
            className={`absolute w-[60%] h-[45%] top-[10%] left-[5%] -rotate-6 transform transition-transform duration-300 hover:scale-105 ${placeholderBase} ${placeholderColors[0]}`}
            style={{ zIndex: 1 }}
          ><p>Image 1</p></div>
          <div
            title="Project image 2"
            className={`absolute w-[55%] h-[55%] top-[25%] left-[35%] rotate-3 transform transition-transform duration-300 hover:scale-105 ${placeholderBase} ${placeholderColors[1]}`}
            style={{ zIndex: 3 }}
          ><p>Image 2</p></div>
          <div
            title="Project image 3"
            className={`absolute w-[40%] h-[35%] bottom-[5%] left-[15%] rotate-12 transform transition-transform duration-300 hover:scale-105 ${placeholderBase} ${placeholderColors[2]}`}
            style={{ zIndex: 2 }}
          ><p>Image 3</p></div>
          <div
            title="Project image 4"
            className={`absolute w-[30%] h-[30%] bottom-[15%] right-[5%] -rotate-12 transform transition-transform duration-300 hover:scale-105 ${placeholderBase} ${placeholderColors[3]}`}
            style={{ zIndex: 4 }}
          ><p>Image 4</p></div>
        </div>
      </div>
    </div>
  );
}