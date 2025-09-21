import React from 'react';

interface CustomCursorProps {
  position: { x: number; y: number };
  isHoveringLink: boolean;
}

export const BlendedCursor: React.FC<CustomCursorProps> = ({ position, isHoveringLink }) => {
  return (
    <div className="hidden lg:block">
      <div
        style={{
          position: 'fixed',
          top: position.y,
          left: position.x,
          width: `${isHoveringLink ? 60 : 40}px`,
          height: `${isHoveringLink ? 60 : 40}px`,
          backgroundColor: 'white',
          borderRadius: '50%',
          pointerEvents: 'none',
          transform: 'translate(-50%, -50%)',
          zIndex: 9999,
          transition: 'width 0.2s ease, height 0.2s ease',
          opacity: 1,
        }}
        aria-hidden="true"
      />
    </div>
  );
};
