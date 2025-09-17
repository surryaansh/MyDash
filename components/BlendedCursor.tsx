import React, { useState, useEffect } from 'react';

interface BlendedCursorProps {
  position: { x: number; y: number };
  isHoveringLink: boolean;
  isTransitioning: boolean;
  isHoveringOrange: boolean;
  isDarkMode: boolean;
}

export const BlendedCursor: React.FC<BlendedCursorProps> = ({ position, isHoveringLink, isTransitioning, isHoveringOrange, isDarkMode }) => {
  const [applyCursorFadeIn, setApplyCursorFadeIn] = useState(false);

  useEffect(() => {
    // Handles the fade-in animation for the custom cursor
    // when it reappears after a theme transition.
    if (!isTransitioning) {
      const timer = setTimeout(() => {
        setApplyCursorFadeIn(true);
      }, 10);
      return () => {
        clearTimeout(timer);
        setApplyCursorFadeIn(false);
      };
    }
  }, [isTransitioning]);

  if (isTransitioning) {
    return null;
  }

  const borderColor = isDarkMode ? '#efeeee' : 'black';

  const cursorStyle: React.CSSProperties = {
    position: 'fixed',
    top: position.y,
    left: position.x,
    width: `${isHoveringLink ? 60 : 40}px`,
    height: `${isHoveringLink ? 60 : 40}px`,
    borderRadius: '50%',
    pointerEvents: 'none',
    transform: 'translate(-50%, -50%)',
    zIndex: 9999,
    transition: 'width 0.2s ease, height 0.2s ease, opacity 0.5s ease-in-out, background-color 0.2s ease, border-color 0.2s ease',
    opacity: applyCursorFadeIn ? 1 : 0,
    boxSizing: 'border-box', // Ensure border doesn't add to the element's size
    
    // Conditional styles for hovering orange elements
    mixBlendMode: isHoveringOrange ? 'normal' : 'difference',
    backgroundColor: isHoveringOrange ? 'transparent' : 'white',
    border: `2px solid ${isHoveringOrange ? borderColor : 'transparent'}`,
  };

  return (
    <div className="hidden lg:block">
      <div
        style={cursorStyle}
        aria-hidden="true"
      />
    </div>
  );
};
