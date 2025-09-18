import React, { useRef, useState, useEffect } from 'react';

interface InteractiveFaceIconProps {
  cursorPosition: { x: number; y: number };
  isDarkMode: boolean;
}

export const InteractiveFaceIcon: React.FC<InteractiveFaceIconProps> = ({ cursorPosition, isDarkMode }) => {
  const faceRef = useRef<SVGSVGElement>(null);
  const [centers, setCenters] = useState({
    face: { x: 0, y: 0, width: 0, height: 0 },
    leftEye: { x: 0, y: 0 },
    rightEye: { x: 0, y: 0 },
  });

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    const calculateCenters = () => {
      if (faceRef.current) {
        const faceRect = faceRef.current.getBoundingClientRect();
        if (faceRect.width === 0) return; // Avoid calculating if not rendered

        const viewBox = { x: 67, y: 105, width: 745, height: 364 };
        const scaleX = faceRect.width / viewBox.width;
        const scaleY = faceRect.height / viewBox.height;

        const getScreenCoords = (svgX: number, svgY: number) => ({
          x: faceRect.left + (svgX - viewBox.x) * scaleX,
          y: faceRect.top + (svgY - viewBox.y) * scaleY,
        });

        setCenters({
          face: { x: faceRect.left + faceRect.width / 2, y: faceRect.top + faceRect.height / 2, width: faceRect.width, height: faceRect.height },
          leftEye: getScreenCoords(208, 386),
          rightEye: getScreenCoords(662, 386),
        });
      }
    };
    
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(calculateCenters, 100);
    };

    calculateCenters();
    window.addEventListener('resize', handleResize);
    
    // Recalculate after a short delay to ensure layout is stable
    const timer = setTimeout(calculateCenters, 500);

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const getPupilTransform = (eyeCenter: { x: number; y: number }) => {
    if (!eyeCenter.x || !eyeCenter.y) return { dx: 0, dy: 0 };
    const dx = cursorPosition.x - eyeCenter.x;
    const dy = cursorPosition.y - eyeCenter.y;
    const angle = Math.atan2(dy, dx);
    // Make movement more subtle and contained
    const distance = Math.min(15, Math.sqrt(dx * dx + dy * dy) * 0.1);
    return {
      dx: Math.cos(angle) * distance,
      dy: Math.sin(angle) * distance,
    };
  };

  const leftPupil = getPupilTransform(centers.leftEye);
  const rightPupil = getPupilTransform(centers.rightEye);

  let leftEyebrowTransform = { angle: 0, dy: 0 };
  let rightEyebrowTransform = { angle: 0, dy: 0 };

  if (centers.face.width > 0 && centers.face.x > 0) {
    const W = centers.face.width;
    const H = centers.face.height;

    const dx = cursorPosition.x - centers.face.x;
    const dy = cursorPosition.y - centers.face.y;
    
    // Normalize cursor position relative to the face, from -1 to 1
    const x_factor = Math.max(-1, Math.min(1, dx / (W / 2)));
    const y_factor = Math.max(-1, Math.min(1, dy / (H / 1.5)));

    // Horizontal movement tilts both eyebrows
    const tilt = x_factor * 15;

    let verticalOffset = 0;
    let frownAngle = 0;

    if (y_factor < 0) { // Cursor is above the face center
      // Eyebrows go up
      verticalOffset = y_factor * 20;
    } else { // Cursor is below the face center
      // Eyebrows go down and frown
      verticalOffset = y_factor * 10;
      frownAngle = y_factor * 15; // More rotation for a frown
    }
    
    // Combine transformations
    leftEyebrowTransform = {
      angle: tilt + frownAngle,
      dy: verticalOffset,
    };
    rightEyebrowTransform = {
      angle: tilt - frownAngle,
      dy: verticalOffset,
    };
  }

  const eyeWhiteColor = isDarkMode ? '#000000' : '#EEEEEE';

  // SVG coordinates for rotation centers of eyebrows
  const leftEyebrowSVG_CX = 286;
  const leftEyebrowSVG_CY = 238;
  const rightEyebrowSVG_CX = 574;
  const rightEyebrowSVG_CY = 239;

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
        <path d="M245.394 419.322C225.669 415.393 191.257 402.188 193.279 374.296C195.738 340.37 235.38 335.212 269.295 341.696C297.416 347.073 334.775 353.691 324.511 392.091C316.323 422.725 265.119 423.251 245.394 419.322Z" fill="currentColor" stroke="currentColor" strokeWidth="21.7077" transform={`translate(${leftPupil.dx}, ${leftPupil.dy})`}></path>
      </g>
      
      {/* Left Eyebrow */}
      <g 
        style={{ transition: 'transform 0.1s ease-out' }} 
        transform={`
          translate(0, ${leftEyebrowTransform.dy}) 
          rotate(${leftEyebrowTransform.angle}, ${leftEyebrowSVG_CX}, ${leftEyebrowSVG_CY})
        `}
      >
        <g transform="translate(-72, -9) rotate(-25, 286, 238)">
          <path d="M371.513 318.177L358.587 329.736C350.61 336.869 338.44 336.494 330.918 328.883L200.698 197.134C192.798 189.141 192.994 176.221 201.134 168.472L223.07 147.588C231.394 139.662 244.659 140.327 252.149 149.045L373.359 290.12C380.486 298.415 379.665 310.887 371.513 318.177Z" fill="currentColor" stroke="currentColor" strokeWidth="10.0412" transform="translate(24.26, -13.98)"></path>
        </g>
      </g>

      {/* Right Eye */}
      <path d="M650.904 457.91C576.786 463.524 524.151 480.789 523.404 421.41C522.658 362.031 620.677 307.424 692.404 315.91C751.877 322.946 810.404 355.91 801.404 428.41C794.956 480.354 725.023 452.296 650.904 457.91Z" fill={eyeWhiteColor} stroke="currentColor" strokeWidth="3"></path>
      <g clipPath="url(#rightEyeClip)">
        <path d="M698.394 422.322C678.669 418.393 644.257 405.188 646.279 377.296C648.738 343.37 688.38 338.212 722.295 344.696C750.416 350.073 787.775 356.691 777.511 395.091C769.323 425.725 718.119 426.251 698.394 422.322Z" fill="currentColor" stroke="currentColor" strokeWidth="21.7077" transform={`translate(${rightPupil.dx}, ${rightPupil.dy})`}></path>
      </g>
      
      {/* Right Eyebrow */}
      <g 
        style={{ transition: 'transform 0.1s ease-out' }} 
        transform={`
          translate(0, ${rightEyebrowTransform.dy}) 
          rotate(${rightEyebrowTransform.angle}, ${rightEyebrowSVG_CX}, ${rightEyebrowSVG_CY})
        `}
      >
        <g transform="translate(112, -24) rotate(30, 574, 239)">
          <path d="M603.446 147.589L497.186 306.039C491.008 315.251 493.468 327.726 502.679 333.903L507.902 337.406C516.692 343.3 528.548 341.362 535.003 332.974L651.597 181.453C658.674 172.256 656.505 158.991 646.866 152.527L631.311 142.095C622.099 135.918 609.624 138.377 603.446 147.589Z" fill="currentColor" stroke="currentColor" strokeWidth="10.0412" transform="translate(24.26, -13.98)"></path>
        </g>
      </g>
      
      {/* Mouth */}
      <path transform="scale(1.43) translate(-4, -3)" d="M303.755 322.279C303.755 322.279 306.533 301.467 315.204 302.897C317.611 303.294 319.874 305.306 321.63 307.387C322.882 308.872 326.005 308.326 326.714 306.517C327.558 304.369 328.793 302.219 330.549 301.169C337.703 296.892 347.191 314.644 347.191 314.644" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" opacity="1" pathLength="1" strokeDashoffset="0px" strokeDasharray="1px 1px"></path>
    </svg>
  );
};
