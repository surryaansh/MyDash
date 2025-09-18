
import React, { useRef, useEffect } from 'react';
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
import { LightningIcon } from '../icons/LightningIcon.tsx';

interface SkillsSectionProps {
  isDarkMode: boolean;
}

const skills = [
  { component: ReactSkillIcon },
  { component: NodeSkillIcon, transform: 'transform -translate-y-1.5' },
  { component: ExpressSkillIcon, transform: 'transform translate-y-px', size: 'w-28 h-28 md:w-[8.5rem] md:h-[8.5rem]' },
  { component: MongoSkillIcon, transform: 'transform -translate-y-px', size: 'w-28 h-28 md:w-[8.5rem] md:h-[8.5rem]' },
  { component: EthereumSkillIcon, transform: 'transform -translate-y-px', size: 'w-40 h-40 md:w-[10.5rem] md:h-[10.5rem]' },
  { component: SoliditySkillIcon, transform: 'transform -translate-y-px' },
  { component: MetamaskSkillIcon, transform: 'transform -translate-y-px', size: 'w-40 md:w-[10rem]' },
  { component: PolygonSkillIcon, transform: 'transform -translate-y-px', size: 'w-40 md:w-[10rem]' },
  { component: TypescriptSkillIcon, transform: 'transform -translate-y-px', size: 'w-40 h-40 md:w-[11rem] md:h-[11rem]' },
  { component: PythonSkillIcon },
  { component: LightningIcon, size: 'w-48 h-48 md:w-[14rem] md:h-[14rem]' },
];

export const SkillsSection: React.FC<SkillsSectionProps> = ({ isDarkMode }) => {
  const grayTextClasses = `transition-colors duration-300 ease-in-out ${
    isDarkMode
      ? 'text-gray-400'
      : 'text-gray-600'
  }`;
  const borderClasses = isDarkMode ? 'border-[#efeeee]' : 'border-black';
  const iconClasses = "w-24 h-24 md:w-[7.5rem] md:h-[7.5rem]";
  
  const scrollerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);
  const velocity = useRef(0);
  const lastMouseX = useRef(0);
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const scrollSpeed = 1.02; // Adjusted for new animation loop
    const friction = 0.95; // Damping factor for inertia

    const animate = () => {
      if (!isDragging.current) {
        if (Math.abs(velocity.current) > 0.1) {
          // Apply inertia
          scroller.scrollLeft -= velocity.current;
          velocity.current *= friction; // Apply friction
        } else {
          // Auto-scroll when idle
          velocity.current = 0;
          scroller.scrollLeft += scrollSpeed;
        }
      }
      
      // Handle seamless infinite loop
      const scrollableWidth = scroller.scrollWidth / 2;
      if (scroller.scrollLeft >= scrollableWidth) {
        scroller.scrollLeft -= scrollableWidth;
      } else if (scroller.scrollLeft < 0) {
        scroller.scrollLeft += scrollableWidth;
      }

      animationFrameId.current = requestAnimationFrame(animate);
    };

    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrollerRef.current) return;
    isDragging.current = true;
    velocity.current = 0; // Stop any ongoing animation
    startX.current = e.pageX;
    lastMouseX.current = e.pageX;
    scrollLeftStart.current = scrollerRef.current.scrollLeft;
    scrollerRef.current.style.cursor = 'grabbing';
    scrollerRef.current.style.userSelect = 'none';
  };

  const handleMouseUpOrLeave = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    if (scrollerRef.current) {
      scrollerRef.current.style.cursor = 'grab';
      scrollerRef.current.style.removeProperty('user-select');
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging.current || !scrollerRef.current) return;
    e.preventDefault();
    const mouseX = e.pageX;
    
    // Update scroll position directly for responsiveness
    const walk = mouseX - startX.current;
    scrollerRef.current.scrollLeft = scrollLeftStart.current - walk;
    
    // Calculate velocity for inertia
    velocity.current = mouseX - lastMouseX.current;
    lastMouseX.current = mouseX;
  };

  return (
    <section className={`border-t ${borderClasses}`}>
      <div className={`flex justify-between text-[10px] py-1 ${grayTextClasses}`}>
        <span>04 SKILLS</span>
        <span>/04</span>
      </div>
      <div
        ref={scrollerRef}
        className="overflow-x-auto no-scrollbar"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        onMouseMove={handleMouseMove}
        style={{ cursor: 'grab' }}
      >
        <div className="flex w-max">
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
