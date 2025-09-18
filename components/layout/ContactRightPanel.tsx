
import React from 'react';

interface ContactRightPanelProps {
  isDarkMode: boolean;
}

export const ContactRightPanel: React.FC<ContactRightPanelProps> = ({ isDarkMode }) => {
  const grayTextClasses = `transition-colors duration-300 ease-in-out ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`;
  const buttonClasses = `px-10 py-5 md:px-12 md:py-6 rounded-full text-lg md:text-xl font-bold transition-transform duration-200 hover:scale-105 ${
    isDarkMode ? 'bg-[#efeeee] text-black' : 'bg-black text-[#efeeee]'
  }`;

  return (
    <div className="w-full lg:w-1/2 flex flex-col lg:pl-6 py-8 lg:py-0">
      <div className={`flex justify-between text-[10px] py-2 ${grayTextClasses}`}>
        <span>06 CONTACT</span>
        <span>/06</span>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <div className="flex items-center gap-8">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-full"></div>
            <button className={buttonClasses}>
                LET'S CONNECT
            </button>
        </div>
      </div>
    </div>
  );
};
