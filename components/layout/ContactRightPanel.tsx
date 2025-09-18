import React, { forwardRef } from 'react';

interface ContactRightPanelProps {
  isDarkMode: boolean;
  relativeCursorPosition: { x: number; y: number };
  isHoveringLink: boolean;
}

export const ContactRightPanel = forwardRef<HTMLDivElement, ContactRightPanelProps>(
  ({ isDarkMode, relativeCursorPosition, isHoveringLink }, ref) => {
    const grayTextClasses = `transition-colors duration-300 ease-in-out ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`;
    const buttonClasses = `px-8 py-4 md:px-10 md:py-5 rounded-full text-base md:text-lg font-bold transition-colors duration-300 ease-in-out hover:bg-[#FF4500] ${
      isDarkMode ? 'bg-[#efeeee] text-black' : 'bg-black text-[#efeeee]'
    }`;

    return (
      <div className="w-full lg:w-1/2 flex flex-col lg:pl-6 pt-8 lg:pt-0">
        <div className={`flex justify-between text-[10px] py-2 ${grayTextClasses}`}>
          <span>06 CONTACT</span>
          <span>/06</span>
        </div>
        <div ref={ref} className="flex-1 relative overflow-hidden px-2 pt-0 pb-8 lg:px-0">
          {/* This is the solid cursor, only visible when inside this container to prevent color inversion */}
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
            src="/connect-me.png"
            alt="An abstract, glowing wireframe figure reaching out a hand."
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
              <a href="mailto:suryanshs1804@gmail.com" className={buttonClasses}>
                  LET'S CONNECT
              </a>
          </div>
        </div>
      </div>
    );
  }
);