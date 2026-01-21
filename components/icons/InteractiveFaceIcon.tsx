
import React, { useRef, useState, useEffect } from 'react';

interface InteractiveFaceIconProps {
  /** The global document-relative mouse position provided by the parent component. */
  cursorPosition: { x: number; y: number };
  isDarkMode: boolean;
  isConnectHovered?: boolean;
}

/**
 * An interactive SVG face icon.
 * Features a dual-layer cross-fade for eyebrows and organic, asymmetric pupil tracking.
 */
export const InteractiveFaceIcon: React.FC<InteractiveFaceIconProps> = ({ cursorPosition, isDarkMode, isConnectHovered = false }) => {
  const faceRef = useRef<SVGSVGElement>(null);

  const [elementPositions, setElementPositions] = useState({
    face: { x: 0, y: 0, width: 0, height: 0 },
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

      setElementPositions({
        face: { 
          x: docLeft + faceRect.width / 2, 
          y: docTop + (faceRect.height * 0.7), 
          width: faceRect.width, 
          height: faceRect.height 
        },
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
    const { face, scale } = elementPositions;
    if (face.width === 0 || face.x === 0) return { left: { dx: 0, dy: 0 }, right: { dx: 0, dy: 0 } };

    // Common tracking base
    const rawDx = (cursorPosition.x - face.x) / scale.x;
    const rawDy = (cursorPosition.y - face.y) / scale.y;

    /**
     * Helper to apply asymmetric sensitivity and limits to each eye
     * This creates "freeness" so they don't look like a single rigid unit.
     */
    const getEyeMove = (sX: number, sY: number, maxX: number, maxY: number, isLeft: boolean) => {
      let tx = rawDx * sX;
      let ty = rawDy * sY;

      // Add flinch pull
      if (isConnectHovered) {
        tx += isLeft ? 38 : -38;
        ty += 24;
      }

      // Constrain within elliptical bound
      const ratio = (tx / maxX) ** 2 + (ty / maxY) ** 2;
      if (ratio > 1) {
        const factor = 1 / Math.sqrt(ratio);
        tx *= factor;
        ty *= factor;
      }
      return { dx: tx, dy: ty };
    };

    // Left eye: More sensitive to X, larger horizontal travel
    const left = getEyeMove(0.48, 0.44, 62, 34, true);
    // Right eye: More sensitive to Y, tighter horizontal travel
    const right = getEyeMove(0.42, 0.46, 58, 36, false);

    return { left, right };
  };

  const getTrackingEyebrows = () => {
    const { face } = elementPositions;
    if (face.width === 0 || face.x === 0) return { left: '', right: '' };

    const dx = cursorPosition.x - face.x;
    const dy = cursorPosition.y - face.y;
    const xFactor = Math.max(-1, Math.min(1, dx / (face.width / 2)));
    const yFactor = Math.max(-1, Math.min(1, dy / (face.height / 1.5)));

    const moveX = xFactor * 18;
    const moveY = yFactor * 10;
    const rot = xFactor * 6;

    return {
      left: `translate(${moveX}, ${moveY}) rotate(${rot}, 286, 238)`,
      right: `translate(${moveX}, ${moveY}) rotate(${rot}, 574, 239)`
    };
  };

  const pupils = getPupilTransforms();
  const trackingEB = getTrackingEyebrows();
  const eyeWhiteColor = isDarkMode ? '#000000' : '#EEEEEE';

  const crossFadeStyle = {
    transition: 'opacity 0.4s ease-in-out, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
    willChange: 'opacity, transform'
  };

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
      
      {/* Left Eye Assembly - Shifts right by exactly 2% (15px) on flinch */}
      <g style={{ transition: 'transform 0.4s ease-in-out', transform: isConnectHovered ? 'translateX(15px)' : 'translateX(0)' }}>
        <path d="M197 457.91C122.881 463.524 70.2463 480.789 69.4998 421.41C68.7534 362.031 166.773 307.424 238.5 315.91C297.973 322.946 356.5 355.91 347.5 428.41C341.052 480.354 271.118 452.296 197 457.91Z" fill={eyeWhiteColor} stroke="currentColor" strokeWidth="3"></path>
        <g clipPath="url(#leftEyeClip)">
          <g 
            transform={`translate(${pupils.left.dx}, ${pupils.left.dy})`}
            style={{ transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)' }}
          >
            <ellipse cx="213" cy="395" rx="55" ry="45" fill="currentColor"/>
          </g>
        </g>
        
        {/* Left Eyebrow Layers */}
        <g 
          transform={trackingEB.left} 
          style={{ ...crossFadeStyle, opacity: isConnectHovered ? 0 : 1 }}
        >
          <path d="M371.513 318.177L358.587 329.736C350.61 336.869 338.44 336.494 330.918 328.883L200.698 197.134C192.798 189.141 192.994 176.221 201.134 168.472L223.07 147.588C231.394 139.662 244.659 140.327 252.149 149.045L373.359 290.12C380.486 298.415 379.665 310.887 371.513 318.177Z" fill="currentColor" stroke="currentColor" strokeWidth="10" transform="translate(-40, 10) rotate(-25, 286, 238)"></path>
        </g>
        <g 
          transform={`translate(55, 30) rotate(32, ${EB_L_CX}, ${EB_L_CY})`} 
          style={{ ...crossFadeStyle, opacity: isConnectHovered ? 1 : 0 }}
        >
          <path d="M371.513 318.177L358.587 329.736C350.61 336.869 338.44 336.494 330.918 328.883L200.698 197.134C192.798 189.141 192.994 176.221 201.134 168.472L223.07 147.588C231.394 139.662 244.659 140.327 252.149 149.045L373.359 290.12C380.486 298.415 379.665 310.887 371.513 318.177Z" fill="currentColor" stroke="currentColor" strokeWidth="10" transform="translate(-40, 10) rotate(-25, 286, 238)"></path>
        </g>
      </g>

      {/* Right Eye Assembly - Remains Stationary */}
      <g>
        <path d="M650.904 457.91C576.786 463.524 524.151 480.789 523.404 421.41C522.658 362.031 620.677 307.424 692.404 315.91C751.877 322.946 810.404 355.91 801.404 428.41C794.956 480.354 725.023 452.296 650.904 457.91Z" fill={eyeWhiteColor} stroke="currentColor" strokeWidth="3"></path>
        <g clipPath="url(#rightEyeClip)">
          <g 
            transform={`translate(${pupils.right.dx}, ${pupils.right.dy})`}
            style={{ transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)' }}
          >
            <ellipse cx="667" cy="395" rx="55" ry="45" fill="currentColor"/>
          </g>
        </g>
        
        {/* Right Eyebrow Layers */}
        <g 
          transform={trackingEB.right}
          style={{ ...crossFadeStyle, opacity: isConnectHovered ? 0 : 1 }}
        >
          <path d="M603.446 147.589L497.186 306.039C491.008 315.251 493.468 327.726 502.679 333.903L507.902 337.406C516.692 343.3 528.548 341.362 535.003 332.974L651.597 181.453C658.674 172.256 656.505 158.991 646.866 152.527L631.311 142.095C622.099 135.918 609.624 138.377 603.446 147.589Z" fill="currentColor" stroke="currentColor" strokeWidth="10" transform="translate(100, 0) rotate(30, 574, 239)"></path>
        </g>
        <g 
          transform={`translate(-55, 30) rotate(-32, ${EB_R_CX}, ${EB_R_CY})`}
          style={{ ...crossFadeStyle, opacity: isConnectHovered ? 1 : 0 }}
        >
          <path d="M603.446 147.589L497.186 306.039C491.008 315.251 493.468 327.726 502.679 333.903L507.902 337.406C516.692 343.3 528.548 341.362 535.003 332.974L651.597 181.453C658.674 172.256 656.505 158.991 646.866 152.527L631.311 142.095C622.099 135.918 609.624 138.377 603.446 147.589Z" fill="currentColor" stroke="currentColor" strokeWidth="10" transform="translate(100, 0) rotate(30, 574, 239)"></path>
        </g>
      </g>
      
      {/* Mouth Component */}
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
            transition: 'stroke-dashoffset 0.6s ease-in-out, opacity 0.3s ease-in-out'
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
              transition: 'stroke-dashoffset 0.6s ease-in-out, opacity 0.3s ease-in-out'
            }}
          />
        </g>
      </g>
    </svg>
  );
};
