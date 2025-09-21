import React, { useState, useRef, memo, useEffect } from 'react';
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
import './types.d.ts'; // Import for global type declarations

// Memoize components that do not need to re-render on every state change.
const MemoizedHeader = memo(Header);
const MemoizedLeftPanel = memo(LeftPanel);
const MemoizedProjectsLeftPanel = memo(ProjectsLeftPanel);
const MemoizedSkillsSection = memo(SkillsSection);
const MemoizedFooter = memo(Footer);

/**
 * The main application component.
 * Manages global state such as theme, cursor position, and view transitions.
 */
export default function App() {
  // Global cursor position and link hover state.
  const { position: cursorPosition, isHoveringLink } = useMousePosition();

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string>(PROJECTS_DATA[0].name);
  
  /**
   * Handles the theme toggle with a smooth circular reveal animation
   * using the View Transition API.
   * @param event - The mouse event from the button click.
   */
  const handleThemeToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    // Fallback for browsers that do not support the View Transition API.
    if (!document.startViewTransition) {
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
    const transition = document.startViewTransition(() => {
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