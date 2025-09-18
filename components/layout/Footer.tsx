import React from 'react';

interface FooterProps {
  isDarkMode: boolean;
}

export const Footer: React.FC<FooterProps> = ({ isDarkMode }) => {
  const grayTextClasses = `transition-colors duration-300 ease-in-out ${
    isDarkMode
      ? 'text-gray-400'
      : 'text-gray-600'
  }`;
  const borderClasses = isDarkMode ? 'border-[#efeeee]' : 'border-black';

  return (
    <footer className="w-full">
      {/* Top border */}
      <div className={`border-t ${borderClasses}`} />

      <div className="pt-2 pb-12">
        {/* Top line: 07 FOOTER and Copyright */}
        <div className={`flex justify-between items-center text-[10px] ${grayTextClasses}`}>
          <span>07 FOOTER</span>
          <span>© SURYANSH</span>
        </div>

        {/* Second line: Nav links */}
        <div className="flex justify-between items-center mt-16">
          <nav className="flex flex-wrap justify-start gap-x-8 gap-y-2 text-xl">
            <a href="#" className="transition-opacity duration-200">ABOUT ME</a>
            <a href="#" className="transition-opacity duration-200">PROJECTS</a>
            <a href="#" className="transition-opacity duration-200">SKILLS</a>
            <a href="#" className="transition-opacity duration-200">CONTACT</a>
          </nav>
        </div>
      </div>
      
      {/* Bottom border */}
      <div className={`border-t ${borderClasses}`} />
    </footer>
  );
};