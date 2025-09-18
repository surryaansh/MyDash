import React from 'react';

interface IconProps {
  className?: string;
}

export const TypescriptSkillIcon: React.FC<IconProps> = ({ className }) => {
  return (
    <div className={`${className} flex items-center justify-center`}>
      <svg 
        version="1.1" 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 676 160"
        className="w-full h-auto"
        fill="currentColor"
      >
      </svg>
    </div>
  );
};
