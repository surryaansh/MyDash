
import React, { useRef, useState, useEffect } from 'react';

interface InteractiveFaceIconProps {
  cursorPosition: { x: number; y: number };
  isDarkMode: boolean;
}

export const InteractiveFaceIcon: React.FC<InteractiveFaceIconProps> = ({ cursorPosition, isDarkMode }) => {
  const faceRef = useRef<SVGSVGElement>(null);
  const [centers, setCenters] = useState({
    face: { x: 0, y: 0, width: 0 },
    leftEye: { x: 0, y: 0 },
    rightEye: { x: 0, y: 0 },
    eyebrows: { y: 0 },
  });

  // State for the smoothed/animated values
  const [animatedPupils, setAnimatedPupils] = useState({ left: { dx: 0, dy: 0 }, right: { dx: 0, dy: 0 } });
  const [animatedEyebrow, setAnimatedEyebrow] = useState({ angle: 0, dy: 0 });

  // Refs to hold the latest target values without causing re-renders inside the animation loop
  const targetPupils = useRef({ left: { dx: 0, dy: 0 }, right: { dx: 0, dy: 0 } });
  const targetEyebrow = useRef({ angle: 0, dy: 0 });

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    const calculateCenters = () => {
      if (faceRef.current) {
        const faceRect = faceRef.current.getBoundingClientRect();
        // The viewBox defines the coordinate system of the SVG content.
        const viewBox = { x: 67, y: 105, width: 745, height: 364 };
        const scaleX = faceRect.width / viewBox.width;
        const scaleY = faceRect.height / viewBox.height;

        const getScreenCoords = (svgX: number, svgY: number) => ({
          x: faceRect.left + (svgX - viewBox.x) * scaleX,
          y: faceRect.top + (svgY - viewBox.y) * scaleY,
        });

        setCenters({
          face: { x: faceRect.left + faceRect.width / 2, y: faceRect.top + faceRect.height / 2, width: faceRect.width },
          leftEye: getScreenCoords(208, 386),
          rightEye: getScreenCoords(662, 386),
          eyebrows: { y: getScreenCoords(0, 238).y },
        });
      }
    };
    
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(calculateCenters, 100);
    };

    calculateCenters();
    window.addEventListener('resize', handleResize);
    
    const timer = setTimeout(calculateCenters, 500);

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Effect to calculate TARGET transforms whenever cursor moves
  useEffect(() => {
    if (!centers.face.x) return; // Don't calculate if centers aren't ready

    const getPupilTarget = (eyeCenter: { x: number; y: number }) => {
        if (!eyeCenter.x || !eyeCenter.y) return { dx: 0, dy: 0 };
        const dx = cursorPosition.x - eyeCenter.x;
        const dy = cursorPosition.y - eyeCenter.y;
        const angle = Math.atan2(dy, dx);
        // Increased range and responsiveness
        const distance = Math.min(40, Math.sqrt(dx * dx + dy * dy) * 0.3); 
        return {
          dx: Math.cos(angle) * distance,
          dy: Math.sin(angle) * distance,
        };
    };

    const getEyebrowTarget = () => {
        if (!centers.face.x || !centers.eyebrows.y || !centers.face.width) return { angle: 0, dy: 0 };

        const dy_from_eyebrow = cursorPosition.y - centers.eyebrows.y;
        // Increased vertical movement range
        const verticalOffset = Math.max(-35, Math.min(30, dy_from_eyebrow * 0.2));

        const dx_from_face_center = cursorPosition.x - centers.face.x;
        const maxRotation = 28;
        const rotationRange = centers.face.width > 0 ? centers.face.width / 1.8 : window.innerWidth / 4; // Make rotation more sensitive
        const rotationAngle = Math.max(-maxRotation, Math.min(maxRotation, (dx_from_face_center / rotationRange) * maxRotation));

        return { angle: rotationAngle, dy: verticalOffset };
    };

    targetPupils.current.left = getPupilTarget(centers.leftEye);
    targetPupils.current.right = getPupilTarget(centers.rightEye);
    targetEyebrow.current = getEyebrowTarget();

  }, [cursorPosition, centers]);

  // Effect for the animation loop
  useEffect(() => {
      let animationFrameId: number;
      const lerpFactor = 0.1; // Controls the "lag" or smoothness

      const animate = () => {
          setAnimatedPupils(prev => ({
              left: {
                  dx: prev.left.dx + (targetPupils.current.left.dx - prev.left.dx) * lerpFactor,
                  dy: prev.left.dy + (targetPupils.current.left.dy - prev.left.dy) * lerpFactor,
              },
              right: {
                  dx: prev.right.dx + (targetPupils.current.right.dx - prev.right.dx) * lerpFactor,
                  dy: prev.right.dy + (targetPupils.current.right.dy - prev.right.dy) * lerpFactor,
              }
          }));

          setAnimatedEyebrow(prev => ({
              angle: prev.angle + (targetEyebrow.current.angle - prev.angle) * lerpFactor,
              dy: prev.dy + (targetEyebrow.current.dy - prev.dy) * lerpFactor,
          }));

          animationFrameId = requestAnimationFrame(animate);
      };

      animate();

      return () => {
          cancelAnimationFrame(animationFrameId);
      };
  }, []); // Run only once to start the animation loop

  const leftEyelidTranslateY = Math.max(0, animatedPupils.left.dy * 0.7);
  const rightEyelidTranslateY = Math.max(0, animatedPupils.right.dy * 0.7);

  const eyeWhiteColor = isDarkMode ? '#000000' : '#EEEEEE';
  const leftEyebrowSVG_CX = 280;
  const leftEyebrowSVG_CY = 240;
  const rightEyebrowSVG_CX = 580;
  const rightEyebrowSVG_CY = 240;

  return (
    <svg ref={faceRef} fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="67 105 745 364">
      <defs>
        <clipPath id="leftEyeClip">
          <path d="M197 457.91C122.881 463.524 70.2463 480.789 69.4998 421.41C68.7534 362.031 166.773 307.424 238.5 315.91C297.973 322.946 356.5 355.91 347.5 428.41C341.052 480.354 271.118 452.296 197 457.91Z"></path>
        </clipPath>
        <clipPath id="rightEyeClip">
          <path d="M650.904 457.91C576.786 463.524 524.151 480.789 523.404 421.41C522.658 362.031 620.677 307.424 692.404 315.91C751.877 322.946 810.404 355.91 801.404 428.41C794.956 480.354 725.023 452.296 650.904 457.91Z"></path>
        </clipPath>
      </defs>
      
      {/* Left Eye */}
      <path d="M197 457.91C122.881 463.524 70.2463 480.789 69.4998 421.41C68.7534 362.031 166.773 307.424 238.5 315.91C297.973 322.946 356.5 355.91 347.5 428.41C341.052 480.354 271.118 452.296 197 457.91Z" fill={eyeWhiteColor} stroke="currentColor" strokeWidth="3"></path>
      <g clipPath="url(#leftEyeClip)">
        <path d="M245.394 419.322C225.669 415.393 191.257 402.188 193.279 374.296C195.738 340.37 235.38 335.212 269.295 341.696C297.416 347.073 334.775 353.691 324.511 392.091C316.323 422.725 265.119 423.251 245.394 419.322Z" fill="currentColor" stroke="currentColor" strokeWidth="21.7077" transform={`translate(${animatedPupils.left.dx - 3.739}, ${animatedPupils.left.dy - 5.979})`}></path>
      </g>
      <path d="M 69,421 C 120,330, 290,330, 347,428" fill={eyeWhiteColor} stroke="none" transform={`translate(0, ${leftEyelidTranslateY})`}></path>
      
      {/* Left Eyebrow */}
      <path 
        d="M 180,270 C 220,210, 340,210, 380,270" 
        stroke="currentColor" 
        strokeWidth="12" 
        strokeLinecap="round" 
        transform={`
          translate(0, ${animatedEyebrow.dy}) 
          rotate(${animatedEyebrow.angle}, ${leftEyebrowSVG_CX}, ${leftEyebrowSVG_CY})
        `}
      />

      {/* Right Eye */}
      <path d="M650.904 457.91C576.786 463.524 524.151 480.789 523.404 421.41C522.658 362.031 620.677 307.424 692.404 315.91C751.877 322.946 810.404 355.91 801.404 428.41C794.956 480.354 725.023 452.296 650.904 457.91Z" fill={eyeWhiteColor} stroke="currentColor" strokeWidth="3"></path>
      <g clipPath="url(#rightEyeClip)">
        <path d="M698.394 422.322C678.669 418.393 644.257 405.188 646.279 377.296C648.738 343.37 688.38 338.212 722.295 344.696C750.416 350.073 787.775 356.691 777.511 395.091C769.323 425.725 718.119 426.251 698.394 422.322Z" fill="currentColor" stroke="currentColor" strokeWidth="21.7077" transform={`translate(${animatedPupils.right.dx - 3.739}, ${animatedPupils.right.dy - 5.979})`}></path>
      </g>
      <path d="M 523,421 C 574,330, 744,330, 801,428" fill={eyeWhiteColor} stroke="none" transform={`translate(0, ${rightEyelidTranslateY})`}></path>

      {/* Right Eyebrow */}
      <path 
        d="M 490,270 C 530,210, 650,210, 690,270"
        stroke="currentColor" 
        strokeWidth="12" 
        strokeLinecap="round" 
        transform={`
          translate(0, ${animatedEyebrow.dy}) 
          rotate(${animatedEyebrow.angle}, ${rightEyebrowSVG_CX}, ${rightEyebrowSVG_CY})
        `}
      />
      
      {/* Mouth */}
      <path transform="scale(1.43) translate(-4, -3)" d="M303.755 322.279C303.755 322.279 306.533 301.467 315.204 302.897C317.611 303.294 319.874 305.306 321.63 307.387C322.882 308.872 326.005 308.326 326.714 306.517C327.558 304.369 328.793 302.219 330.549 301.169C337.703 296.892 347.191 314.644 347.191 314.644" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" opacity="1" pathLength="1" strokeDashoffset="0px" strokeDasharray="1px 1px"></path>
    </svg>
  );
};
