
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

// FIX: Add an explicit type to the `skills` array to include the optional `transform` property.
// This resolves the TypeScript error where `skill.transform` was accessed on a type where it was not defined.
const skills: Array<{
  component: React.FC<{ className?: string }>;
  size?: string;
  transform?: string;
}> = [
  { component: ReactSkillIcon },
  { component: NodeSkillIcon },
  { component: ExpressSkillIcon, size: 'w-28 h-28 md:w-[8.5rem] md:h-[8.5rem]' },
  { component: MongoSkillIcon, size: 'w-28 h-28 md:w-[8.5rem] md:h-[8.5rem]' },
  { component: EthereumSkillIcon, size: 'w-40 h-40 md:w-[10.5rem] md:h-[10.5rem]' },
  { component: SoliditySkillIcon },
  { component: MetamaskSkillIcon, size: 'w-36 md:w-[9rem]' },
  { component: PolygonSkillIcon, size: 'w-36 md:w-[9rem]' },
  { component: TypescriptSkillIcon, size: 'w-40 h-40 md:w-[11rem] md:h-[11rem]' },
  { component: PythonSkillIcon },
];

export const SkillsSection: React.FC<SkillsSectionProps> = ({ isDarkMode }) => {
  const grayTextClasses = `transition-colors duration-300 ease-in-out ${
    isDarkMode
      ? 'text-gray-400'
      : 'text-gray-600'
  }`;
  const borderClasses = isDarkMode ? 'border-[#efeeee]' : 'border-black';
  const iconClasses = "w-24 h-24 md:w-[7.5rem] md:h-[7.5rem]";

  return (
    <section className={`border-t ${borderClasses}`}>
      <div className={`flex justify-between text-[10px] py-2 ${grayTextClasses}`}>
        <span>04 SKILLS</span>
        <span>/04</span>
      </div>
      <div className="overflow-hidden py-6 flex items-center">
        <div className="flex w-max animate-scroll-left hover:[animation-play-state:paused] transform -translate-y-1">
          {[...skills, ...skills].map((skill, index) => (
            <div key={index} className="px-5 sm:px-7 md:px-10 flex-shrink-0 flex items-center justify-center">
              <skill.component className={`${skill.size || iconClasses} ${skill.transform || ''}`} />
            </div>
          ))}
        </div>
      </div>
      <div className={`border-t ${borderClasses}`} />
    </section>
  );
};