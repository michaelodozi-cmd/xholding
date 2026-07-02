import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

export function Logo({ className = "", size = 32 }: LogoProps) {
  return (
    <svg 
      className={className} 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Rotated premium diamond card container */}
      <rect 
        x="18" 
        y="18" 
        width="64" 
        height="64" 
        rx="16" 
        transform="rotate(45 50 50)" 
        fill="url(#logo-bg-grad)" 
        stroke="url(#logo-border-grad)" 
        strokeWidth="3" 
      />
      {/* Stylized premium F */}
      <path 
        d="M40 32H64V40H40V48H58V56H40V68H32V32H40Z" 
        fill="url(#logo-f-grad)" 
      />
      <defs>
        <linearGradient id="logo-bg-grad" x1="18" y1="18" x2="82" y2="82" gradientUnits="userSpaceOnUse">
          <stop stopColor="#061209" />
          <stop offset="0.5" stopColor="#0b2212" />
          <stop offset="1" stopColor="#040e07" />
        </linearGradient>
        <linearGradient id="logo-border-grad" x1="18" y1="18" x2="82" y2="82" gradientUnits="userSpaceOnUse">
          <stop stopColor="#13c74b" />
          <stop offset="0.5" stopColor="#12b744" />
          <stop offset="1" stopColor="#0f8232" />
        </linearGradient>
        <linearGradient id="logo-f-grad" x1="32" y1="32" x2="64" y2="68" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffffff" />
          <stop offset="0.3" stopColor="#eefcf1" />
          <stop offset="1" stopColor="#13c74b" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function LogoText({ className = "font-semibold text-2xl tracking-tight text-white font-['Outfit']" }: { className?: string }) {
  return (
    <span className={className}>
      Fedility<span className="text-[#13c74b]">Holding</span>
    </span>
  );
}
