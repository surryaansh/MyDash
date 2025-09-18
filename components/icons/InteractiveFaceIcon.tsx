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
    scale: { x: 1, y: 1 },
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
          leftEye: getScreenCoords(213, 387),
          rightEye: getScreenCoords(667, 387),
          scale: { x: scaleX, y: scaleY },
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

  const getPupilTransform = (eyeCenter: { x: number; y: number }) => {
    if (!eyeCenter.x || !eyeCenter.y || centers.scale.x === 0 || centers.scale.y === 0) {
      return { dx: 0, dy: 0 };
    }
    
    const maxTravelX = 60;
    const maxTravelY = 30;
    const sensitivity = 0.4;

    // Calculate displacement in screen pixels
    const dx_pixels = (cursorPosition.x - eyeCenter.x) * sensitivity;
    const dy_pixels = (cursorPosition.y - eyeCenter.y) * sensitivity;
    
    // Convert pixel displacement to SVG coordinate units
    let dx = dx_pixels / centers.scale.x;
    let dy = dy_pixels / centers.scale.y;

    // Use an elliptical constraint to ensure natural movement
    const ellipseRatio = (dx / maxTravelX) ** 2 + (dy / maxTravelY) ** 2;

    if (ellipseRatio > 1) {
      const scale = 1 / Math.sqrt(ellipseRatio);
      dx *= scale;
      dy *= scale;
    }
    
    return { dx, dy };
  };

  const leftPupil = getPupilTransform(centers.leftEye);
  const rightPupil = getPupilTransform(centers.rightEye);

  let leftEyebrowTransform = { angle: 0, dx: 0, dy: 0 };
  let rightEyebrowTransform = { angle: 0, dx: 0, dy: 0 };

  if (centers.face.width > 0 && centers.face.x > 0) {
    const W = centers.face.width;
    const H = centers.face.height;

    const dx = cursorPosition.x - centers.face.x;
    const dy = cursorPosition.y - centers.face.y;
    
    const x_factor = Math.max(-1, Math.min(1, dx / (W / 2)));
    const y_factor = Math.max(-1, Math.min(1, dy / (H / 1.5)));

    const tilt = x_factor * 8;
    const verticalOffset = y_factor * (y_factor < 0 ? 15 : 8);
    const frownAngle = y_factor > 0 ? y_factor * 10 : 0;
    const horizontalOffset = y_factor * -4;

    leftEyebrowTransform = {
      angle: tilt + frownAngle,
      dx: horizontalOffset,
      dy: verticalOffset,
    };
    rightEyebrowTransform = {
      angle: tilt - frownAngle,
      dx: -horizontalOffset,
      dy: verticalOffset,
    };
  }

  const eyeWhiteColor = isDarkMode ? '#000000' : '#EEEEEE';
  const pupilHighlightColor = isDarkMode ? '#333333' : '#FFFFFF';

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
        <g transform={`translate(${leftPupil.dx}, ${leftPupil.dy})`}>
          <ellipse cx="213" cy="387" rx="55" ry="40" fill="currentColor"/>
          <ellipse cx="235" cy="367" rx="15" ry="10" fill={pupilHighlightColor} opacity="0.8" />
        </g>
      </g>
      
      {/* Left Eyebrow */}
      <g 
        style={{ transition: 'transform 0.1s ease-out' }} 
        transform={`
          translate(${leftEyebrowTransform.dx}, ${leftEyebrowTransform.dy}) 
          rotate(${leftEyebrowTransform.angle}, ${leftEyebrowSVG_CX}, ${leftEyebrowSVG_CY})
        `}
      >
        <g transform="translate(-60, 15) rotate(-25, 286, 238)">
          <path d="M371.513 318.177L358.587 329.736C350.61 336.869 338.44 336.494 330.918 328.883L200.698 197.134C192.798 189.141 192.994 176.221 201.134 168.472L223.07 147.588C231.394 139.662 244.659 140.327 252.149 149.045L373.359 290.12C380.486 298.415 379.665 310.887 371.513 318.177Z" fill="currentColor" stroke="currentColor" strokeWidth="10.0412" transform="translate(24.26, -13.98)"></path>
        </g>
      </g>

      {/* Right Eye */}
      <path d="M650.904 457.91C576.786 463.524 524.151 480.789 523.404 421.41C522.658 362.031 620.677 307.424 692.404 315.91C751.877 322.946 810.404 355.91 801.404 428.41C794.956 480.354 725.023 452.296 650.904 457.91Z" fill={eyeWhiteColor} stroke="currentColor" strokeWidth="3"></path>
      <g clipPath="url(#rightEyeClip)">
        <g transform={`translate(${rightPupil.dx}, ${rightPupil.dy})`}>
          <ellipse cx="667" cy="387" rx="55" ry="40" fill="currentColor"/>
          <ellipse cx="689" cy="367" rx="15" ry="10" fill={pupilHighlightColor} opacity="0.8" />
        </g>
      </g>
      
      {/* Right Eyebrow */}
      <g 
        style={{ transition: 'transform 0.1s ease-out' }} 
        transform={`
          translate(${rightEyebrowTransform.dx}, ${rightEyebrowTransform.dy}) 
          rotate(${rightEyebrowTransform.angle}, ${rightEyebrowSVG_CX}, ${rightEyebrowSVG_CY})
        `}
      >
        <g transform="translate(100, 0) rotate(30, 574, 239)">
          <path d="M603.446 147.589L497.186 306.039C491.008 315.251 493.468 327.726 502.679 333.903L507.902 337.406C516.692 343.3 528.548 341.362 535.003 332.974L651.597 181.453C658.674 172.256 656.505 158.991 646.866 152.527L631.311 142.095C622.099 135.918 609.624 138.377 603.446 147.589Z" fill="currentColor" stroke="currentColor" strokeWidth="10.0412" transform="translate(24.26, -13.98)"></path>
        </g>
      </g>
      
      {/* Mouth */}
      <path transform="scale(1.43) translate(-4, -3)" d="M303.755 322.279C303.755 322.279 306.533 301.467 315.204 302.897C317.611 303.294 319.874 305.306 321.63 307.387C322.882 308.872 326.005 308.326 326.714 306.517C327.558 304.369 328.793 302.219 330.549 301.169C337.703 296.892 347.191 314.644 347.191 314.644" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" opacity="1" pathLength="1" strokeDashoffset="0px" strokeDasharray="1px 1px"></path>
    </svg>
  );
};