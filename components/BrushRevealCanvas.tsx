import React, { useRef, useEffect, useCallback } from 'react';

interface BrushRevealCanvasProps {
  imageUrl: string;
  brushUrl: string;
  isDarkMode: boolean;
}

const BrushRevealCanvas: React.FC<BrushRevealCanvasProps> = ({
  imageUrl,
  brushUrl,
  isDarkMode,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isPointerDown = useRef(false);
  // FIX: Initialize useRef with null to fix "Expected 1 arguments, but got 0" error.
  const imageRef = useRef<HTMLImageElement | null>(null);
  // FIX: Initialize useRef with null to fix "Expected 1 arguments, but got 0" error.
  const brushRef = useRef<HTMLImageElement | null>(null);
  // FIX: Initialize useRef with null to fix "Expected 1 arguments, but got 0" error.
  const animationFrameId = useRef<number | null>(null);

  // This function sets up the canvas layers: image below, cover color on top.
  const setupCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const image = imageRef.current;
    if (!canvas || !image || !image.complete) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Match canvas resolution to its display size.
    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return; // Don't setup if not visible
    
    canvas.width = rect.width;
    canvas.height = rect.height;

    // Draw the main image as the base layer.
    ctx.globalCompositeOperation = 'source-over';
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    // Draw the cover layer (black or off-white) on top.
    ctx.fillStyle = isDarkMode ? '#000000' : '#efeeee';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, [isDarkMode]);

  // Effect to load images and setup canvas initially.
  useEffect(() => {
    let imageLoaded = false;
    let brushLoaded = false;

    const img = new Image();
    img.src = imageUrl;
    imageRef.current = img;

    const brush = new Image();
    brush.src = brushUrl;
    brushRef.current = brush;

    const handleLoad = () => {
      if (imageLoaded && brushLoaded) {
        // A small delay to ensure layout is stable
        setTimeout(setupCanvas, 100);
      }
    };
    
    img.onload = () => { imageLoaded = true; handleLoad(); };
    brush.onload = () => { brushLoaded = true; handleLoad(); };

    // Reset on resize to handle responsive changes.
    const debouncedSetup = () => {
        if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
        animationFrameId.current = requestAnimationFrame(setupCanvas);
    }
    window.addEventListener('resize', debouncedSetup);
    return () => {
      window.removeEventListener('resize', debouncedSetup);
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, [imageUrl, brushUrl, setupCanvas]);

  // Effect to handle theme changes. It just re-runs the setup.
  useEffect(() => {
    if (canvasRef.current && imageRef.current?.complete) {
        // Redrawing will reset the reveal progress, which is an acceptable UX for a theme change.
        setupCanvas();
    }
  }, [isDarkMode, setupCanvas]);

  const draw = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const brush = brushRef.current;
    if (!canvas || !brush) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // A larger brush feels better.
    const brushSize = Math.max(brush.width, brush.height) * 1.5; 

    // Use 'destination-out' to erase the top layer (cover) and reveal the bottom layer (image).
    ctx.globalCompositeOperation = 'destination-out';
    ctx.drawImage(brush, x - brushSize / 2, y - brushSize / 2, brushSize, brushSize);
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    // Set the capture to ensure pointerup/leave events are fired even if the cursor leaves the element.
    e.currentTarget.setPointerCapture(e.pointerId);
    isPointerDown.current = true;
    draw(e);
  };
  
  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.currentTarget.releasePointerCapture(e.pointerId);
    isPointerDown.current = false;
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (isPointerDown.current) {
      draw(e);
    }
  };

  return (
    <canvas
      ref={canvasRef}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onPointerMove={handlePointerMove}
      style={{ 
        width: '100%', 
        height: '100%', 
        touchAction: 'none', // Important for pointer events on touch devices
        cursor: 'none' // The cursor is handled by the parent
      }}
    />
  );
};

export default BrushRevealCanvas;
