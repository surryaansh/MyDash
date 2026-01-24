import React, { useRef, useEffect, useCallback } from 'react';

interface DragScrollOptions {
  /** The base speed for automatic scrolling when not dragging. Default is 1.02. */
  autoScrollSpeed?: number;
  /** The friction applied to the velocity after dragging (0 to 1). Default is 0.95. */
  friction?: number;
}

/**
 * Custom hook to enable horizontal drag-to-scroll and continuous auto-scrolling.
 * Uses a virtual coordinate system to ensure smoothness and infinite looping.
 * Supports both mouse and touch events.
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
  
  // Animation state for programmatic scrolling
  const isAnimatingScroll = useRef(false);
  const targetScrollPos = useRef(0);

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrollerRef.current) return;
    isDragging.current = true;
    isAnimatingScroll.current = false; // Stop any ongoing smooth scroll
    velocity.current = 0;
    startX.current = e.pageX;
    lastMouseX.current = e.pageX;
    scrollLeftStart.current = virtualScrollLeft.current;
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (!scrollerRef.current) return;
    isDragging.current = true;
    isAnimatingScroll.current = false; // Stop any ongoing smooth scroll
    velocity.current = 0;
    startX.current = e.touches[0].pageX;
    lastMouseX.current = e.touches[0].pageX;
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

  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging.current || !scrollerRef.current) return;
    
    const mouseX = e.touches[0].pageX;
    const walk = mouseX - startX.current;
    
    virtualScrollLeft.current = scrollLeftStart.current - walk;
    velocity.current = lastMouseX.current - mouseX;
    lastMouseX.current = mouseX;
  }, []);

  const setScrollPosition = useCallback((position: number) => {
    // Legacy instant snap method, if needed
    if (scrollerRef.current) {
        virtualScrollLeft.current = position;
        scrollerRef.current.scrollLeft = position;
        velocity.current = 0;
        isAnimatingScroll.current = false;
    }
  }, []);

  /**
   * Smoothly scrolls to a specific position.
   * @param position The target scroll position.
   * @param snapWidth Optional. If provided, instantly snaps the current position 
   * modulo this width to ensure the animation travel distance is minimized 
   * (seamless loop jump).
   */
  const animateScrollTo = useCallback((position: number, snapWidth?: number) => {
    if (scrollerRef.current) {
        isAnimatingScroll.current = true;
        velocity.current = 0;
        
        // If we have a snap width (the width of one full set of items),
        // we can normalize the current position to be in the first set before animating.
        // This prevents the carousel from scrolling backwards for miles if we are deep in the loop.
        if (snapWidth && snapWidth > 0) {
            // Normalize current position to [0, snapWidth)
            let normalizedCurrent = virtualScrollLeft.current % snapWidth;
            if (normalizedCurrent < 0) normalizedCurrent += snapWidth;
            
            // Seamlessly update virtual position to the normalized equivalent
            // Visually this is an invisible jump because the content is duplicated.
            virtualScrollLeft.current = normalizedCurrent;
            scrollerRef.current.scrollLeft = normalizedCurrent;
        }

        targetScrollPos.current = position;
    }
  }, []);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    // Force scroll-behavior auto to prevent CSS smooth scrolling from interfering with JS animation
    scroller.style.scrollBehavior = 'auto';

    const animate = () => {
      if (!scroller) return;

      if (isAnimatingScroll.current) {
        // Smooth lerp to target
        const diff = targetScrollPos.current - virtualScrollLeft.current;
        
        if (Math.abs(diff) < 0.5) {
            virtualScrollLeft.current = targetScrollPos.current;
            isAnimatingScroll.current = false; // Animation done
        } else {
            // Ease out
            virtualScrollLeft.current += diff * 0.1; 
        }
      } else if (!isDragging.current) {
        // Normal auto-scroll physics
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
      // We rely on the container having 2x content (or more).
      // We wrap when we exceed half the total scroll width.
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
    onTouchStart: handleTouchStart,
    onTouchEnd: handleMouseUpOrLeave,
    onTouchMove: handleTouchMove,
  };

  return { scrollerRef, eventHandlers, setScrollPosition, animateScrollTo };
};