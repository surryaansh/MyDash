import React from 'react';
import { InteractiveFaceIcon } from '../icons/InteractiveFaceIcon.tsx';
import { ConnectMeCard } from '../ConnectMeCard.tsx';

interface ContactLeftPanelProps {
  isDarkMode: boolean;
  cursorPosition: { x: number; y: number };
  isConnectHovered?: boolean;
  onHoverChange?: (isHovered: boolean) => void;
}

export const ContactLeftPanel: React.FC<ContactLeftPanelProps> = ({ isDarkMode, cursorPosition, isConnectHovered = false, onHoverChange }) => {
  const grayTextClasses = `transition-colors duration-300 ease-in-out ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`;

  return (
    <div className="w-full lg:w-1/2 flex flex-col lg:pr-6 py-8 lg:py-0">
      <div className={`flex justify-between text-[10px] py-2 ${grayTextClasses}`}>
        <span>05 CONTACT</span>
        <span>/05</span>
      </div>
      <div className="flex-1 flex flex-col justify-between pt-4 lg:pt-8 pb-4 lg:pb-12">
        <h2 className="text-3xl md:text-5xl font-light leading-tight">
          EAGER TO TAKE ON NEW CHALLENGES. FEEL FREE TO REACH OUT.
        </h2>

        {/* Mobile-only Connect Me Card - Merged view */}
        <div className="block lg:hidden w-full my-6">
           {/* Reduced aspect ratio via height control relative to width or hardcoded class override */}
           <div className="w-full h-48 sm:h-64">
             <ConnectMeCard 
                isDarkMode={isDarkMode} 
                onHoverChange={onHoverChange} 
                className="w-full h-full rounded-none"
             />
           </div>
        </div>

        {/* Face Icon - Shifted to right on mobile */}
        <div className="relative self-end lg:self-start mt-4 lg:mt-12 max-w-[50%] lg:max-w-[560px] w-full">
          <InteractiveFaceIcon 
            cursorPosition={cursorPosition} 
            isDarkMode={isDarkMode} 
            isConnectHovered={isConnectHovered}
          />
        </div>
      </div>
    </div>
  );
};