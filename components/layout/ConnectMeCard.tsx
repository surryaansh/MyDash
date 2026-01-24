import React, { useState } from 'react';

interface ConnectMeCardProps {
  isDarkMode: boolean;
  className?: string;
  onHoverChange?: (isHovered: boolean) => void;
}

export const ConnectMeCard: React.FC<ConnectMeCardProps> = ({ isDarkMode, className = "", onHoverChange }) => {
  const [isLocalHovered, setIsLocalHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsLocalHovered(true);
    onHoverChange?.(true);
  };

  const handleMouseLeave = () => {
    setIsLocalHovered(false);
    onHoverChange?.(false);
  };

  const buttonClasses = `transform -translate-y-1 px-8 py-3 md:px-10 md:py-4 rounded-full text-base md:text-lg font-bold transition-colors duration-300 ease-in-out hover:bg-[#FF4500] ${
    isDarkMode ? 'bg-[#efeeee] text-black' : 'bg-black text-[#efeeee]'
  }`;

  return (
    <div className={`relative overflow-hidden ${className}`}>
        <img
          src="/connect-me.png"
          alt="An abstract, glowing wireframe figure reaching out a hand."
          className={`w-full h-full object-cover transition-opacity duration-700 ease-in-out ${isLocalHovered ? 'opacity-100' : 'opacity-0'}`}
        />
        <div className="absolute inset-0 flex items-center justify-center">
            <a 
              href="mailto:suryanshs1804@gmail.com" 
              className={buttonClasses}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
                LET'S CONNECT
            </a>
        </div>
    </div>
  );
};