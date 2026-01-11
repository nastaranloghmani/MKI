import React from 'react';

interface IconProps {
  className?: string;
}

export const CodeIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="square"
    strokeLinejoin="miter"
    className={className}
  >
    {/* Outer chip frame */}
    <rect x="3" y="3" width="18" height="18" />
    {/* Inner circuit pattern */}
    <path d="M8 8L8 12L12 12" />
    <path d="M16 8L16 12L12 12" />
    <path d="M12 12L12 16" />
    {/* Circuit nodes */}
    <rect x="7" y="7" width="2" height="2" />
    <rect x="15" y="7" width="2" height="2" />
    <rect x="11" y="11" width="2" height="2" />
    <rect x="11" y="15" width="2" height="2" />
    {/* Connection pins */}
    <path d="M3 9L1 9" />
    <path d="M3 15L1 15" />
    <path d="M21 9L23 9" />
    <path d="M21 15L23 15" />
  </svg>
);

export const CloudIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="square"
    strokeLinejoin="miter"
    className={className}
  >
    {/* Cloud shape */}
    <path d="M6 15H5C3.5 15 2 13.5 2 12C2 10.5 3.5 9 5 9C5 6 7.5 4 10 4C12 4 13.5 5 14.5 6.5C15 6 16 5.5 17 5.5C19.5 5.5 21.5 7.5 21.5 10C21.5 10.5 21.5 11 21.3 11.5C22.3 12 23 13 23 14C23 15.5 21.5 17 20 17H18" strokeWidth="1.5" />

    {/* Server rack / data center below cloud */}
    <rect x="7" y="17" width="10" height="5" strokeWidth="1.5" />
    {/* Server lines */}
    <path d="M9 19H15" strokeWidth="1" />
    <path d="M9 20.5H13" strokeWidth="1" />
    {/* Server indicator lights */}
    <circle cx="16" cy="19" r="0.5" fill="currentColor" />
    <circle cx="16" cy="20.5" r="0.5" fill="currentColor" />

    {/* Upload arrow */}
    <path d="M10 17V13" strokeWidth="1.5" />
    <path d="M8 15L10 13L12 15" strokeWidth="1.5" />

    {/* Download arrow */}
    <path d="M14 13V17" strokeWidth="1.5" />
    <path d="M12 15L14 17L16 15" strokeWidth="1.5" />

    {/* Connection nodes */}
    <circle cx="10" cy="13" r="1" fill="currentColor" />
    <circle cx="14" cy="13" r="1" fill="currentColor" />
  </svg>
);

export const ChartIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="square"
    strokeLinejoin="miter"
    className={className}
  >
    {/* Axes */}
    <path d="M4 20L4 4" />
    <path d="M4 20L20 20" />
    {/* Data visualization bars with geometric design */}
    <path d="M7 16L7 20" />
    <path d="M7 16L7 12L9 12L9 16" />
    <path d="M11 10L11 20" />
    <path d="M11 10L11 6L13 6L13 10" />
    <path d="M15 8L15 20" />
    <path d="M15 8L15 4L17 4L17 8" />
    {/* Connecting trend line */}
    <path d="M8 14L12 8L16 6" strokeWidth="1.5" strokeDasharray="2 2" />
    {/* Data points */}
    <rect x="7" y="13" width="2" height="2" fill="currentColor" />
    <rect x="11" y="7" width="2" height="2" fill="currentColor" />
    <rect x="15" y="5" width="2" height="2" fill="currentColor" />
  </svg>
);

export const GlobeIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="square"
    strokeLinejoin="miter"
    className={className}
  >
    {/* Outer octagon */}
    <path d="M9 3L15 3L21 9L21 15L15 21L9 21L3 15L3 9Z" />
    {/* Meridian lines */}
    <path d="M12 3L12 21" />
    <path d="M3 12L21 12" />
    {/* Diagonal cross lines */}
    <path d="M7 7L17 17" strokeWidth="1" />
    <path d="M17 7L7 17" strokeWidth="1" />
    {/* Orbital rings */}
    <path d="M6 6L6 4L8 4" strokeWidth="2" />
    <path d="M18 6L18 4L16 4" strokeWidth="2" />
    <path d="M6 18L6 20L8 20" strokeWidth="2" />
    <path d="M18 18L18 20L16 20" strokeWidth="2" />
    {/* Center node */}
    <circle cx="12" cy="12" r="2" strokeWidth="2" />
  </svg>
);

export const ShieldIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="square"
    strokeLinejoin="miter"
    className={className}
  >
    {/* Outer shield hexagon */}
    <path d="M12 3L20 7L20 13L12 21L4 13L4 7Z" />
    {/* Inner layer hexagon */}
    <path d="M12 6L17 9L17 13L12 18L7 13L7 9Z" strokeWidth="1.5" />
    {/* Center protection symbol */}
    <path d="M12 9L14.5 11L14.5 13L12 15L9.5 13L9.5 11Z" strokeWidth="1.5" />
    {/* Vertical reinforcement line */}
    <path d="M12 6L12 9" strokeWidth="1" />
    <path d="M12 15L12 18" strokeWidth="1" />
    {/* Corner nodes */}
    <circle cx="12" cy="6" r="0.5" fill="currentColor" />
    <circle cx="17" cy="9" r="0.5" fill="currentColor" />
    <circle cx="17" cy="13" r="0.5" fill="currentColor" />
    <circle cx="12" cy="18" r="0.5" fill="currentColor" />
    <circle cx="7" cy="13" r="0.5" fill="currentColor" />
    <circle cx="7" cy="9" r="0.5" fill="currentColor" />
  </svg>
);

export const ProcessorIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="square"
    strokeLinejoin="miter"
    className={className}
  >
    {/* Outer processor frame */}
    <rect x="6" y="6" width="12" height="12" />
    {/* Inner core */}
    <rect x="9" y="9" width="6" height="6" strokeWidth="1.5" />
    {/* Connection pins - top */}
    <path d="M9 6L9 3" />
    <path d="M12 6L12 3" />
    <path d="M15 6L15 3" />
    {/* Connection pins - bottom */}
    <path d="M9 18L9 21" />
    <path d="M12 18L12 21" />
    <path d="M15 18L15 21" />
    {/* Connection pins - left */}
    <path d="M6 9L3 9" />
    <path d="M6 12L3 12" />
    <path d="M6 15L3 15" />
    {/* Connection pins - right */}
    <path d="M18 9L21 9" />
    <path d="M18 12L21 12" />
    <path d="M18 15L21 15" />
    {/* Internal circuit pattern */}
    <path d="M10.5 10.5L13.5 10.5" strokeWidth="1" />
    <path d="M10.5 12L13.5 12" strokeWidth="1" />
    <path d="M10.5 13.5L13.5 13.5" strokeWidth="1" />
    {/* Corner nodes */}
    <rect x="8.5" y="8.5" width="1" height="1" fill="currentColor" />
    <rect x="14.5" y="8.5" width="1" height="1" fill="currentColor" />
    <rect x="8.5" y="14.5" width="1" height="1" fill="currentColor" />
    <rect x="14.5" y="14.5" width="1" height="1" fill="currentColor" />
  </svg>
);

export const TargetIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="square"
    strokeLinejoin="miter"
    className={className}
  >
    {/* Outer targeting square */}
    <rect x="3" y="3" width="18" height="18" />
    {/* Middle hexagon ring */}
    <path d="M12 6L16 9L16 15L12 18L8 15L8 9Z" strokeWidth="1.5" />
    {/* Inner target center */}
    <rect x="10" y="10" width="4" height="4" />
    {/* Crosshair lines */}
    <path d="M12 3L12 6" strokeWidth="1.5" />
    <path d="M12 18L12 21" strokeWidth="1.5" />
    <path d="M3 12L6 12" strokeWidth="1.5" />
    <path d="M18 12L21 12" strokeWidth="1.5" />
    {/* Corner markers */}
    <path d="M3 3L5 3L5 5" strokeWidth="1" />
    <path d="M21 3L19 3L19 5" strokeWidth="1" />
    <path d="M3 21L5 21L5 19" strokeWidth="1" />
    <path d="M21 21L19 21L19 19" strokeWidth="1" />
    {/* Center node */}
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
  </svg>
);

export const BoltIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="square"
    strokeLinejoin="miter"
    className={className}
  >
    {/* Geometric lightning bolt */}
    <path d="M13 3L7 13L12 13L11 21L17 11L12 11L13 3Z" strokeWidth="1.5" />
    {/* Energy containment frame */}
    <path d="M8 5L6 5L6 7" strokeWidth="1" />
    <path d="M16 5L18 5L18 7" strokeWidth="1" />
    <path d="M8 19L6 19L6 17" strokeWidth="1" />
    <path d="M16 19L18 19L18 17" strokeWidth="1" />
    {/* Energy nodes */}
    <circle cx="13" cy="3" r="1" fill="currentColor" />
    <circle cx="11" cy="21" r="1" fill="currentColor" />
    <circle cx="7" cy="13" r="1" fill="currentColor" />
    <circle cx="17" cy="11" r="1" fill="currentColor" />
    {/* Power lines */}
    <path d="M4 10L6 10" strokeWidth="1" />
    <path d="M4 14L6 14" strokeWidth="1" />
    <path d="M18 10L20 10" strokeWidth="1" />
    <path d="M18 14L20 14" strokeWidth="1" />
  </svg>
);

export const GrowthIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="square"
    strokeLinejoin="miter"
    className={className}
  >
    {/* Geometric tree/growth structure */}
    {/* Base/trunk */}
    <path d="M12 21L12 12" strokeWidth="2" />
    {/* Root system */}
    <path d="M12 21L9 19" strokeWidth="1" />
    <path d="M12 21L15 19" strokeWidth="1" />
    <path d="M9 19L7 20" strokeWidth="1" />
    <path d="M15 19L17 20" strokeWidth="1" />
    {/* Growth layers - bottom */}
    <path d="M12 16L8 13L16 13Z" strokeWidth="1.5" />
    {/* Growth layers - middle */}
    <path d="M12 12L9 9L15 9Z" strokeWidth="1.5" />
    {/* Growth layers - top */}
    <path d="M12 9L10 6L14 6Z" strokeWidth="1.5" />
    {/* Top node/peak */}
    <path d="M12 6L12 3" strokeWidth="1.5" />
    {/* Growth nodes */}
    <circle cx="12" cy="16" r="1" fill="currentColor" />
    <circle cx="12" cy="12" r="1" fill="currentColor" />
    <circle cx="12" cy="9" r="1" fill="currentColor" />
    <circle cx="12" cy="6" r="1" fill="currentColor" />
    <circle cx="12" cy="3" r="1.5" fill="currentColor" />
    {/* Side branches */}
    <path d="M8 13L6 12" strokeWidth="1" />
    <path d="M16 13L18 12" strokeWidth="1" />
    <path d="M9 9L7 8" strokeWidth="1" />
    <path d="M15 9L17 8" strokeWidth="1" />
    {/* Container frame */}
    <path d="M3 21L21 21" strokeWidth="1.5" />
    <path d="M4 3L6 3" strokeWidth="1" />
    <path d="M18 3L20 3" strokeWidth="1" />
  </svg>
);
