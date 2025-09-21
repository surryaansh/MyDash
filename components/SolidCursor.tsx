import React from 'react';

interface SolidCursorProps {
  relativeCursorPosition: { x: number; y: number };
  isHoveringLink: boolean;
  isDarkMode: boolean;
  isScrolling: boolean;
}

export const SolidCursor: React.FC<SolidCursorProps> = ({
  relativeCursorPosition,
  isHoveringLink,
  isDarkMode,
  isScrolling,
}) => {
  return (
    <div
      className="hidden lg:block"
      style={{
        position: 'absolute',
        top: relativeCursorPosition.y,
        left: relativeCursorPosition.x,
        width: `${isHoveringLink ? 60 : 40}px`,
        height: `${isHoveringLink ? 60 : 40}px`,
        backgroundColor: isDarkMode ? 'white' : 'black',
        borderRadius: '50%',
        pointerEvents: 'none',
        transform: 'translate(-50%, -50%)',
        zIndex: 10000,
        transition: 'width 0.2s ease, height 0.2s ease, opacity 0.2s ease-out',
        opacity: isScrolling ? 0 : 1,
      }}
      aria-hidden="true"
    />
  );
};
