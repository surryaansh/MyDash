
import React from 'react';
import { useHorizontalDragScroll } from '../../hooks/useHorizontalDragScroll.ts';
import { SKILLS } from '../../constants/skills.ts';

interface SkillsSectionProps {
  isDarkMode: boolean;
}

/**
 * A section that displays a horizontally-scrolling carousel of skill icons.
 * Features an "infinite" scroll effect and drag-to-scroll functionality.
 */
export const SkillsSection: React.FC<SkillsSectionProps> = ({ isDarkMode }) => {
  const { scrollerRef, eventHandlers } = useHorizontalDragScroll();

  const grayTextClasses = `transition-colors duration-300 ease-in-out ${
    isDarkMode ? 'text-gray-400' : 'text-gray-600'
  }`;
  const borderClasses = isDarkMode ? 'border-[#efeeee]' : 'border-black';
  const iconClasses = "w-24 h-24 md:w-[7.5rem] md:h-[7.5rem]";
  const defaultMargin = 'mr-10 sm:mr-14 md:mr-20';
  
  // To create a seamless infinite scroll, we render the list of skills twice.
  // When the scroll reaches the end of the first list, it's reset to the beginning.
  const duplicatedSkills = [...SKILLS, ...SKILLS];

  return (
    <section id="skills" className={`border-t ${borderClasses}`}>
      <div className={`flex justify-between text-[10px] py-2 ${grayTextClasses}`}>
        <span>03 SKILLS</span>
        <span>/03</span>
      </div>
      <div
        ref={scrollerRef}
        className="overflow-x-auto no-scrollbar px-5 sm:px-7 md:px-10 cursor-none select-none"
        role="region"
        aria-label="Technology Skills Carousel"
        {...eventHandlers}
      >
        <div className="flex w-max items-center transform -translate-y-2 pointer-events-none" role="list">
          {duplicatedSkills.map((skill, index) => (
            <div 
              key={index} 
              className={`flex-shrink-0 flex items-center justify-center ${skill.margin || defaultMargin}`}
              role="listitem"
              aria-label="Skill icon"
            >
              <skill.component className={`${skill.size || iconClasses} ${skill.transform || ''}`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
