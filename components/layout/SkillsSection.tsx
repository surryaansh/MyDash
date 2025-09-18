import React from 'react';
import { ReactSkillIcon } from '../icons/skills/ReactSkillIcon.tsx';
import { NodeSkillIcon } from '../icons/skills/NodeSkillIcon.tsx';
import { ExpressSkillIcon } from '../icons/skills/ExpressSkillIcon.tsx';
import { MongoSkillIcon } from '../icons/skills/MongoSkillIcon.tsx';
import { EthereumSkillIcon } from '../icons/skills/EthereumSkillIcon.tsx';
import { SoliditySkillIcon } from '../icons/skills/SoliditySkillIcon.tsx';
import { MetamaskSkillIcon } from '../icons/skills/MetamaskSkillIcon.tsx';
import { PolygonSkillIcon } from '../icons/skills/PolygonSkillIcon.tsx';
import { TypescriptSkillIcon } from '../icons/skills/TypescriptSkillIcon.tsx';
import { PythonSkillIcon } from '../icons/skills/PythonSkillIcon.tsx';

interface SkillsSectionProps {
  isDarkMode: boolean;
}

const skills: Array<{
  component: React.FC<{ className?: string }>;
}> = [
  { component: ReactSkillIcon },
  { component: NodeSkillIcon },
  { component: ExpressSkillIcon },
  { component: MongoSkillIcon },
  { component: EthereumSkillIcon },
  { component: SoliditySkillIcon },
  { component: MetamaskSkillIcon },
  { component: PolygonSkillIcon },
  { component: TypescriptSkillIcon },
  { component: PythonSkillIcon },
];

export const SkillsSection: React.FC<SkillsSectionProps> = ({ isDarkMode }) => {
  const grayTextClasses = `transition-colors duration-300 ease-in-out ${
    isDarkMode
      ? 'text-gray-400'
      : 'text-gray-600'
  }`;
  const borderClasses = isDarkMode ? 'border-[#efeeee]' : 'border-black';
  const iconClasses = "h-6 md:h-8 w-auto";

  return (
    <section className={`border-t ${borderClasses}`}>
      <div className={`flex justify-between text-[10px] py-2 ${grayTextClasses}`}>
        <span>04 SKILLS</span>
        <span>/04</span>
      </div>
      <div className="overflow-hidden flex items-center py-1">
        <div className="flex w-max animate-scroll-left hover:[animation-play-state:paused]">
          {[...skills, ...skills].map((skill, index) => (
            <div key={index} className="px-5 sm:px-7 md:px-10 flex-shrink-0 flex items-center justify-center">
              <skill.component className={iconClasses} />
            </div>
          ))}
        </div>
      </div>
      <div className={`border-t ${borderClasses}`} />
    </section>
  );
};
