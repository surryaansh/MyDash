import React, { useState, useEffect } from 'react';

interface BlendedCursorProps {
  position: { x: number; y: number };
  isHoveringLink: boolean;
  isHoveringOrange: boolean;
  isDarkMode: boolean;
  isTransitioning: boolean;
}

export const BlendedCursor: React.FC<BlendedCursorProps> = ({ 
  position, 
  isHoveringLink, 
  isHoveringOrange,
  isDarkMode,
  isTransitioning 
}) => {
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
    transition: 'width 0.2s ease, height 0.2s ease, opacity 0.2s ease-in-out, background-color 0.2s ease, mix-blend-mode 0.1s ease',
    opacity: applyCursorFadeIn ? 1 : 0,
    mixBlendMode: isHoveringOrange ? 'normal' : 'difference',
    backgroundColor: isHoveringOrange
      ? (isDarkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.1)')
      : 'white',
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