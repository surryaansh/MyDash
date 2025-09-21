import React from 'react';
import { FilledLightningIcon } from '../icons/FilledLightningIcon.tsx';

interface RightPanelProps {
  isDarkMode: boolean;
}

export const RightPanel: React.FC<RightPanelProps> = ({ isDarkMode }) => {
  const grayTextClasses = `transition-colors duration-300 ease-in-out ${
    isDarkMode
      ? 'text-gray-400'
      : 'text-gray-600'
  }`;

  return (
    <div className="w-full lg:w-1/2 flex flex-col lg:pl-6 pt-8 lg:pt-0">
      <div className={`flex justify-between text-[10px] py-2 ${grayTextClasses}`}>
        <span>01 LOGO</span>
        <span>/01</span>
      </div>
      <div
        className="relative w-full aspect-square overflow-hidden px-2 pt-0 lg:px-0"
      >
        <div className="absolute top-0 left-0 right-0 bottom-6">
          <img 
              src="/vaporwave-david.png"
              alt="Vaporwave style statue of David wearing a glowing crown and glasses."
              className="w-full h-full object-cover"
          />
        </div>
        <FilledLightningIcon 
          className="absolute bottom-6 right-6 md:bottom-14 md:right-[5%] text-[#FF4500] w-28 h-28 md:w-[9.409rem] md:h-[9.409rem]"
          style={{ mixBlendMode: 'normal' }}
        />
      </div>
    </div>
  );
};