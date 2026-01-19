// constants/skills.ts

import { ReactSkillIcon } from '../components/icons/skills/ReactSkillIcon.tsx';
import { NodeSkillIcon } from '../components/icons/skills/NodeSkillIcon.tsx';
import { ExpressSkillIcon } from '../components/icons/skills/ExpressSkillIcon.tsx';
import { MongoSkillIcon } from '../components/icons/skills/MongoSkillIcon.tsx';
import { EthereumSkillIcon } from '../components/icons/skills/EthereumSkillIcon.tsx';
import { SoliditySkillIcon } from '../components/icons/skills/SoliditySkillIcon.tsx';
import { MetamaskSkillIcon } from '../components/icons/skills/MetamaskSkillIcon.tsx';
import { PolygonSkillIcon } from '../components/icons/skills/PolygonSkillIcon.tsx';
import { PythonSkillIcon } from '../components/icons/skills/PythonSkillIcon.tsx';
import { TypescriptSkillIcon } from '../components/icons/skills/TypescriptSkillIcon.tsx';
import { NextJsSkillIcon } from '../components/icons/skills/NextJsSkillIcon.tsx';

/**
 * Defines the list of skills to be displayed in the infinite scrolling section.
 * Each object contains the component to render and optional style overrides.
 */
export const SKILLS = [
  { component: ReactSkillIcon },
  { component: NodeSkillIcon, transform: 'transform -translate-y-1.5' },
  { component: ExpressSkillIcon, transform: 'transform translate-y-px', size: 'w-28 h-28 md:w-[8.5rem] md:h-[8.5rem]' },
  { component: MongoSkillIcon, transform: 'transform -translate-y-px', size: 'w-28 h-28 md:w-[8.5rem] md:h-[8.5rem]' },
  {
    component: EthereumSkillIcon,
    transform: 'transform -translate-y-px',
    size: 'w-40 h-40 md:w-[10.5rem] md:h-[10.5rem]',
    margin: 'mr-8 sm:mr-10 md:mr-12' // Custom smaller margin
  },
  { component: SoliditySkillIcon, transform: 'transform -translate-y-px' },
  { component: MetamaskSkillIcon, transform: 'transform -translate-y-px', size: 'w-40 md:w-[10rem]' },
  { component: PolygonSkillIcon, transform: 'transform -translate-y-px', size: 'w-40 md:w-[10rem]' },
  { component: PythonSkillIcon, transform: 'transform -translate-y-px', size: 'w-[8.5rem] md:w-[8.5rem]' },
  { component: TypescriptSkillIcon, transform: 'transform -translate-y-px', size: 'w-40 h-40 md:w-[11rem] md:h-[11rem]', margin: 'mr-6 sm:mr-8 md:mr-10' },
  { component: NextJsSkillIcon, transform: 'transform translate-y-px', size: 'w-44 md:w-[13rem] h-24 md:h-[7.5rem]' },
];
