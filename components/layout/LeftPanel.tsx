
import React from 'react';
import { LightningIcon } from '../icons/LightningIcon.tsx';
import { ReactIcon } from '../icons/ReactIcon.tsx';
import { EthIcon } from '../icons/EthIcon.tsx';

interface LeftPanelProps {
  isDarkMode: boolean;
}

export const LeftPanel: React.FC<LeftPanelProps> = ({ isDarkMode }) => {
  const grayTextClasses = `transition-colors duration-300 ease-in-out ${
    isDarkMode
      ? 'text-gray-400'
      : 'text-gray-600'
  }`;

  return (
    <div className="w-full lg:w-1/2 flex flex-col lg:pr-6 pb-2 lg:pb-0">
      <div className={`flex justify-between text-[10px] py-2 ${grayTextClasses}`}>
        <span>00 TITLE</span>
        <span>/00</span>
      </div>
      <div className="flex-1 flex flex-col pt-8 lg:pb-12">
        
        {/* Mobile: Row Layout | Desktop: Stacked */}
        <div className="mb-auto flex flex-row lg:flex-col justify-between items-start lg:items-start gap-4 lg:gap-0">
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-light leading-tight mb-0 lg:mb-6 text-left max-w-[60%] lg:max-w-full">
            FROM MERN TO WEB3, ALWAYS <br /> EXPLORING.
          </h1>

          {/* 
             Icon Grid:
             Mobile: 2x2 Grid aligned to top-right of headline
             Desktop: Flex row below headline
          */}
          <div className="grid grid-cols-2 gap-2 lg:flex lg:flex-wrap lg:items-center lg:justify-start lg:gap-4 lg:mb-10 flex-shrink-0">
            {/* Row 1 / Item 1 */}
            <LightningIcon className="w-8 h-8 lg:w-6 lg:h-6 transition-transform duration-300 ease-in-out hover:scale-125" />
            {/* Row 1 / Item 2 */}
            <ReactIcon className="w-8 h-8 lg:w-10 lg:h-10 transition-transform duration-300 ease-in-out hover:scale-125" />
            
            {/* Row 2 / Item 1 */}
            <EthIcon className="w-8 h-8 lg:w-[2.625rem] lg:h-[2.625rem] transition-transform duration-300 ease-in-out hover:scale-125" />
            {/* Row 2 / Item 2 */}
            <LightningIcon className="w-8 h-8 lg:w-6 lg:h-6 transition-transform duration-300 ease-in-out hover:scale-125" />
          </div>
        </div>
        
        {/* Bottom content block */}
        <div className="flex justify-start lg:justify-end mb-4 lg:mb-12 mt-6 lg:mt-0">
          <p 
            className={`max-w-md leading-relaxed text-left ${grayTextClasses}`}
            style={{ fontSize: '1.0153rem' }}
          >
            {/* Mobile Short Description */}
            <span className="block md:hidden">
              Building scalable web architectures and decentralized applications with a focus on performance.
            </span>
            {/* Desktop Full Description */}
            <span className="hidden md:block">
              Not just another portfolio, this is my journey in code. From MERN apps to blockchain platforms powered by smart contracts, this journey is about continuous growth, learning, and building technology with purpose.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
