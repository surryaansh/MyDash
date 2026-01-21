
import React, { useState, memo } from 'react';
import { Header } from './components/layout/Header.tsx';
import { LeftPanel } from './components/layout/LeftPanel.tsx';
import { RightPanel } from './components/layout/RightPanel.tsx';
import { BlendedCursor } from './components/BlendedCursor.tsx';
import { ProjectsLeftPanel } from './components/layout/ProjectsLeftPanel.tsx';
import { ProjectsRightPanel } from './components/layout/ProjectsRightPanel.tsx';
import { SkillsSection } from './components/layout/SkillsSection.tsx';
import { ContactSection } from './components/layout/ContactSection.tsx';
import { Footer } from './components/layout/Footer.tsx';
import { useMousePosition } from './hooks/useMousePosition.ts';
import { PROJECTS_DATA } from './constants/projects.ts';

const MemoizedHeader = memo(Header);
const MemoizedLeftPanel = memo(LeftPanel);
const MemoizedProjectsLeftPanel = memo(ProjectsLeftPanel);
const MemoizedSkillsSection = memo(SkillsSection);
const MemoizedFooter = memo(Footer);

export default function App() {
  const { position: cursorPosition, isHoveringLink } = useMousePosition();

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string>(PROJECTS_DATA[0].name);
  
  const handleThemeToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    // Local type cast to avoid needing types.d.ts
    const doc = document as any;

    if (!doc.startViewTransition) {
      setIsDarkMode(!isDarkMode);
      return;
    }

    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    setIsTransitioning(true);
    const transition = doc.startViewTransition(() => {
      setIsDarkMode(prev => !prev);
    });

    transition.ready.then(() => {
      const animation = document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 700,
          easing: 'ease-in-out',
          pseudoElement: '::view-transition-new(root)',
        }
      );
      animation.onfinish = () => setIsTransitioning(false);
    });
  };

  const themeClasses = isDarkMode ? 'bg-black text-[#efeeee]' : 'bg-[#efeeee] text-black';
  const borderClasses = isDarkMode ? 'divide-[#efeeee] border-[#efeeee]' : 'divide-black border-black';
  
  return (
    <div 
      className={`min-h-screen flex flex-col font-sans px-4 md:px-16 pt-8 ${themeClasses}`}
      style={{ cursor: isTransitioning ? 'auto' : 'none' }}
    >
      <BlendedCursor 
        position={cursorPosition} 
        isHoveringLink={isHoveringLink} 
      />
      
      <MemoizedHeader isDarkMode={isDarkMode} toggleDarkMode={handleThemeToggle} />

      <main className="flex-1 flex flex-col">
        <section id="about" className={`flex flex-col lg:flex-row flex-1 divide-y lg:divide-y-0 lg:divide-x ${borderClasses}`}>
          <MemoizedLeftPanel isDarkMode={isDarkMode} />
          <RightPanel isDarkMode={isDarkMode} />
        </section>

        <section id="projects" className={`flex flex-col lg:grid lg:grid-cols-3 flex-1 border-t min-h-[60vh] divide-y lg:divide-y-0 ${borderClasses}`}>
            <MemoizedProjectsLeftPanel 
              isDarkMode={isDarkMode}
              selectedProject={selectedProject}
              setSelectedProject={setSelectedProject}
            />
            <ProjectsRightPanel
              isDarkMode={isDarkMode} 
              selectedProject={selectedProject}
            />
        </section>
        
        <MemoizedSkillsSection isDarkMode={isDarkMode} />

        <ContactSection 
          isDarkMode={isDarkMode} 
          cursorPosition={cursorPosition}
        />
        
        <MemoizedFooter isDarkMode={isDarkMode} />
      </main>
    </div>
  );
}
