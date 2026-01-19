// constants/skills.ts

import { ReactSkillIcon } from '@/components/icons/skills/ReactSkillIcon.tsx';
import { NodeSkillIcon } from '@/components/icons/skills/NodeSkillIcon.tsx';
import { ExpressSkillIcon } from '@/components/icons/skills/ExpressSkillIcon.tsx';
import { MongoSkillIcon } from '@/components/icons/skills/MongoSkillIcon.tsx';
import { TailwindSkillIcon } from '@/components/icons/skills/TailwindSkillIcon.tsx';
import { PostgresSkillIcon } from '@/components/icons/skills/PostgresSkillIcon.tsx';
import { FirebaseSkillIcon } from '@/components/icons/skills/FirebaseSkillIcon.tsx';
import { EthereumSkillIcon } from '@/components/icons/skills/EthereumSkillIcon.tsx';
import { SoliditySkillIcon } from '@/components/icons/skills/SoliditySkillIcon.tsx';
import { MetamaskSkillIcon } from '@/components/icons/skills/MetamaskSkillIcon.tsx';
import { GitSkillIcon } from '@/components/icons/skills/GitSkillIcon.tsx';
import { AwsSkillIcon } from '@/components/icons/skills/AwsSkillIcon.tsx';
import { DockerSkillIcon } from '@/components/icons/skills/DockerSkillIcon.tsx';
import { PythonSkillIcon } from '@/components/icons/skills/PythonSkillIcon.tsx';
import { TypescriptSkillIcon } from '@/components/icons/skills/TypescriptSkillIcon.tsx';
import { NextJsSkillIcon } from '@/components/icons/skills/NextJsSkillIcon.tsx';

/**
 * Defines the list of skills to be displayed in the infinite scrolling section.
 * Each object contains the component to render and optional style overrides.
 */
export const SKILLS = [
  { component: ReactSkillIcon },
  { component: NodeSkillIcon, transform: 'transform -translate-y-1.5' },
  { component: ExpressSkillIcon, transform: 'transform translate-y-px', size: 'w-28 h-28 md:w-[8.5rem] md:h-[8.5rem]' },
  { 
    component: TailwindSkillIcon, 
    transform: 'transform -translate-y-[1%]', 
    size: 'w-32 md:w-[10rem]' 
  },
  { component: MongoSkillIcon, transform: 'transform -translate-y-px', size: 'w-28 h-28 md:w-[8.5rem] md:h-[8.5rem]' },
  {
    component: PostgresSkillIcon,
    transform: 'transform translate-y-[1%]',
    size: 'w-36 md:w-[11.5rem]',
    margin: 'mr-[2.45rem] sm:mr-[3.43rem] md:mr-[4.9rem]'
  },
  {
    component: FirebaseSkillIcon,
    size: 'w-[6.949rem] md:w-[8.844rem]',
    transform: 'transform -translate-y-[4%] opacity-80'
  },
  {
    component: EthereumSkillIcon,
    transform: 'transform -translate-y-px',
    size: 'w-40 h-40 md:w-[10.5rem] md:h-[10.5rem]',
    margin: 'mr-8 sm:mr-10 md:mr-12'
  },
  { component: SoliditySkillIcon, transform: 'transform -translate-y-px' },
  { component: MetamaskSkillIcon, transform: 'transform -translate-y-px', size: 'w-40 md:w-[10rem]' },
  { 
    component: GitSkillIcon, 
    transform: 'transform translate-y-[2%] opacity-80', 
    size: 'w-[4.374rem] md:w-[5.103rem]',
    margin: 'mr-[2.85rem] sm:mr-[3.95rem] md:mr-[5.6rem]'
  },
  { 
    component: AwsSkillIcon, 
    transform: 'transform translate-y-[1%]', 
    size: 'w-[3.6rem] md:w-[4.5rem]',
    margin: 'mr-[2.9rem] sm:mr-[4.1rem] md:mr-[5.8rem]'
  },
  { 
    component: DockerSkillIcon, 
    transform: 'transform translate-y-[1%]', 
    size: 'w-32 md:w-[10rem]',
    margin: 'mr-[3.1rem] sm:mr-[4.3rem] md:mr-[6.1rem]'
  },
  { 
    component: PythonSkillIcon, 
    transform: 'transform -translate-y-px', 
    size: 'w-[7.82rem] md:w-[7.82rem]' 
  },
  { 
    component: TypescriptSkillIcon, 
    transform: 'transform translate-y-[1%]', 
    size: 'w-40 h-40 md:w-[11rem] md:h-[11rem]',
    margin: 'mr-5 sm:mr-7 md:mr-10'
  },
  { 
    component: NextJsSkillIcon, 
    transform: '', 
    size: 'w-32 md:w-[9.5rem] h-8 md:h-[2.4rem]'
  },
];
