import React from 'react';
import { LightningIcon } from '../icons/LightningIcon.tsx';
import { ReactIcon } from '../icons/ReactIcon.tsx';
import { NodeJsIcon } from '../icons/NodeJsIcon.tsx';
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
    <div className="w-full lg:w-1/2 flex flex-col lg:pr-6 pb-8 lg:pb-0">
      <div className={`flex justify-between text-[10px] py-2 ${grayTextClasses}`}>
        <span>00 TITLE</span>
        <span>/00</span>
      </div>
      <div className="flex-1 flex flex-col pt-8 pb-12">
        {/* Top content block */}
        <div className="mb-auto">
          <h1 className="text-4xl md:text-5xl font-light leading-tight mb-6 text-center lg:text-left">
            FROM MERN TO WEB3 <br /> ALWAYS EXPLORING.
          </h1>

          {/* Emoji Row */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-10">
            <LightningIcon className="w-6 h-6 transition-transform duration-300 ease-in-out hover:scale-125" />
            <ReactIcon className="w-10 h-10 transition-transform duration-300 ease-in-out hover:scale-125" />
            <LightningIcon className="w-6 h-6 transition-transform duration-300 ease-in-out hover:scale-125" />
            <NodeJsIcon className="w-10 h-10 transition-transform duration-300 ease-in-out hover:scale-125" />
            <LightningIcon className="w-6 h-6 transition-transform duration-300 ease-in-out hover:scale-125" />
            <EthIcon className="w-[2.625rem] h-[2.625rem] transition-transform duration-300 ease-in-out hover:scale-125" />
          </div>
        </div>
        
        {/* Bottom content block */}
        <div className="flex justify-center lg:justify-end mb-12">
          <p 
            className={`max-w-md leading-relaxed text-center lg:text-left ${grayTextClasses}`}
            style={{ fontSize: '1.0153rem' }}
          >
            Not just another portfolio, this is my journey in code. From MERN apps to blockchain platforms powered by smart contracts, this journey is about continuous growth, learning, and building technology with purpose.
          </p>
        </div>
      </div>
    </div>
  );
};