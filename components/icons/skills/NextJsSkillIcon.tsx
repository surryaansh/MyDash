import React from 'react';

interface IconProps {
  className?: string;
}

/**
 * Next.js skill icon component.
 * Combines the Next.js logo and text side-by-side.
 */
export const NextJsSkillIcon: React.FC<IconProps> = ({ className }) => {
  return (
    <div className={`${className} flex items-center justify-center gap-1.5 md:gap-2`}>
      {/* Logo Part */}
      <svg
        viewBox="0 0 512 512"
        className="h-full w-auto flex-shrink-0"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g transform="translate(.722 .64) scale(6.375)">
          <circle cx="40" cy="40" r="40" fill="currentColor" />
          <path
            d="M66.448 70.009L30.73 24H24v31.987h5.384v-25.15l32.838 42.427a40.116 40.116 0 004.226-3.255z"
            fill="url(#nextjs-gradient-1)"
            fillRule="nonzero"
          />
          <path fill="url(#nextjs-gradient-2)" d="M51.111 24h5.333v32h-5.333z" />
        </g>
        <defs>
          <linearGradient
            id="nextjs-gradient-1"
            x1="0"
            y1="0"
            x2="1"
            y2="0"
            gradientUnits="userSpaceOnUse"
            gradientTransform="rotate(51.103 -29.93 76.555) scale(25.1269)"
          >
            <stop offset="0" stopColor="white" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <linearGradient
            id="nextjs-gradient-2"
            x1="0"
            y1="0"
            x2="1"
            y2="0"
            gradientUnits="userSpaceOnUse"
            gradientTransform="rotate(90.218 14.934 38.787) scale(23.50017)"
          >
            <stop offset="0" stopColor="white" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {/* Text Part */}
      <svg
        viewBox="0 0 257.95 155.96"
        className="h-[55%] w-auto flex-shrink-0 mt-0.5"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
      >
        <path d="M443.89,474.7h48.65v3.88H448.35v29.17h41.56v3.88H448.35v32H493v3.88H443.89Zm53,0h5.17l22.91,32,23.41-32L580.24,434l-52.32,76.06,27,37.43H549.5L525,513.45l-24.63,34.06h-5.27l27.16-37.43L496.9,474.7Zm59.9,3.88V474.7h55.44v3.88H586.7v68.94h-4.46V478.57H556.8ZM383,474.7h5.58L465.47,590,433.7,547.51l-46-67.31-.2,67.31H383ZM611.8,542.47a1.62,1.62,0,1,1,1.59-1.62,1.58,0,0,1-1.59,1.62Zm4.38-4.27h2.39a2.18,2.18,0,0,0,2.36,2.17c1.55,0,2.43-.93,2.43-2.69v-11.1h2.43v11.11c0,3.16-1.82,5-4.84,5-2.83,0-4.77-1.76-4.77-4.46Zm12.79-.14h2.41c.21,1.49,1.66,2.44,3.75,2.44s3.38-1,3.38-2.41c0-1.2-.91-1.92-3-2.41l-2-.49c-2.83-.66-4.12-2-4.12-4.34,0-2.8,2.28-4.66,5.69-4.66,3.18,0,5.5,1.86,5.64,4.51h-2.36c-.23-1.45-1.48-2.35-3.31-2.35s-3.2.93-3.2,2.34c0,1.12.82,1.76,2.86,2.24l1.72.42c3.21.75,4.53,2.06,4.53,4.42,0,3-2.32,4.89-6,4.89-3.47,0-5.8-1.8-6-4.61Z" transform="translate(-383.02 -434.02)" />
      </svg>
    </div>
  );
};
