import React, { useState, useEffect } from 'react';

interface BlendedCursorProps {
  position: { x: number; y: number };
  isHoveringLink: boolean;
  isTransitioning: boolean;
  isScrolling: boolean;
}

export const BlendedCursor: React.FC<BlendedCursorProps> = ({ position, isHoveringLink, isTransitioning, isScrolling }) => {
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

  return (
    <div className="hidden lg:block">
      <div
        style={{
          position: 'fixed',
          top: position.y,
          left: position.x,
          width: `${isHoveringLink ? 60 : 40}px`,
          height: `${isHoveringLink ? 60 : 40}px`,
          borderRadius: '50%',
          pointerEvents: 'none',
          transform: 'translate(-50%, -50%)',
          zIndex: 9999,
          transition: 'width 0.2s ease, height 0.2s ease, opacity 0.5s ease-in-out, background-color 0.2s ease',
          opacity: (applyCursorFadeIn && !isScrolling) ? 1 : 0,
          backgroundColor: 'white',
          mixBlendMode: 'difference',
        }}
        aria-hidden="true"
      />
    </div>
  );
};
