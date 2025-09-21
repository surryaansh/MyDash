import React, { useRef, useEffect, useState, useCallback } from 'react';

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
  const imageRef = useRef<HTMLImageElement>();
  const maskCanvasRef = useRef<HTMLCanvasElement>(); // Holds the processed brush mask
  const [isReady, setIsReady] = useState(false);

  // 1. Load images, process brush into a mask, and update readiness.
  useEffect(() => {
    const img = new Image();
    const brushImg = new Image();
    img.crossOrigin = "anonymous";
    brushImg.crossOrigin = "anonymous";

    const imagePromise = new Promise<HTMLImageElement>((resolve, reject) => {
      img.onload = () => resolve(img);
      // FIX: The onerror handler expects an argument.
      img.onerror = (err) => reject(new Error(`Failed to load image at ${imageUrl}`));
    });
    const brushPromise = new Promise<HTMLImageElement>((resolve, reject) => {
      brushImg.onload = () => resolve(brushImg);
      // FIX: The onerror handler expects an argument.
      brushImg.onerror = (err) => reject(new Error(`Failed to load brush at ${brushUrl}`));
    });

    img.src = imageUrl;
    brushImg.src = brushUrl;

    Promise.all([imagePromise, brushPromise])
      .then(([loadedImage, loadedBrush]) => {
        imageRef.current = loadedImage;

        // Process the user's brush image into a usable alpha mask.
        // This makes the effect work regardless of the brush's original color.
        const maskCanvas = document.createElement('canvas');
        maskCanvas.width = loadedBrush.naturalWidth;
        maskCanvas.height = loadedBrush.naturalHeight;
        const maskCtx = maskCanvas.getContext('2d');
        if (maskCtx) {
          maskCtx.drawImage(loadedBrush, 0, 0);
          // Use 'source-in' to combine the brush shape with a solid color,
          // creating a perfect mask from the brush's non-transparent pixels.
          maskCtx.globalCompositeOperation = 'source-in';
          maskCtx.fillStyle = '#000'; // Color doesn't matter, just needs to be opaque
          maskCtx.fillRect(0, 0, maskCanvas.width, maskCanvas.height);
        }
        maskCanvasRef.current = maskCanvas;

        setIsReady(true);
      })
      .catch(error => {
        console.error("BrushRevealCanvas Error:", error);
        // If images fail, we don't set isReady, and the canvas remains hidden.
      });
  }, [imageUrl, brushUrl]);

  // 2. Setup canvas and handle resizing robustly with ResizeObserver.
  useEffect(() => {
    if (!isReady || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const image = imageRef.current;
    
    if (!ctx || !image) return;

    const redrawCanvas = () => {
        const { width, height } = canvas.getBoundingClientRect();
        if (canvas.width !== width || canvas.height !== height) {
            canvas.width = width;
            canvas.height = height;
        }

        ctx.globalCompositeOperation = 'source-over';
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

        ctx.fillStyle = isDarkMode ? '#000000' : '#efeeee';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    const resizeObserver = new ResizeObserver(() => {
        // Debounce redraw with requestAnimationFrame
        requestAnimationFrame(redrawCanvas);
    });
    
    resizeObserver.observe(canvas.parentElement!);

    // Initial draw
    redrawCanvas();

    return () => {
      resizeObserver.disconnect();
    };
  }, [isReady, isDarkMode]);

  // 3. Handle drawing on pointer move.
  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isReady) return;

    const canvas = canvasRef.current;
    const brush = maskCanvasRef.current; // Use the processed mask canvas
    const ctx = canvas?.getContext('2d');
    
    if (!canvas || !brush || !ctx) return;

    requestAnimationFrame(() => {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const brushSize = Math.max(canvas.width, canvas.height) / 10;

        ctx.globalCompositeOperation = 'destination-out';
        ctx.drawImage(brush, x - brushSize / 2, y - brushSize / 2, brushSize, brushSize);
    });
  }, [isReady]);

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
        visibility: isReady ? 'visible' : 'hidden',
      }}
    />
  );
};

export default BrushRevealCanvas;
