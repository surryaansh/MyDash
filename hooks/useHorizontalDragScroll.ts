import { useRef, useEffect, useCallback } from 'react';

interface DragScrollOptions {
  /** The base speed for automatic scrolling when not dragging. Default is 1.02. */
  autoScrollSpeed?: number;
  /** The friction applied to the velocity after dragging (0 to 1). Default is 0.95. */
  friction?: number;
}

/**
 * Custom hook to enable horizontal drag-to-scroll and continuous auto-scrolling.
 * Uses a virtual coordinate system to ensure smoothness and infinite looping.
 */
export const useHorizontalDragScroll = (options: DragScrollOptions = {}) => {
  const { autoScrollSpeed = 1.02, friction = 0.95 } = options;

  const scrollerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);
  const velocity = useRef(0);
  const lastMouseX = useRef(0);
  const animationFrameId = useRef<number | null>(null);
  const virtualScrollLeft = useRef(0);

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrollerRef.current) return;
    isDragging.current = true;
    velocity.current = 0;
    startX.current = e.pageX;
    lastMouseX.current = e.pageX;
    scrollLeftStart.current = virtualScrollLeft.current;
  }, []);

  const handleMouseUpOrLeave = useCallback(() => {
    isDragging.current = false;
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging.current || !scrollerRef.current) return;
    
    const mouseX = e.pageX;
    const walk = mouseX - startX.current;
    
    // Update the virtual scroll position based on drag distance
    virtualScrollLeft.current = scrollLeftStart.current - walk;
    
    // Calculate velocity for momentum after release
    velocity.current = lastMouseX.current - mouseX;
    lastMouseX.current = mouseX;
  }, []);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const animate = () => {
      if (!scroller) return;

      if (!isDragging.current) {
        // Apply friction to the drag velocity (momentum)
        if (Math.abs(velocity.current) > 0.1) {
          virtualScrollLeft.current += velocity.current;
          velocity.current *= friction;
        } else {
          // Default to steady auto-scroll when idle
          velocity.current = 0;
          virtualScrollLeft.current += autoScrollSpeed;
        }
      }
      
      // Handle infinite loop reset
      const scrollableWidth = scroller.scrollWidth / 2;
      if (scrollableWidth > 0) {
        if (virtualScrollLeft.current >= scrollableWidth) {
          virtualScrollLeft.current -= scrollableWidth;
          // Synchronize start point if we loop mid-drag
          if (isDragging.current) scrollLeftStart.current -= scrollableWidth;
        } else if (virtualScrollLeft.current < 0) {
          virtualScrollLeft.current += scrollableWidth;
          if (isDragging.current) scrollLeftStart.current += scrollableWidth;
        }
      }
      
      scroller.scrollLeft = virtualScrollLeft.current;
      animationFrameId.current = requestAnimationFrame(animate);
    };

    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [autoScrollSpeed, friction]);

  const eventHandlers = {
    onMouseDown: handleMouseDown,
    onMouseUp: handleMouseUpOrLeave,
    onMouseLeave: handleMouseUpOrLeave,
    onMouseMove: handleMouseMove,
  };

  return { scrollerRef, eventHandlers };
};