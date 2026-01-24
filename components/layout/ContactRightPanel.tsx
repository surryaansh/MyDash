import React from 'react';
import { ConnectMeCard } from '../ConnectMeCard.tsx';

interface ContactRightPanelProps {
  isDarkMode: boolean;
  onHoverChange?: (isHovered: boolean) => void;
  className?: string;
}

export const ContactRightPanel: React.FC<ContactRightPanelProps> = ({ isDarkMode, onHoverChange, className = "" }) => {
  const grayTextClasses = `transition-colors duration-300 ease-in-out ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`;

  return (
    <div className={`w-full lg:w-1/2 flex flex-col lg:pl-6 pt-8 lg:pt-0 min-h-[300px] lg:min-h-0 ${className}`}>
      <div className={`flex justify-between text-[10px] py-2 ${grayTextClasses}`}>
        <span>06 CONTACT</span>
        <span>/06</span>
      </div>
      <div className="flex-1 h-full">
        <ConnectMeCard 
            isDarkMode={isDarkMode} 
            onHoverChange={onHoverChange} 
            className="w-full h-full"
        />
      </div>
    </div>
  );
};