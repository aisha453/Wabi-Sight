import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Compass, Sparkles, UploadCloud, Leaf, Flower2 } from 'lucide-react';

interface AmbientPortalProps {
  isAnalyzing: boolean;
  imagePreview: string | null;
  onFileDrop?: (file: File) => void;
  cadenceSeconds?: number;
}

export const AmbientPortal: React.FC<AmbientPortalProps> = ({
  isAnalyzing,
  imagePreview,
  onFileDrop,
  cadenceSeconds = 5.5
}) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileDrop?.(e.dataTransfer.files[0]);
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className="flex-1 flex flex-col items-center justify-center relative py-6 sm:py-10 px-4 z-20 transition-all"
    >
      {/* Central Living Botanical Ensō Sanctuary */}
      <div className="relative w-72 h-72 sm:w-84 sm:h-84 flex items-center justify-center">
        {/* Animated Botanical Leaf & Floral Garland Ring */}
        <motion.div
          animate={{
            rotate: isAnalyzing ? 360 : 360,
            scale: isAnalyzing ? [1, 1.08, 1] : [0.97, 1.03, 0.97]
          }}
          transition={{
            rotate: { duration: isAnalyzing ? 8 : 45, repeat: Infinity, ease: 'linear' },
            scale: { duration: cadenceSeconds, repeat: Infinity, ease: 'easeInOut' }
          }}
          className="absolute inset-0 rounded-full pointer-events-none flex items-center justify-center"
        >
          {/* Circular Botanical Leaf Garland SVG */}
          <svg className="w-full h-full text-emerald-400 opacity-60" viewBox="0 0 300 300">
            <defs>
              <linearGradient id="vineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4ade80" />
                <stop offset="50%" stopColor="#2dd4bf" />
                <stop offset="100%" stopColor="#f59e0b" />
              </linearGradient>
            </defs>
            <circle cx="150" cy="150" r="142" fill="none" stroke="url(#vineGrad)" strokeWidth="2.5" strokeDasharray="8 6" opacity="0.75" />
            
            {/* Symmetrical Leaflet Clusters along perimeter */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
              <g key={i} transform={`rotate(${deg} 150 150)`}>
                {/* Leaf Frond */}
                <path d="M 150 6 C 158 12, 162 24, 150 30 C 138 24, 142 12, 150 6 Z" fill="#4ade80" opacity="0.85" />
                {/* Secondary Blossom Bud */}
                <circle cx="150" cy="8" r="3.5" fill="#f472b6" opacity="0.9" />
                {/* Dew drop */}
                <circle cx="156" cy="18" r="2" fill="#38bdf8" opacity="0.8" />
              </g>
            ))}
          </svg>
        </motion.div>

        {/* Counter-Rotating Sunbeam Dew Ring */}
        <motion.div
          animate={{
            rotate: [0, -360],
            scale: [1, 1.02, 1]
          }}
          transition={{
            rotate: { duration: 60, repeat: Infinity, ease: 'linear' },
            scale: { duration: cadenceSeconds * 1.2, repeat: Infinity, ease: 'easeInOut' }
          }}
          className="absolute inset-4 rounded-full border border-dashed border-amber-300/40 pointer-events-none"
        />

        {/* Inner Glowing Moss Ring */}
        <div className="absolute inset-8 rounded-full border border-emerald-400/30 shadow-[0_0_30px_rgba(74,222,128,0.25)] pointer-events-none" />

        {/* Portal Core Content Chamber */}
        <div className={`w-52 h-52 sm:w-64 sm:h-64 rounded-full overflow-hidden relative flex items-center justify-center bg-[#072417]/85 border-2 border-emerald-400/40 shadow-2xl backdrop-blur-xl transition-all ${
          isDragOver ? 'scale-105 border-emerald-300 ring-4 ring-emerald-400/30' : ''
        }`}>
          {isDragOver ? (
            /* Drag & Drop Hover Feedback */
            <div className="flex flex-col items-center justify-center p-6 text-center animate-bounce">
              <UploadCloud className="w-10 h-10 text-emerald-300 mb-2" />
              <span className="text-xs font-bold text-emerald-100">Drop trail image here</span>
            </div>
          ) : imagePreview ? (
            /* Captured Snapshot Preview */
            <div className="relative w-full h-full">
              <img
                src={imagePreview}
                alt="Nature Pattern"
                className="w-full h-full object-cover rounded-full"
              />
              <div className="absolute inset-0 rounded-full ring-2 ring-inset ring-emerald-400/40 shadow-inner" />
            </div>
          ) : (
            /* Sacred Ensō / Zen Compass Symbol */
            <div className="flex flex-col items-center justify-center p-6 text-center select-none">
              {isAnalyzing ? (
                <div className="flex flex-col items-center gap-3">
                  <div className="relative">
                    <Sparkles className="w-10 h-10 text-emerald-300 animate-spin" />
                    <div className="absolute inset-0 blur-md bg-emerald-400/40 rounded-full" />
                  </div>
                  <span className="text-xs font-bold tracking-wider text-emerald-200 uppercase animate-pulse">
                    Divining Pattern...
                  </span>
                  <span className="text-[10px] text-emerald-300/90 font-medium">
                    TabPFN Respiration & Gemma 2
                  </span>
                </div>
              ) : (
                <motion.div
                  animate={{ scale: [0.96, 1.04, 0.96] }}
                  transition={{ duration: cadenceSeconds, repeat: Infinity, ease: 'easeInOut' }}
                  className="flex flex-col items-center"
                >
                  <div className="w-14 h-14 rounded-full bg-[#0a3321]/80 border border-emerald-400/40 flex items-center justify-center mb-3 shadow-inner text-emerald-300">
                    <Compass className="w-7 h-7 text-emerald-300" />
                  </div>
                  <span className="font-serif italic text-base sm:text-lg text-emerald-50 font-bold tracking-wide">
                    Seek a quiet pattern
                  </span>
                  <span className="text-[11px] text-emerald-300 font-semibold mt-1 flex items-center gap-1.5">
                    <Flower2 className="w-3 h-3 text-pink-300" />
                    Ripples • Bark • Leaves • Clouds
                  </span>
                  <span className="text-[10px] text-emerald-200/80 font-medium mt-2 flex items-center gap-1">
                    <Leaf className="w-3 h-3 text-emerald-400" />
                    Drop image or awaken shutter
                  </span>
                </motion.div>
              )}
            </div>
          )}

          {/* Analyzing Gradient Aura Sweep */}
          {isAnalyzing && (
            <motion.div
              animate={{ opacity: [0.3, 0.8, 0.3], rotate: [0, 360] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 bg-gradient-to-tr from-emerald-400/30 via-pink-400/20 to-amber-300/30 rounded-full pointer-events-none"
            />
          )}
        </div>
      </div>

      {/* Ambient Playful Subtitle */}
      {!imagePreview && !isAnalyzing && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-serif italic text-sm sm:text-base text-emerald-100/90 text-center mt-6 max-w-sm px-4 font-medium drop-shadow"
        >
          "The earth has music for those who listen."
        </motion.p>
      )}
    </div>
  );
};
