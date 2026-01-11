import React from 'react'
import { useTheme } from '../context/ThemeContext'

interface LogoProps {
  className?: string
  animate?: boolean
}

export const Logo: React.FC<LogoProps> = ({ className = '', animate = true }) => {
  const { isDark } = useTheme()

  // Teal color matching the image
  const logoColor = "#4ECDC4"

  return (
    <div className={`relative group ${className}`}>
      {/* Constant subtle glow behind logo */}
      <div className={`absolute inset-0 blur-lg -z-10 ${isDark ? 'bg-cyan-400/10' : 'bg-cyan-400/5'}`} />

      <svg
        viewBox="0 0 420 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-full h-full ${
          isDark
            ? 'drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]'
            : 'drop-shadow-[0_0_4px_rgba(6,182,212,0.3)]'
        } ${animate ? 'transition-all duration-500 group-hover:scale-105 group-hover:drop-shadow-[0_0_20px_rgba(6,182,212,0.8)]' : ''}`}
      >
        {/* M Letter - as one solid shape */}
        <path
          d="M10 140 L10 5 L55 5 L110 80 L165 5 L210 5 L210 140 L170 140 L170 50 L115 125 L105 125 L50 50 L50 140 Z"
          fill={logoColor}
        />

        {/* K Letter - as one solid shape with angular design */}
        <path
          d="M230 140 L230 5 L270 5 L270 55 L335 5 L385 5 L300 75 L390 140 L340 140 L270 90 L270 140 Z"
          fill={logoColor}
        />

        {/* INNOVATIONS text */}
        <text
          x="10"
          y="178"
          fontFamily="Arial Black, Arial, sans-serif"
          fontSize="32"
          fontWeight="900"
          letterSpacing="3"
          fill={logoColor}
        >
          INNOVATIONS
        </text>
      </svg>

      {/* Glow effect on hover */}
      {animate && (
        <div className={`absolute inset-0 blur-xl transition-all duration-500 -z-10 ${
          isDark ? 'bg-cyan-400/0 group-hover:bg-cyan-400/25' : 'bg-cyan-400/0 group-hover:bg-cyan-400/15'
        }`} />
      )}
    </div>
  )
}
