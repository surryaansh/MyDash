import React from 'react';

interface ContactRightPanelProps {
  isDarkMode: boolean;
}

export const ContactRightPanel: React.FC<ContactRightPanelProps> = ({ isDarkMode }) => {
  const grayTextClasses = `transition-colors duration-300 ease-in-out ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`;
  const buttonClasses = `px-8 py-4 md:px-10 md:py-5 rounded-full text-base md:text-lg font-bold transition-colors duration-300 ease-in-out hover:bg-[#FF4500] ${
    isDarkMode ? 'bg-[#efeeee] text-black' : 'bg-black text-[#efeeee]'
  }`;

  return (
    <div className="w-full lg:w-1/2 flex flex-col lg:pl-6 py-8 lg:py-0">
      <div className={`flex justify-between text-[10px] py-2 ${grayTextClasses}`}>
        <span>06 CONTACT</span>
        <span>/06</span>
      </div>
      <div className="flex-1 relative overflow-hidden pb-12 no-cursor-invert">
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
};
