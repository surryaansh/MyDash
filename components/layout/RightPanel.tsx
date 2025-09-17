import React, { forwardRef } from 'react';
import { FilledLightningIcon } from '../icons/FilledLightningIcon.tsx';

interface RightPanelProps {
  isDarkMode: boolean;
  isHoveringLink: boolean;
  relativeCursorPosition: { x: number; y: number };
}

export const RightPanel = forwardRef<HTMLDivElement, RightPanelProps>(
  ({ isDarkMode, isHoveringLink, relativeCursorPosition }, ref) => {
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
          ref={ref}
          className="flex-1 relative overflow-hidden px-2 pt-0 pb-12 lg:px-0"
        >
          {/* This is the solid cursor, only visible when inside this container */}
          <div
            className="hidden lg:block"
            style={{
              position: 'absolute',
              top: relativeCursorPosition.y,
              left: relativeCursorPosition.x,
              width: `${isHoveringLink ? 60 : 40}px`,
              height: `${isHoveringLink ? 60 : 40}px`,
              backgroundColor: isDarkMode ? 'white' : 'black',
              borderRadius: '50%',
              pointerEvents: 'none',
              transform: 'translate(-50%, -50%)',
              zIndex: 10000,
              transition: 'width 0.2s ease, height 0.2s ease',
            }}
            aria-hidden="true"
          />
          <img 
              src="/vaporwave-david.png"
              alt="Vaporwave style statue of David wearing a glowing crown and glasses."
              className="w-full h-full object-cover"
          />
          <FilledLightningIcon 
            className="absolute bottom-12 right-6 md:bottom-20 md:right-[5%] text-[#FF4500] w-28 h-28 md:w-[9.409rem] md:h-[9.409rem]"
            style={{ mixBlendMode: 'normal' }}
          />
        </div>
      </div>
    );
  }
);