import React from 'react';

interface ContactRightPanelProps {
  isDarkMode: boolean;
}

export const ContactRightPanel: React.FC<ContactRightPanelProps> = ({ isDarkMode }) => {
  const grayTextClasses = `transition-colors duration-300 ease-in-out ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`;
  const buttonClasses = `px-10 py-5 md:px-12 md:py-6 rounded-full text-lg md:text-xl font-bold transition-all duration-300 hover:scale-105 ${
    isDarkMode 
      ? 'bg-[#efeeee] text-black hover:bg-[#FF4500] hover:text-white' 
      : 'bg-black text-[#efeeee] hover:bg-[#FF4500] hover:text-white'
  }`;

  return (
    <div className="w-full lg:w-1/2 flex flex-col lg:pl-6 py-8 lg:py-0">
      <div className={`flex justify-between text-[10px] py-2 ${grayTextClasses}`}>
        <span>06 CONTACT</span>
        <span>/06</span>
      </div>
      <div className="flex-1 flex items-center justify-center pb-16">
        <a 
          href="mailto:suryanshs1804@gmail.com" 
          className={buttonClasses}
        >
            LET'S CONNECT
        </a>
      </div>
    </div>
  );
};