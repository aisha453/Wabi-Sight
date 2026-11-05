import React from 'react';

export const BotanicalVignette: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Top Left Ivy Tendril */}
      <svg
        className="absolute -top-4 -left-4 w-44 h-44 sm:w-64 sm:h-64 opacity-40 text-emerald-400 transition-opacity"
        viewBox="0 0 200 200"
        fill="currentColor"
      >
        <path d="M 0 0 C 40 10, 80 40, 100 80 C 110 100, 115 130, 130 160 C 120 150, 90 140, 80 110 C 65 75, 30 40, 0 30 Z" />
        {/* Leaflets */}
        <path d="M 45 25 C 60 15, 80 20, 85 35 C 80 50, 60 45, 45 25 Z" opacity="0.85" />
        <path d="M 75 55 C 95 45, 115 55, 120 70 C 110 85, 90 80, 75 55 Z" opacity="0.9" />
        <path d="M 95 95 C 120 90, 135 105, 138 120 C 125 130, 105 120, 95 95 Z" opacity="0.85" />
        <path d="M 25 15 C 35 5, 50 8, 55 18 C 48 26, 35 24, 25 15 Z" opacity="0.75" />
      </svg>

      {/* Top Right Flowering Branch */}
      <svg
        className="absolute -top-4 -right-4 w-44 h-44 sm:w-64 sm:h-64 opacity-40 text-emerald-400 scale-x-[-1] transition-opacity"
        viewBox="0 0 200 200"
        fill="currentColor"
      >
        <path d="M 0 0 C 40 10, 80 40, 100 80 C 110 100, 115 130, 130 160 C 120 150, 90 140, 80 110 C 65 75, 30 40, 0 30 Z" />
        <path d="M 45 25 C 60 15, 80 20, 85 35 C 80 50, 60 45, 45 25 Z" opacity="0.85" />
        <path d="M 75 55 C 95 45, 115 55, 120 70 C 110 85, 90 80, 75 55 Z" opacity="0.9" />
        <path d="M 95 95 C 120 90, 135 105, 138 120 C 125 130, 105 120, 95 95 Z" opacity="0.85" />
      </svg>

      {/* Subtle Sunbeam God Rays (Komorebi Effect) */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-amber-200/5 to-emerald-200/10 pointer-events-none" />
    </div>
  );
};
