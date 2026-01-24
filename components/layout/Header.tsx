import React, { useState } from 'react';
import { LightningIcon } from '../icons/LightningIcon.tsx';
import { DarkModeToggle } from '../DarkModeToggle.tsx';
import { MenuIcon } from '../icons/MenuIcon.tsx';
import { CloseIcon } from '../icons/CloseIcon.tsx';
import { useSmoothScroll } from '../../hooks/useSmoothScroll.ts';

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Header: React.FC<HeaderProps> = ({ isDarkMode, toggleDarkMode }) => {
  const { handleScroll } = useSmoothScroll();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Prevent scrolling when menu is open
    document.body.style.overflow = !isMenuOpen ? 'hidden' : 'auto';
  };

  const handleMobileNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    toggleMenu();
    handleScroll(e);
  };

  return (
    <>
      <header className={`flex justify-between items-center py-3 md:py-4 border-b ${isDarkMode ? 'border-[#efeeee]' : 'border-black'} relative z-50`}>
        {/* Left: Branding */}
        <div className="flex items-center gap-2 no-cursor-invert transform -translate-y-0.5">
          <LightningIcon className="h-5 md:h-6 text-[#FF4500]" />
          <span className="text-lg md:text-xl font-extrabold italic text-[#FF4500] tracking-wide">SURYANSH // SINGH</span>
        </div>

        {/* Desktop Nav & Toggle */}
        <div className="hidden md:flex items-center gap-8">
          <nav className="flex gap-8 text-xl">
            <a href="#projects" onClick={handleScroll} className="transition-opacity duration-200">PROJECTS</a>
            <a href="#skills" onClick={handleScroll} className="transition-opacity duration-200">SKILLS</a>
            <a href="#contact" onClick={handleScroll} className="transition-opacity duration-200">LET'S CONNECT</a>
          </nav>
          <DarkModeToggle isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        </div>

        {/* Mobile: Buttons (No Pill Outline) */}
        <div className="md:hidden flex items-center gap-3 pr-1">
          <DarkModeToggle isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
          <button 
            onClick={toggleMenu}
            className={`p-1 focus:outline-none ${isDarkMode ? 'text-white' : 'text-black'}`}
            aria-label="Toggle Menu"
          >
            <MenuIcon className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-40 bg-black/95 backdrop-blur-xl transition-all duration-500 ease-in-out md:hidden ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}`}>
        <div className="flex flex-col h-full p-8 pt-24">
          <button 
            onClick={toggleMenu}
            className="absolute top-8 right-6 text-white p-2"
            aria-label="Close Menu"
          >
            <CloseIcon className="w-8 h-8" />
          </button>
          
          <nav className="flex flex-col gap-8 text-3xl font-light tracking-tight text-white">
            <a href="#projects" onClick={handleMobileNavClick} className="hover:text-[#FF4500] transition-colors">PROJECTS</a>
            <a href="#skills" onClick={handleMobileNavClick} className="hover:text-[#FF4500] transition-colors">SKILLS</a>
            <a href="#contact" onClick={handleMobileNavClick} className="hover:text-[#FF4500] transition-colors">LET'S CONNECT</a>
          </nav>

          <div className="mt-auto mb-8">
             <span className="text-gray-500 text-sm">© SURYANSH SINGH</span>
          </div>
        </div>
      </div>
    </>
  );
};