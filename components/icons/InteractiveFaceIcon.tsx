import React, { useRef, useState, useEffect } from 'react';

interface InteractiveFaceIconProps {
  /** The global mouse position provided by the parent component. */
  cursorPosition: { x: number; y: number };
  isDarkMode: boolean;
  /** Whether the parent "LET'S CONNECT" button is being hovered. */
  isConnectHovered: boolean;
}

/**
 * An interactive SVG face icon where the eyes and eyebrows follow the cursor's movement,
 * creating an expressive and engaging UI element.
 */
export const InteractiveFaceIcon: React.FC<InteractiveFaceIconProps> = ({ cursorPosition, isDarkMode, isConnectHovered }) => {
  const faceRef = useRef<SVGSVGElement>(null);

  // State to store the calculated positions and scale of the SVG elements on the screen.
  const [elementPositions, setElementPositions] = useState({
    face: { x: 0, y: 0, width: 0, height: 0 },
    leftEye: { x: 0, y: 0 },
    rightEye: { x: 0, y: 0 },
    scale: { x: 1, y: 1 },
  });

  // Effect to calculate and update the screen coordinates of the face and eyes.
  // This runs on mount and recalculates on window resize to handle responsiveness.
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const calculatePositions = () => {
      if (!faceRef.current) return;
      
      const faceRect = faceRef.current.getBoundingClientRect();
      // If the component isn't rendered yet, the width will be 0. We avoid calculation in this case.
      if (faceRect.width === 0) return; 

      // The original SVG viewBox dimensions. Used to calculate scaling factor.
      const viewBox = { x: 67, y: 105, width: 745, height: 364 };
      const scaleX = faceRect.width / viewBox.width;
      const scaleY = faceRect.height / viewBox.height;

      // Helper function to convert internal SVG coordinates to absolute screen coordinates.
      const getScreenCoords = (svgX: number, svgY: number) => ({
        x: faceRect.left + (svgX - viewBox.x) * scaleX,
        y: faceRect.top + (svgY - viewBox.y) * scaleY,
      });

      setElementPositions({
        face: { 
          x: faceRect.left + faceRect.width / 2, 
          y: faceRect.top + faceRect.height / 2, 
          width: faceRect.width, 
          height: faceRect.height 
        },
        // These are the original coordinates of the eye centers within the SVG viewBox.
        leftEye: getScreenCoords(213, 395),
        rightEye: getScreenCoords(667, 395),
        scale: { x: scaleX, y: scaleY },
      });
    };
    
    // Debounce the resize handler to avoid performance issues.
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(calculatePositions, 100);
    };

    calculatePositions();
    // Also run a delayed calculation to catch layout shifts after initial render.
    const initialCalculationTimer = setTimeout(calculatePositions, 500);

    window.addEventListener('resize', handleResize);
    
    return () => {
      clearTimeout(timeoutId);
      clearTimeout(initialCalculationTimer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  /**
   * Calculates the pupil's transform (dx, dy) based on the cursor position relative to an eye's center.
   * @param eyeCenter - The absolute screen coordinates of the eye's center.
   * @returns The calculated dx and dy translation for the pupil in SVG units.
   */
  const getPupilTransform = (eyeCenter: { x: number; y: number }) => {
    const { scale } = elementPositions;
    if (!eyeCenter.x || !eyeCenter.y || scale.x === 0 || scale.y === 0) {
      return { dx: 0, dy: 0 };
    }
    
    // Maximum travel distance for the pupil in SVG units.
    const maxTravelX = 60;
    const maxTravelY = 30;
    const sensitivity = 0.4; // How strongly the pupil reacts to cursor movement.

    // 1. Calculate displacement in screen pixels.
    const dx_pixels = (cursorPosition.x - eyeCenter.x) * sensitivity;
    const dy_pixels = (cursorPosition.y - eyeCenter.y) * sensitivity;
    
    // 2. Convert pixel displacement to SVG coordinate units using the calculated scale.
    let dx = dx_pixels / scale.x;
    let dy = dy_pixels / scale.y;

    // 3. Constrain the movement to an elliptical path that matches the eye shape.
    const ellipseRatio = (dx / maxTravelX) ** 2 + (dy / maxTravelY) ** 2;

    if (ellipseRatio > 1) {
      const scaleFactor = 1 / Math.sqrt(ellipseRatio);
      dx *= scaleFactor;
      dy *= scaleFactor;
    }
    
    return { dx, dy };
  };

  /**
   * Calculates the eyebrow transforms (rotation, translation) based on cursor position relative to the face.
   * If `isConnectHovered` is true, it returns a fixed "angry" expression.
   * @returns An object containing the transform properties for both left and right eyebrows.
   */
  const getEyebrowTransforms = () => {
    // Override the animation with a fixed expression when the connect button is hovered.
    if (isConnectHovered) {
      return {
        left: { angle: 35, dx: 0, dy: 15 },
        right: { angle: -35, dx: 0, dy: 15 },
      };
    }
    
    const { face } = elementPositions;
    if (face.width === 0 || face.x === 0) {
      return { left: { angle: 0, dx: 0, dy: 0 }, right: { angle: 0, dx: 0, dy: 0 } };
    }

    const dx = cursorPosition.x - face.x;
    const dy = cursorPosition.y - face.y;
    
    // Normalize cursor position from -1 to 1 relative to the face dimensions.
    const xFactor = Math.max(-1, Math.min(1, dx / (face.width / 2)));
    const yFactor = Math.max(-1, Math.min(1, dy / (face.height / 1.5)));

    // --- Define Animation Components ---
    const tilt = xFactor * 4; 
    const verticalOffset = yFactor * (yFactor < 0 ? 15 : 8); 
    const frownAngle = yFactor > 0 ? yFactor * 10 : 0; 
    const seeSawOffset = xFactor * -15; 
    const maxSqueeze = 25;
    const leftSqueeze = xFactor > 0 ? xFactor * maxSqueeze : 0;
    const rightSqueeze = xFactor < 0 ? xFactor * maxSqueeze : 0;

    // --- Combine into final transforms ---
    const leftEyebrowTransform = {
      angle: tilt + frownAngle,
      dx: leftSqueeze,
      dy: verticalOffset + seeSawOffset,
    };
    const rightEyebrowTransform = {
      angle: tilt - frownAngle,
      dx: rightSqueeze,
      dy: verticalOffset - seeSawOffset,
    };
    
    return { left: leftEyebrowTransform, right: rightEyebrowTransform };
  }

  const leftPupil = getPupilTransform(elementPositions.leftEye);
  const rightPupil = getPupilTransform(elementPositions.rightEye);
  const { left: leftEyebrowTransform, right: rightEyebrowTransform } = getEyebrowTransforms();

  const eyeWhiteColor = isDarkMode ? '#000000' : '#EEEEEE';

  // SVG coordinates for eyebrow rotation centers.
  const leftEyebrowSVG_CX = 286;
  const leftEyebrowSVG_CY = 238;
  const rightEyebrowSVG_CX = 574;
  const rightEyebrowSVG_CY = 239;

  // Mouth paths for different expressions.
  const neutralMouthPath = "M435 458 L 475 458"; // A simple, neutral line.
  const determinedMouthPath = "M425 463 C 445 448 465 448 485 463"; // A downturned curve.

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
        <g transform={`translate(${leftPupil.dx}, ${leftPupil.dy})`}>
          <ellipse cx="213" cy="395" rx="55" ry="45" fill="currentColor"/>
        </g>
      </g>
      
      {/* Left Eyebrow */}
      <g 
        style={{ transition: 'transform 0.2s ease-out' }} 
        transform={`
          translate(${leftEyebrowTransform.dx}, ${leftEyebrowTransform.dy}) 
          rotate(${leftEyebrowTransform.angle}, ${leftEyebrowSVG_CX}, ${leftEyebrowSVG_CY})
        `}
      >
        <path d="M371.513 318.177L358.587 329.736C350.61 336.869 338.44 336.494 330.918 328.883L200.698 197.134C192.798 189.141 192.994 176.221 201.134 168.472L223.07 147.588C231.394 139.662 244.659 140.327 252.149 149.045L373.359 290.12C380.486 298.415 379.665 310.887 371.513 318.177Z" fill="currentColor" stroke="currentColor" strokeWidth="10.0412" transform="translate(24.26, -13.98)"></path>
      </g>

      {/* Right Eye */}
      <path d="M650.904 457.91C576.786 463.524 524.151 480.789 523.404 421.41C522.658 362.031 620.677 307.424 692.404 315.91C751.877 322.946 810.404 355.91 801.404 428.41C794.956 480.354 725.023 452.296 650.904 457.91Z" fill={eyeWhiteColor} stroke="currentColor" strokeWidth="3"></path>
      <g clipPath="url(#rightEyeClip)">
        <g transform={`translate(${rightPupil.dx}, ${rightPupil.dy})`}>
          <ellipse cx="667" cy="395" rx="55" ry="45" fill="currentColor"/>
        </g>
      </g>
      
      {/* Right Eyebrow */}
      <g 
        style={{ transition: 'transform 0.2s ease-out' }} 
        transform={`
          translate(${rightEyebrowTransform.dx}, ${rightEyebrowTransform.dy}) 
          rotate(${rightEyebrowTransform.angle}, ${rightEyebrowSVG_CX}, ${rightEyebrowSVG_CY})
        `}
      >
          <path d="M603.446 147.589L497.186 306.039C491.008 315.251 493.468 327.726 502.679 333.903L507.902 337.406C516.692 343.3 528.548 341.362 535.003 332.974L651.597 181.453C658.674 172.256 656.505 158.991 646.866 152.527L631.311 142.095C622.099 135.918 609.624 138.377 603.446 147.589Z" fill="currentColor" stroke="currentColor" strokeWidth="10.0412" transform="translate(24.26, -13.98)"></path>
      </g>
      
      {/* Mouth */}
      <path 
        d={isConnectHovered ? determinedMouthPath : neutralMouthPath} 
        stroke="currentColor" 
        strokeWidth="3" 
        strokeLinecap="round"
      />
    </svg>
  );
};