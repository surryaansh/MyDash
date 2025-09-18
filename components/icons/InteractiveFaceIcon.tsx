
import React, { useRef, useState, useEffect } from 'react';

interface InteractiveFaceIconProps {
  cursorPosition: { x: number; y: number };
}

export const InteractiveFaceIcon: React.FC<InteractiveFaceIconProps> = ({ cursorPosition }) => {
  const faceRef = useRef<SVGSVGElement>(null);
  const [eyeCenters, setEyeCenters] = useState({ left: { x: 0, y: 0 }, right: { x: 0, y: 0 } });

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    const calculateCenters = () => {
      if (faceRef.current) {
        const faceRect = faceRef.current.getBoundingClientRect();
        const scaleX = faceRect.width / 250;
        const scaleY = faceRect.height / 120;
        setEyeCenters({
          left: { x: faceRect.left + 75 * scaleX, y: faceRect.top + 75 * scaleY },
          right: { x: faceRect.left + 175 * scaleX, y: faceRect.top + 75 * scaleY },
        });
      }
    };

    const handleResize = () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(calculateCenters, 100);
    };

    calculateCenters();
    window.addEventListener('resize', handleResize);
    return () => {
        clearTimeout(timeoutId);
        window.removeEventListener('resize', handleResize);
    };
  }, []);

  const getPupilTransform = (eyeCenter: { x: number; y: number }) => {
    if (!eyeCenter.x || !eyeCenter.y) return { dx: 0, dy: 0 };
    const dx = cursorPosition.x - eyeCenter.x;
    const dy = cursorPosition.y - eyeCenter.y;
    const angle = Math.atan2(dy, dx);
    const distance = Math.min(12, Math.sqrt(dx * dx + dy * dy) * 0.05);
    return {
      dx: Math.cos(angle) * distance,
      dy: Math.sin(angle) * distance,
    };
  };

  const getEyebrowTransform = (isLeft: boolean) => {
      if (!faceRef.current) return { angle: isLeft ? 15 : -15 };
      
      const faceRect = faceRef.current.getBoundingClientRect();
      const faceCenterX = faceRect.left + faceRect.width / 2;
      const faceCenterY = faceRect.top + faceRect.height / 2;

      const dx = cursorPosition.x - faceCenterX;
      const dy = cursorPosition.y - faceCenterY;
      
      const verticalRotation = - (dy / (window.innerHeight / 2)) * 15;
      const horizontalRotation = (dx / (window.innerWidth / 2)) * 10;
      
      const baseRotation = isLeft ? 15 : -15;
      let totalRotation = baseRotation + verticalRotation;
      totalRotation += isLeft ? horizontalRotation : -horizontalRotation;
      
      return { angle: Math.max(-25, Math.min(45, totalRotation)) };
  }

  const leftPupilTransform = getPupilTransform(eyeCenters.left);
  const rightPupilTransform = getPupilTransform(eyeCenters.right);
  const leftEyebrowTransform = getEyebrowTransform(true);
  const rightEyebrowTransform = getEyebrowTransform(false);

  return (
    <svg ref={faceRef} width="250" height="120" viewBox="0 0 250 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>{`
        g { transition: transform 0.1s linear; }
      `}</style>
      
      {/* Eyebrows */}
      <g 
        style={{ transformOrigin: 'center center' }} 
        transform={`rotate(${leftEyebrowTransform.angle} 60 35)`}
      >
        <rect x="25" y="25" width="70" height="20" rx="10" fill="currentColor"/>
      </g>
      <g 
        style={{ transformOrigin: 'center center' }}
        transform={`rotate(${rightEyebrowTransform.angle} 190 35)`}
      >
        <rect x="155" y="25" width="70" height="20" rx="10" fill="currentColor"/>
      </g>

      {/* Eyes */}
      <path d="M104.2,66.1C116.4,85.3,109,105,86,108.9C57.4,113.6,28,95.5,25.8,76.3C23.6,57.1,43.2,40.1,65,39.3 C86.8,38.5,92,46.9,104.2,66.1Z" stroke="currentColor" strokeWidth="2.5"/>
      <g transform={`translate(${leftPupilTransform.dx}, ${leftPupilTransform.dy})`}>
        <ellipse cx="70" cy="78" rx="18" ry="16" fill="currentColor"/>
      </g>
      
      <path d="M165.8,76.3C168,95.5,197.6,113.6,226.2,108.9C249.2,105,256.6,85.3,244.4,66.1C232.2,46.9,226.2,38.5,204.4,39.3 C182.6,40.1,163.6,57.1,165.8,76.3Z" stroke="currentColor" strokeWidth="2.5"/>
      <g transform={`translate(${rightPupilTransform.dx}, ${rightPupilTransform.dy})`}>
        <ellipse cx="195" cy="78" rx="18" ry="16" fill="currentColor"/>
      </g>

      {/* Mouth */}
      <path d="M125 98 C 128 103, 135 103, 138 98" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
};
