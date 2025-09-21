import React, { forwardRef, memo } from 'react';
import { FilledLightningIcon } from '../icons/FilledLightningIcon.tsx';
import BrushRevealCanvas from '../BrushRevealCanvas.tsx';
import { SolidCursor } from '../SolidCursor.tsx';

// Memoize the static parts of the panel to prevent re-renders on mouse move.
// This is crucial for the canvas to load its images without being unmounted.
const MemoizedMainImage = memo(({ isDarkMode }: { isDarkMode: boolean }) => {
  return (
    <>
      <div className="absolute top-0 left-0 right-0 bottom-6">
        <BrushRevealCanvas
            imageUrl="/vaporwave-david.png"
            brushUrl="/brush-texture.png"
            isDarkMode={isDarkMode}
        />
      </div>
      <FilledLightningIcon 
        className="absolute bottom-6 right-6 md:bottom-14 md:right-[5%] text-[#FF4500] w-28 h-28 md:w-[9.409rem] md:h-[9.409rem] pointer-events-none"
        style={{ mixBlendMode: 'normal' }}
      />
    </>
  );
});


interface RightPanelProps {
  isDarkMode: boolean;
  isHoveringLink: boolean;
  relativeCursorPosition: { x: number; y: number };
  isScrolling: boolean;
  setIsHovering: (isHovering: boolean) => void;
}

export const RightPanel = forwardRef<HTMLDivElement, RightPanelProps>(
  ({ isDarkMode, isHoveringLink, relativeCursorPosition, isScrolling, setIsHovering }, ref) => {
    const grayTextClasses = `transition-colors duration-300 ease-in-out ${
      isDarkMode
        ? 'text-gray-400'
        : 'text-gray-600'
    }`;
  
    return (
      <div 
        className="w-full lg:w-1/2 flex flex-col lg:pl-6 pt-8 lg:pt-0"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className={`flex justify-between text-[10px] py-2 ${grayTextClasses}`}>
          <span>01 LOGO</span>
          <span>/01</span>
        </div>
        <div 
          ref={ref}
          className="relative w-full aspect-square overflow-hidden px-2 pt-0 lg:px-0"
        >
          {/* The solid cursor is its own component and will re-render on its own. */}
          <SolidCursor 
            relativeCursorPosition={relativeCursorPosition}
            isHoveringLink={isHoveringLink}
            isDarkMode={isDarkMode}
            isScrolling={isScrolling}
          />
          {/* The main image content is memoized and will NOT re-render on mouse move. */}
          <MemoizedMainImage isDarkMode={isDarkMode} />
        </div>
      </div>
    );
  }
);
