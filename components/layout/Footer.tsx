import React from 'react';
import { useSmoothScroll } from '../../hooks/useSmoothScroll.ts';

interface FooterProps {
  isDarkMode: boolean;
}

export const Footer: React.FC<FooterProps> = ({ isDarkMode }) => {
  const { handleScroll } = useSmoothScroll();
  const grayTextClasses = `transition-colors duration-300 ease-in-out ${
    isDarkMode
      ? 'text-gray-400'
      : 'text-gray-600'
  }`;
  const borderClasses = isDarkMode ? 'border-[#efeeee]' : 'border-black';

  return (
    <footer className="w-full mb-4">
      {/* Top border */}
      <div className={`border-t ${borderClasses}`} />

      {/* Top line: 07 FOOTER and Copyright */}
      <div className={`flex justify-between items-center text-[10px] py-2 ${grayTextClasses}`}>
        <span>07 FOOTER</span>
        <span>© SURYANSH</span>
      </div>

      {/* Centered navigation section */}
      <div className="flex justify-center items-center pt-5 pb-11">
        <nav className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-xl">
          <a href="#about" onClick={handleScroll} className="transition-opacity duration-200">ABOUT ME</a>
          <a href="#projects" onClick={handleScroll} className="transition-opacity duration-200">PROJECTS</a>
          <a href="#skills" onClick={handleScroll} className="transition-opacity duration-200">SKILLS</a>
          <a href="mailto:suryanshs1804@gmail.com" className="transition-opacity duration-200">CONTACT</a>
        </nav>
      </div>
      
      {/* Bottom border */}
      <div className={`border-t ${borderClasses}`} />
    </footer>
  );
};