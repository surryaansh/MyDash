import React, { useRef, useEffect, useState, useCallback, memo } from 'react';

interface BrushRevealCanvasProps {
  imageUrl: string;
  brushUrl: string;
  isDarkMode: boolean;
}

type LoadingState = 'loading' | 'ready' | 'error';

const BrushRevealCanvas: React.FC<BrushRevealCanvasProps> = ({
  imageUrl,
  brushUrl,
  isDarkMode,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const brushImageRef = useRef<HTMLImageElement | null>(null);
  const [loadingState, setLoadingState] = useState<LoadingState>('loading');

  // 1. Load images and update the component's state accordingly.
  useEffect(() => {
    setLoadingState('loading'); // Reset state if props change.

    const imagePromise = new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => resolve(img);
      img.onerror = (e) => reject(new Error(`Failed to load image at ${imageUrl}: ${e}`));
      img.src = imageUrl;
    });

    const brushPromise = new Promise<HTMLImageElement>((resolve, reject) => {
      const brushImg = new Image();
      brushImg.crossOrigin = "anonymous";
      brushImg.onload = () => resolve(brushImg);
      brushImg.onerror = (e) => reject(new Error(`Failed to load brush at ${brushUrl}: ${e}`));
      brushImg.src = brushUrl;
    });

    Promise.all([imagePromise, brushPromise])
      .then(([loadedImage, loadedBrush]) => {
        imageRef.current = loadedImage;
        brushImageRef.current = loadedBrush;
        setLoadingState('ready');
      })
      .catch(error => {
        console.error("BrushRevealCanvas Error:", error);
        // If either image fails to load, enter the error state for the fallback.
        setLoadingState('error');
      });
  }, [imageUrl, brushUrl]);

  // 2. Setup the canvas and handle resizing once images are ready.
  useEffect(() => {
    if (loadingState !== 'ready' || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const image = imageRef.current;
    
    if (!ctx || !image) return;

    const redrawCanvas = () => {
        const parent = canvas.parentElement;
        if (!parent) return;

        const { width, height } = parent.getBoundingClientRect();
        if (canvas.width !== width || canvas.height !== height) {
            canvas.width = width;
            canvas.height = height;
        }

        ctx.globalCompositeOperation = 'source-over';
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // First, draw the main image onto the canvas.
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        // Then, draw the solid color overlay that will be "brushed away".
        ctx.fillStyle = isDarkMode ? '#000000' : '#efeeee';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    const resizeObserver = new ResizeObserver(() => {
        requestAnimationFrame(redrawCanvas);
    });
    
    if (canvas.parentElement) {
        resizeObserver.observe(canvas.parentElement);
        redrawCanvas();
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [loadingState, isDarkMode]);

  // 3. Handle the "brushing" effect on pointer move.
  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
    if (loadingState !== 'ready') return;

    const canvas = canvasRef.current;
    const brush = brushImageRef.current;
    const ctx = canvas?.getContext('2d');
    
    if (!canvas || !brush || !ctx) return;

    requestAnimationFrame(() => {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const brushSize = Math.max(canvas.width, canvas.height) / 8;

        // Use 'destination-out' to erase the top layer, revealing the image underneath.
        ctx.globalCompositeOperation = 'destination-out';
        ctx.drawImage(brush, x - brushSize / 2, y - brushSize / 2, brushSize, brushSize);
    });
  }, [loadingState]);

  // --- Conditional Rendering ---

  // Fallback: If images failed to load, render a simple <img> tag.
  if (loadingState === 'error') {
    return (
        <img 
            src={imageUrl} 
            alt="Vaporwave hero image" 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
    );
  }

  // Do not render anything while loading to avoid a flash of unstyled content.
  if (loadingState === 'loading') {
    return null; 
  }

  // Success: Render the interactive canvas.
  return (
    <canvas
      ref={canvasRef}
      onPointerMove={handlePointerMove}
      style={{
        width: '100%',
        height: '100%',
        display: 'block',
        touchAction: 'none',
        cursor: 'none',
      }}
    />
  );
};

export default memo(BrushRevealCanvas);
