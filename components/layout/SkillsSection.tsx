import React from 'react';
import { ReactSkillIcon } from '../icons/skills/ReactSkillIcon.tsx';
import { NodeSkillIcon } from '../icons/skills/NodeSkillIcon.tsx';
import { ExpressSkillIcon } from '../icons/skills/ExpressSkillIcon.tsx';
import { MongoSkillIcon } from '../icons/skills/MongoSkillIcon.tsx';
import { EthereumSkillIcon } from '../icons/skills/EthereumSkillIcon.tsx';
import { SoliditySkillIcon } from '../icons/skills/SoliditySkillIcon.tsx';
import { TypescriptSkillIcon } from '../icons/skills/TypescriptSkillIcon.tsx';
import { TailwindSkillIcon } from '../icons/skills/TailwindSkillIcon.tsx';
import { PythonSkillIcon } from '../icons/skills/PythonSkillIcon.tsx';

interface SkillsSectionProps {
  isDarkMode: boolean;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ isDarkMode }) => {
  const grayTextClasses = `transition-colors duration-300 ease-in-out ${
    isDarkMode
      ? 'text-gray-400'
      : 'text-gray-600'
  }`;
  const borderClasses = isDarkMode ? 'border-[#efeeee]' : 'border-black';
  const iconClasses = "w-16 h-16 md:w-20 md:h-20 transition-transform duration-300 ease-in-out hover:scale-110";

  return (
    <section className={`border-t ${borderClasses}`}>
      <div className={`flex justify-between text-[10px] py-2 ${grayTextClasses}`}>
        <span>04 SKILLS</span>
        <span>/04</span>
      </div>
      <div className="flex-1 flex flex-wrap items-center justify-center gap-x-12 sm:gap-x-16 md:gap-x-20 gap-y-8 min-h-[20vh] py-12">
        <ReactSkillIcon className={iconClasses} />
        <NodeSkillIcon className={iconClasses} />
        <ExpressSkillIcon className={iconClasses} />
        <MongoSkillIcon className={iconClasses} />
        <EthereumSkillIcon className={iconClasses} />
        <SoliditySkillIcon className={iconClasses} />
        <TypescriptSkillIcon className={iconClasses} />
        <TailwindSkillIcon className={iconClasses} />
        <PythonSkillIcon className={iconClasses} />
      </div>
      <div className={`border-t ${borderClasses}`} />
    </section>
  );
};