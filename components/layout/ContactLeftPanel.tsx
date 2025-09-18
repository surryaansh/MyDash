
import React from 'react';
import { InteractiveFaceIcon } from '../icons/InteractiveFaceIcon.tsx';

interface ContactLeftPanelProps {
  isDarkMode: boolean;
  cursorPosition: { x: number; y: number };
}

export const ContactLeftPanel: React.FC<ContactLeftPanelProps> = ({ isDarkMode, cursorPosition }) => {
  const grayTextClasses = `transition-colors duration-300 ease-in-out ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`;

  return (
    <div className="w-full lg:w-1/2 flex flex-col lg:pr-6 py-8 lg:py-0">
      <div className={`flex justify-between text-[10px] py-2 ${grayTextClasses}`}>
        <span>05 CONTACT</span>
        <span>/05</span>
      </div>
      <div className="flex-1 flex flex-col justify-between pt-8 pb-12">
        <h2 className="text-4xl md:text-5xl font-light leading-tight">
          EAGER TO TAKE ON NEW CHALLENGES. FEEL FREE TO REACH OUT.
        </h2>
        <div className="relative self-start mt-12 max-w-[560px] w-full">
          <InteractiveFaceIcon cursorPosition={cursorPosition} isDarkMode={isDarkMode} />
        </div>
      </div>
    </div>
  );
};
