import React, { useState, useEffect } from 'react';
import { LightningIcon } from './components/icons/LightningIcon.tsx';
import { ReactIcon } from './components/icons/ReactIcon.tsx';
import { NodeJsIcon } from './components/icons/NodeJsIcon.tsx';
import { EthIcon } from './components/icons/EthIcon.tsx';
import { DarkModeToggle } from './components/DarkModeToggle.tsx';
import { FilledLightningIcon } from './components/icons/FilledLightningIcon.tsx';

// The ViewTransition API is not yet in standard TS libs, so we declare it here.
declare global {
  interface Document {
    startViewTransition?(callback: () => void): ViewTransition;
  }

  interface ViewTransition {
    ready: Promise<void>;
  }
}

export default function App() {
  const [cursorPosition, setCursorPosition] = useState({ x: -100, y: -100 });
  const [isHoveringLink, setIsHoveringLink] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [applyCursorFadeIn, setApplyCursorFadeIn] = useState(false);

  useEffect(() => {
    // This effect handles the fade-in animation for the custom cursor
    // when it reappears after a theme transition.
    if (!isTransitioning) {
      // We use a short timeout to ensure the cursor element is mounted with
      // initial opacity 0 before we apply the state to transition it to opacity 1.
      const timer = setTimeout(() => {
        setApplyCursorFadeIn(true);
      }, 10); // A minimal delay is enough for the DOM to update.
      return () => {
        clearTimeout(timer);
        setApplyCursorFadeIn(false); // Reset on cleanup
      };
    }
  }, [isTransitioning]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setCursorPosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    const interactiveElements = document.querySelectorAll('a, button');
    
    const handleLinkEnter = () => setIsHoveringLink(true);
    const handleLinkLeave = () => setIsHoveringLink(false);

    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleLinkEnter);
      el.addEventListener('mouseleave', handleLinkLeave);
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleLinkEnter);
        el.removeEventListener('mouseleave', handleLinkLeave);
      });
    };
  }, []);

  const handleThemeToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    // Fallback for browsers that don't support the API
    if (!document.startViewTransition) {
      setIsDarkMode(!isDarkMode);
      return;
    }

    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    // Animate from the center of the button
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    // Calculate the radius to cover the entire screen
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    setIsTransitioning(true);
    // Start the transition
    const transition = document.startViewTransition(() => {
      setIsDarkMode(prev => !prev);
    });

    // Wait for the new DOM to be ready
    transition.ready.then(() => {
      // Animate the reveal effect
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
          // Specify the pseudo-element to animate
          pseudoElement: '::view-transition-new(root)',
        }
      );
      // When animation is done, re-enable custom cursor
      animation.finished.then(() => {
        setIsTransitioning(false);
      });
    });
  };

  const cursorSize = isHoveringLink ? 60 : 40;

  const grayTextClasses = `transition-colors duration-300 ease-in-out ${
    isDarkMode
      ? 'text-gray-400 hover:text-[#efeeee]'
      : 'text-gray-600 hover:text-black'
  }`;

  return (
    <div 
      className={`min-h-screen flex flex-col font-sans px-16 pt-8 ${isDarkMode ? 'bg-black text-[#efeeee]' : 'bg-[#efeeee] text-black'}`}
      style={{ cursor: isTransitioning ? 'auto' : 'none' }}
      >
        {!isTransitioning && (
            <div
                style={{
                    position: 'fixed',
                    top: cursorPosition.y,
                    left: cursorPosition.x,
                    width: `${cursorSize}px`,
                    height: `${cursorSize}px`,
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 9999,
                    transition: 'width 0.2s ease, height 0.2s ease, opacity 0.5s ease-in-out',
                    backgroundColor: 'white',
                    mixBlendMode: 'difference',
                    opacity: applyCursorFadeIn ? 1 : 0,
                }}
                aria-hidden="true"
            />
        )}
      {/* Top Bar */}
      <header className={`flex justify-between items-center py-4 border-b ${isDarkMode ? 'border-[#efeeee]' : 'border-black'}`}>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <LightningIcon className="h-6 text-[#FF4500]" />
            <span className="text-xl font-extrabold italic text-[#FF4500] tracking-wide">SURYANSH // SINGH</span>
          </div>
          <DarkModeToggle isDarkMode={isDarkMode} toggleDarkMode={handleThemeToggle} />
        </div>
        <nav className="flex gap-8 text-lg">
          <a href="#" className="transition-opacity duration-200 hover:opacity-70">PROJECTS</a>
          <a href="#" className="transition-opacity duration-200 hover:opacity-70">SKILLS</a>
          <a href="#" className="transition-opacity duration-200 hover:opacity-70">LET'S CONNECT</a>
        </nav>
      </header>

      {/* Main Content */}
      <main className={`flex flex-1 divide-x ${isDarkMode ? 'divide-[#efeeee]' : 'divide-black'}`}>
        {/* Left Side */}
        <div className="w-1/2 flex flex-col pr-8">
          <div className={`flex justify-between text-xs py-4 ${grayTextClasses}`}>
            <span>00 TITLE</span>
            <span>/00</span>
          </div>
          <div className="flex-1 flex flex-col justify-between py-12">
            {/* Top content block */}
            <div>
              <h1 className="text-5xl font-light leading-tight mb-6 text-left">
                FROM MERN TO WEB3 <br /> ALWAYS EXPLORING.
              </h1>

              {/* Emoji Row */}
              <div className="flex items-center justify-start gap-4 mb-10">
                <LightningIcon className="w-6 h-6 transition-transform duration-300 ease-in-out hover:scale-125" />
                <ReactIcon className="w-10 h-10 transition-transform duration-300 ease-in-out hover:scale-125" />
                <LightningIcon className="w-6 h-6 transition-transform duration-300 ease-in-out hover:scale-125" />
                <NodeJsIcon className="w-10 h-10 transition-transform duration-300 ease-in-out hover:scale-125" />
                <LightningIcon className="w-6 h-6 transition-transform duration-300 ease-in-out hover:scale-125" />
                <EthIcon className="w-[2.625rem] h-[2.625rem] transition-transform duration-300 ease-in-out hover:scale-125" />
              </div>
            </div>
            
            {/* Bottom content block */}
            <div className="flex justify-end">
              <p className={`max-w-md text-sm leading- relaxed text-left ${grayTextClasses}`}>
                Not just another portfolio, this is my journey in code. From MERN apps to blockchain platforms powered by smart contracts, this journey is about continuous growth, learning, and building technology with purpose.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-1/2 flex flex-col pl-8">
          <div className={`flex justify-between text-xs py-4 ${grayTextClasses}`}>
            <span>01 VISUAL</span>
            <span>/01</span>
          </div>
          <div className="flex-1 relative py-12">
            <img 
                src="https://i.ibb.co/ZnD3MfH/vaporwave-david.png"
                alt="Vaporwave style statue of David wearing a glowing crown and glasses."
                className="w-full h-full object-cover"
            />
            <FilledLightningIcon 
              className="absolute bottom-12 right-12 w-40 h-40 text-[#FF4500]"
              style={{ mixBlendMode: 'normal' }}
            />
          </div>
        </div>
      </main>
    </div>
  );
}