
import React, { useRef, useState, useEffect } from 'react';

interface InteractiveFaceIconProps {
  /** The global document-relative mouse position provided by the parent component. */
  cursorPosition: { x: number; y: number };
  isDarkMode: boolean;
  isConnectHovered?: boolean;
}

/**
 * An interactive SVG face icon where the eyes and eyebrows follow the cursor's movement.
 * Features simplified unified transforms to ensure fluid muscular movement.
 */
export const InteractiveFaceIcon: React.FC<InteractiveFaceIconProps> = ({ cursorPosition, isDarkMode, isConnectHovered = false }) => {
  const faceRef = useRef<SVGSVGElement>(null);

  const [elementPositions, setElementPositions] = useState({
    face: { x: 0, y: 0, width: 0, height: 0 },
    leftEye: { x: 0, y: 0 },
    rightEye: { x: 0, y: 0 },
    scale: { x: 1, y: 1 },
  });

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const calculatePositions = () => {
      if (!faceRef.current) return;
      
      const faceRect = faceRef.current.getBoundingClientRect();
      if (faceRect.width === 0) return; 

      const scrollY = window.pageYOffset || document.documentElement.scrollTop;
      const scrollX = window.pageXOffset || document.documentElement.scrollLeft;
      
      const docTop = faceRect.top + scrollY;
      const docLeft = faceRect.left + scrollX;

      const viewBox = { x: 67, y: 105, width: 745, height: 364 };
      const scaleX = faceRect.width / viewBox.width;
      const scaleY = faceRect.height / viewBox.height;

      const getDocCoords = (svgX: number, svgY: number) => ({
        x: docLeft + (svgX - viewBox.x) * scaleX,
        y: docTop + (svgY - viewBox.y) * scaleY,
      });

      setElementPositions({
        face: { 
          x: docLeft + faceRect.width / 2, 
          y: docTop + (faceRect.height * 0.7), 
          width: faceRect.width, 
          height: faceRect.height 
        },
        leftEye: getDocCoords(213, 395),
        rightEye: getDocCoords(667, 395),
        scale: { x: scaleX, y: scaleY },
      });
    };
    
    const handleEvents = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(calculatePositions, 50);
    };

    calculatePositions();
    window.addEventListener('resize', handleEvents);
    window.addEventListener('scroll', handleEvents);
    const timer = setTimeout(calculatePositions, 500);

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(timer);
      window.removeEventListener('resize', handleEvents);
      window.removeEventListener('scroll', handleEvents);
    };
  }, []);

  const getPupilTransforms = () => {
    const { face, leftEye, rightEye, scale } = elementPositions;
    if (face.width === 0 || face.x === 0 || scale.x === 0 || scale.y === 0) {
      return { left: { dx: 0, dy: 0 }, right: { dx: 0, dy: 0 } };
    }

    const maxTravelX = 60;
    const maxTravelY = 30;
    const sensitivity = 0.42; 

    const calculateEye = (eyeCenter: { x: number, y: number }) => {
      const udx = (cursorPosition.x - face.x) * sensitivity;
      const udy = (cursorPosition.y - face.y) * sensitivity;
      
      let dx = udx / scale.x;
      let dy = udy / scale.y;

      const ellipseRatio = (dx / maxTravelX) ** 2 + (dy / maxTravelY) ** 2;
      if (ellipseRatio > 1) {
        const scaleFactor = 1 / Math.sqrt(ellipseRatio);
        dx *= scaleFactor;
        dy *= scaleFactor;
      }
      return { dx, dy };
    };

    return {
      left: calculateEye(leftEye),
      right: calculateEye(rightEye)
    };
  };

  /**
   * Refined Eyebrow logic.
   * Everything is merged into a single coordinate target to ensure no 'popping' occurs.
   */
  const getEyebrowTransforms = () => {
    const { face } = elementPositions;
    if (face.width === 0 || face.x === 0) {
      return { left: { dx: 0, dy: 0, angle: 0 }, right: { dx: 0, dy: 0, angle: 0 } };
    }

    // Dynamic mouse factor (-1 to 1)
    const dx = cursorPosition.x - face.x;
    const dy = cursorPosition.y - face.y;
    const xFactor = Math.max(-1, Math.min(1, dx / (face.width / 2)));
    const yFactor = Math.max(-1, Math.min(1, dy / (face.height / 1.5)));

    // Base "Rest" offsets from the original SVG design
    const LEFT_REST_DX = -65;
    const LEFT_REST_DY = 25;
    const LEFT_REST_ANGLE = -25;

    const RIGHT_REST_DX = 75;
    const RIGHT_REST_DY = 10;
    const RIGHT_REST_ANGLE = 30;

    // Movement responsiveness
    const trackingTilt = xFactor * 8; 
    const trackingVertical = yFactor * 20; 
    const trackingSqueeze = xFactor * 15;

    let leftT = { dx: LEFT_REST_DX + trackingSqueeze, dy: LEFT_REST_DY + trackingVertical, angle: LEFT_REST_ANGLE + trackingTilt };
    let rightT = { dx: RIGHT_REST_DX + trackingSqueeze, dy: RIGHT_REST_DY + trackingVertical, angle: RIGHT_REST_ANGLE + trackingTilt };

    // Hover Override - The "Gliding" targets
    if (isConnectHovered) {
      // Transition to centered converged state
      leftT = { 
        dx: LEFT_REST_DX + 50,    // Slide inward
        dy: LEFT_REST_DY - 25,    // Lift up
        angle: LEFT_REST_ANGLE + 60 // Rotate inward (final angle ~35deg)
      };
      
      rightT = { 
        dx: RIGHT_REST_DX - 50,   // Slide inward
        dy: RIGHT_REST_DY - 25,   // Lift up
        angle: RIGHT_REST_ANGLE - 60 // Rotate inward (final angle ~-30deg)
      };
    }

    return { left: leftT, right: rightT };
  }

  const pupils = getPupilTransforms();
  const { left: leftEB, right: rightEB } = getEyebrowTransforms();

  const eyeWhiteColor = isDarkMode ? '#000000' : '#EEEEEE';

  // Rotation centers for eyebrows (must match SVG coordinates)
  const EB_L_CX = 286;
  const EB_L_CY = 238;
  const EB_R_CX = 574;
  const EB_R_CY = 239;

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
        <g transform={`translate(${pupils.left.dx}, ${pupils.left.dy})`}>
          <ellipse cx="213" cy="395" rx="55" ry="45" fill="currentColor"/>
        </g>
      </g>
      
      {/* Left Eyebrow - Unified smooth transform */}
      <g 
        transform={`translate(${leftEB.dx}, ${leftEB.dy}) rotate(${leftEB.angle}, ${EB_L_CX}, ${EB_L_CY})`}
        style={{ 
          willChange: 'transform',
          transition: 'transform 0.45s cubic-bezier(0.23, 1, 0.32, 1)' 
        }}
      >
        <path d="M371.513 318.177L358.587 329.736C350.61 336.869 338.44 336.494 330.918 328.883L200.698 197.134C192.798 189.141 192.994 176.221 201.134 168.472L223.07 147.588C231.394 139.662 244.659 140.327 252.149 149.045L373.359 290.12C380.486 298.415 379.665 310.887 371.513 318.177Z" fill="currentColor" stroke="currentColor" strokeWidth="10.0412" transform="translate(24.26, -13.98)"></path>
      </g>

      {/* Right Eye */}
      <path d="M650.904 457.91C576.786 463.524 524.151 480.789 523.404 421.41C522.658 362.031 620.677 307.424 692.404 315.91C751.877 322.946 810.404 355.91 801.404 428.41C794.956 480.354 725.023 452.296 650.904 457.91Z" fill={eyeWhiteColor} stroke="currentColor" strokeWidth="3"></path>
      <g clipPath="url(#rightEyeClip)">
        <g transform={`translate(${pupils.right.dx}, ${pupils.right.dy})`}>
          <ellipse cx="667" cy="395" rx="55" ry="45" fill="currentColor"/>
        </g>
      </g>
      
      {/* Right Eyebrow - Unified smooth transform */}
      <g 
        transform={`translate(${rightEB.dx}, ${rightEB.dy}) rotate(${rightEB.angle}, ${EB_R_CX}, ${EB_R_CY})`}
        style={{ 
          willChange: 'transform',
          transition: 'transform 0.45s cubic-bezier(0.23, 1, 0.32, 1)' 
        }}
      >
        <path d="M603.446 147.589L497.186 306.039C491.008 315.251 493.468 327.726 502.679 333.903L507.902 337.406C516.692 343.3 528.548 341.362 535.003 332.974L651.597 181.453C658.674 172.256 656.505 158.991 646.866 152.527L631.311 142.095C622.099 135.918 609.624 138.377 603.446 147.589Z" fill="currentColor" stroke="currentColor" strokeWidth="10.0412" transform="translate(24.26, -13.98)"></path>
      </g>
      
      {/* Mouth Component with consistent transitioned state */}
      <g className="mouth-group">
        <path 
          transform="scale(1.43) translate(-4, -3)" 
          d="M303.755 322.279C303.755 322.279 306.533 301.467 315.204 302.897C317.611 303.294 319.874 305.306 321.63 307.387C322.882 308.872 326.005 308.326 326.714 306.517C327.558 304.369 328.793 302.219 330.549 301.169C337.703 296.892 347.191 314.644 347.191 314.644" 
          stroke="currentColor" 
          strokeWidth="2.25" 
          strokeLinecap="round"
          pathLength="1"
          style={{ 
            strokeDasharray: '1',
            strokeDashoffset: isConnectHovered ? '1' : '0',
            opacity: isConnectHovered ? 0 : 1,
            transition: 'stroke-dashoffset 0.6s ease-in-out, opacity 0.3s ease-in-out',
            willChange: 'stroke-dashoffset'
          }}
        />

        <g transform="translate(-10, 25)">
          <path 
            d="M481.921 396.586L421.351 383.886C418.826 383.357 416.406 385.058 416.228 387.632C415.327 400.666 415.65 436.353 445.832 438.94C472.109 441.192 482.267 412.692 485.193 401.7C485.816 399.361 484.291 397.083 481.921 396.586Z" 
            stroke="currentColor" 
            strokeWidth="3" 
            fill="none"
            pathLength="1"
            style={{ 
              strokeDasharray: '1',
              strokeDashoffset: isConnectHovered ? '0' : '1',
              opacity: isConnectHovered ? 1 : 0,
              transition: 'stroke-dashoffset 0.6s ease-in-out, opacity 0.3s ease-in-out',
              willChange: 'stroke-dashoffset'
            }}
          />
        </g>
      </g>
    </svg>
  );
};
