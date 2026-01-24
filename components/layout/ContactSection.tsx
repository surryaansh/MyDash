
import React, { useState } from 'react';
import { InteractiveFaceIcon } from '../icons/InteractiveFaceIcon.tsx';

interface ContactSectionProps {
  isDarkMode: boolean;
  cursorPosition: { x: number; y: number };
}

export const ContactSection: React.FC<ContactSectionProps> = ({ isDarkMode, cursorPosition }) => {
  const [isConnectHovered, setIsConnectHovered] = useState(false);

  const borderClasses = isDarkMode ? 'border-[#efeeee]' : 'border-black';
  const grayTextClasses = `transition-colors duration-300 ease-in-out ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`;
  
  const buttonClasses = `transform -translate-y-1 px-8 py-3 md:px-10 md:py-4 rounded-full text-base md:text-lg font-bold transition-colors duration-300 ease-in-out hover:bg-[#FF4500] ${
    isDarkMode ? 'bg-[#efeeee] text-black' : 'bg-black text-[#efeeee]'
  }`;

  return (
    <section id="contact" className={`flex flex-col flex-1 border-t py-8 lg:py-0 ${borderClasses}`}>
      {/* Header */}
      <div className={`flex justify-between text-[10px] py-2 mb-8 ${grayTextClasses}`}>
        <span>04 CONTACT</span>
        <span>/04</span>
      </div>

      <div className="flex-1 flex flex-col items-start justify-center max-w-5xl mx-auto w-full px-0 md:px-8">
        
        {/* 1. Headline */}
        <h2 className="text-4xl md:text-5xl lg:text-7xl font-light leading-tight mb-12 text-left w-full">
          EAGER TO TAKE ON <br /> NEW CHALLENGES.
        </h2>

        {/* 2. Connect Visual (Interleaved) */}
        <div className="w-full relative overflow-hidden mb-16 aspect-video max-h-[400px]">
          <img
            src="/connect-me.png"
            alt="An abstract, glowing wireframe figure reaching out a hand."
            className={`w-full h-full object-cover transition-opacity duration-700 ease-in-out ${isConnectHovered ? 'opacity-100' : 'opacity-0'}`}
          />
          <div className="absolute inset-0 flex items-center justify-center">
              <a 
                href="mailto:suryanshs1804@gmail.com" 
                className={buttonClasses}
                onMouseEnter={() => setIsConnectHovered(true)}
                onMouseLeave={() => setIsConnectHovered(false)}
              >
                  LET'S CONNECT
              </a>
          </div>
        </div>

        {/* 3. Interactive Face (Scaled down) */}
        <div className="relative self-center w-full max-w-[300px] md:max-w-[400px]">
          <InteractiveFaceIcon 
            cursorPosition={cursorPosition} 
            isDarkMode={isDarkMode} 
            isConnectHovered={isConnectHovered}
          />
        </div>
        
      </div>
    </section>
  );
};
