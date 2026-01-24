
import React from 'react';
import { PROJECTS_DATA } from '../../constants/projects.ts';
import { GithubArrowIcon } from '../icons/GithubArrowIcon.tsx';

interface ProjectsRightPanelProps {
  isDarkMode: boolean;
  selectedProject: string;
}

export const ProjectsRightPanel: React.FC<ProjectsRightPanelProps> = ({ isDarkMode, selectedProject }) => {
  const grayTextClasses = `transition-colors duration-300 ease-in-out ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`;
  
  const activeProjectData = PROJECTS_DATA.find(p => p.name === selectedProject);

  const getEntranceClasses = (isSelected: boolean, index: number) => {
    const staggeredDelays = ['delay-[0ms]', 'delay-[100ms]', 'delay-[200ms]', 'delay-[300ms]'];
    if (isSelected) {
      return `opacity-100 translate-y-0 duration-700 ease-out ${staggeredDelays[index]}`;
    } else {
      return `opacity-0 translate-y-20 duration-300 ease-in delay-[0ms]`;
    }
  };

  const imageInteractionClasses = `transition-transform duration-500 ease-out hover:scale-[1.02] border-[0.5px] border-black object-cover pointer-events-auto`;

  return (
    <div className="w-full flex flex-col pt-4 lg:pt-6 flex-1 min-h-[50vh]">
      {/* 
          Row for Description and GitHub link. 
      */}
      <div className="flex justify-between items-start mb-6 w-full animate-project-description px-1 md:px-2" key={selectedProject}>
        <div 
          className={`uppercase leading-relaxed max-w-[85%] lg:max-w-[400px] ${grayTextClasses} text-xs md:text-sm`}
        >
          {activeProjectData?.description}
        </div>
        
        {activeProjectData?.githubLink && (
          <a 
            href={activeProjectData.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`transition-colors duration-300 hover:text-[#FF4500] ${grayTextClasses} flex-shrink-0 pt-[3px]`}
            aria-label={`View ${selectedProject} on GitHub`}
          >
            <GithubArrowIcon className="h-[28.34px]" />
          </a>
        )}
      </div>
      
      {/* 
          Image Container
      */}
      <div className="flex-1 relative w-full h-full min-h-[350px] md:min-h-[500px] overflow-hidden">
        {PROJECTS_DATA.map((project) => {
          const isSelected = project.name === selectedProject;
          const { layout } = project;

          return (
            <div 
              key={project.name} 
              className={`absolute inset-0 w-full h-full ${isSelected ? 'z-10' : 'z-0'} pointer-events-none`}
            >
              {layout.img4 && project.images.length > 0 && (
                <div className={`absolute inset-0 transition-all ${getEntranceClasses(isSelected, 3)}`}>
                  <img
                    src={project.images[project.images.length - 1]}
                    alt={`${project.name} main showcase`}
                    className={`absolute ${layout.img4} ${imageInteractionClasses}`}
                  />
                </div>
              )}

              {layout.img1 && project.images[0] && (
                <div className={`absolute inset-0 transition-all ${getEntranceClasses(isSelected, 0)}`}>
                  <img
                    src={project.images[0]}
                    alt={`${project.name} preview 1`}
                    className={`absolute ${layout.img1} ${imageInteractionClasses}`}
                  />
                </div>
              )}

              {layout.img2 && project.images[1] && (
                <div className={`absolute inset-0 transition-all ${getEntranceClasses(isSelected, 1)}`}>
                  <img
                    src={project.images[1]}
                    alt={`${project.name} preview 2`}
                    className={`absolute ${layout.img2} ${imageInteractionClasses}`}
                  />
                </div>
              )}

              {layout.img3 && project.images[2] && (
                <div className={`absolute inset-0 transition-all ${getEntranceClasses(isSelected, 2)}`}>
                  <img
                    src={project.images[2]}
                    alt={`${project.name} preview 3`}
                    className={`absolute ${layout.img3} ${imageInteractionClasses}`}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
