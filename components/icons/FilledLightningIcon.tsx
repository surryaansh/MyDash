import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

export const FilledLightningIcon: React.FC<IconProps> = ({ className, ...props }) => {
  return (
    <svg 
      fill="currentColor" 
      viewBox="0 0 423.753 423.753" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path d="M373.392,181.353c-1.2-3.2-4-5.2-7.6-5.2h-122.8l105.6-163.6c2-3.2,1.6-7.6-1.2-10.4s-7.2-2.8-10.4-0.4l-284,224 c-2.8,2-3.6,5.6-2.8,8.8c0.8,3.2,4,5.2,7.6,5.2h117.6l-108.4,171.6c-2,3.2-1.6,7.6,1.6,10.4c1.6,1.2,3.6,2,5.2,2 c1.6,0,3.6-0.4,4.8-1.6l292-232C373.392,188.153,374.592,184.553,373.392,181.353z"/>
    </svg>
  );
};