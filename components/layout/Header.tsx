import React from 'react';
import { LightningIcon } from '../icons/LightningIcon.tsx';
import { DarkModeToggle } from '../DarkModeToggle.tsx';

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Header: React.FC<HeaderProps> = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <header className={`flex flex-col md:flex-row justify-between items-center py-4 border-b ${isDarkMode ? 'border-[#efeeee]' : 'border-black'}`}>
      <div className="flex items-center gap-4 mb-4 md:mb-0">
        <div className="flex items-center gap-2">
          <LightningIcon className="h-6 text-[#FF4500]" />
          <span className="text-xl font-extrabold italic text-[#FF4500] tracking-wide">SURYANSH // SINGH</span>
        </div>
        <DarkModeToggle isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      </div>
      <nav className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-lg">
        <a href="#" className="transition-opacity duration-200">PROJECTS</a>
        <a href="#" className="transition-opacity duration-200">SKILLS</a>
        <a href="#" className="transition-opacity duration-200">LET'S CONNECT</a>
      </nav>
    </header>
  );
};