import React from 'react';

interface ProjectsRightPanelProps {
  isDarkMode: boolean;
}

export const ProjectsRightPanel: React.FC<ProjectsRightPanelProps> = ({ isDarkMode }) => {
  const grayTextClasses = `transition-colors duration-300 ease-in-out ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`;

  return (
    <div className="w-full lg:w-1/2 flex flex-col lg:pl-6 py-8">
      <div className={`flex justify-between text-[10px] py-2 ${grayTextClasses}`}>
        <span>03 WORK</span>
        <span>/03</span>
      </div>
      <div className="flex-1 min-h-[300px] lg:min-h-0">
        {/* Blank as per request */}
      </div>
    </div>
  );
}
