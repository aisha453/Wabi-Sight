import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Compass, Sparkles, UploadCloud, Leaf } from 'lucide-react';

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
      className="flex-1 flex flex-col items-center justify-center relative py-6 sm:py-10 px-4 z-10 transition-all"
    >
      {/* Central Circular Ensō Stage */}
      <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center">
        {/* Outermost Pulsing Circadian Aura Ring */}
        <motion.div
          animate={{
            rotate: isAnalyzing ? 360 : 0,
            scale: isAnalyzing ? [1, 1.08, 1] : [0.97, 1.04, 0.97],
            opacity: isAnalyzing ? 0.9 : 0.6
          }}
          transition={{
            rotate: { duration: isAnalyzing ? 3 : 30, repeat: Infinity, ease: 'linear' },
            scale: { duration: cadenceSeconds, repeat: Infinity, ease: 'easeInOut' }
          }}
          className="absolute inset-0 rounded-full border-2 border-emerald-400/35 shadow-[0_0_40px_rgba(16,185,129,0.22)]"
        />

        {/* Second Ripple Ring with Dashed Organic Harmony */}
        <motion.div
          animate={{
            scale: [1, 1.02, 1],
            rotate: [0, -180, -360]
          }}
          transition={{
            scale: { duration: cadenceSeconds * 1.2, repeat: Infinity, ease: 'easeInOut' },
            rotate: { duration: 60, repeat: Infinity, ease: 'linear' }
          }}
          className="absolute inset-3 sm:inset-5 rounded-full border border-dashed border-amber-400/40"
        />

        {/* Third Glowing Ring */}
        <div className="absolute inset-7 sm:inset-10 rounded-full border border-emerald-500/20" />

        {/* Portal Core Content Chamber */}
        <div className={`w-52 h-52 sm:w-64 sm:h-64 rounded-full overflow-hidden relative flex items-center justify-center bg-white/90 border-2 border-emerald-300 shadow-xl backdrop-blur-xl transition-all ${
          isDragOver ? 'scale-105 border-emerald-500 ring-4 ring-emerald-400/25' : ''
        }`}>
          {isDragOver ? (
            /* Drag & Drop Hover Feedback */
            <div className="flex flex-col items-center justify-center p-6 text-center animate-bounce">
              <UploadCloud className="w-10 h-10 text-emerald-600 mb-2" />
              <span className="text-xs font-bold text-emerald-800">Drop trail image here</span>
            </div>
          ) : imagePreview ? (
            /* Captured Snapshot Preview */
            <div className="relative w-full h-full">
              <img
                src={imagePreview}
                alt="Nature Pattern"
                className="w-full h-full object-cover rounded-full"
              />
              <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-emerald-500/30 shadow-inner" />
            </div>
          ) : (
            /* Sacred Ensō / Zen Compass Symbol */
            <div className="flex flex-col items-center justify-center p-6 text-center select-none">
              {isAnalyzing ? (
                <div className="flex flex-col items-center gap-3">
                  <div className="relative">
                    <Sparkles className="w-10 h-10 text-emerald-600 animate-spin" />
                    <div className="absolute inset-0 blur-md bg-emerald-400/40 rounded-full" />
                  </div>
                  <span className="text-xs font-bold tracking-wider text-emerald-800 uppercase animate-pulse">
                    Divining Geometry...
                  </span>
                  <span className="text-[10px] text-emerald-600 font-medium">
                    TabPFN Respiration & Gemma 2
                  </span>
                </div>
              ) : (
                <motion.div
                  animate={{ scale: [0.96, 1.04, 0.96] }}
                  transition={{ duration: cadenceSeconds, repeat: Infinity, ease: 'easeInOut' }}
                  className="flex flex-col items-center"
                >
                  <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mb-3 shadow-sm">
                    <Compass className="w-7 h-7 text-emerald-600" />
                  </div>
                  <span className="font-serif italic text-base sm:text-lg text-emerald-950 font-bold">
                    Seek a quiet pattern
                  </span>
                  <span className="text-[11px] text-emerald-700 font-semibold mt-1">
                    Ripples • Bark • Leaves • Clouds
                  </span>
                  <span className="text-[10px] text-emerald-600/80 font-medium mt-2 flex items-center gap-1">
                    <Leaf className="w-3 h-3 text-emerald-500" />
                    Drop image or use shutter below
                  </span>
                </motion.div>
              )}
            </div>
          )}

          {/* Analyzing Gradient Sweep */}
          {isAnalyzing && (
            <motion.div
              animate={{ opacity: [0.3, 0.8, 0.3], rotate: [0, 360] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 bg-gradient-to-tr from-emerald-400/30 via-transparent to-amber-300/30 rounded-full pointer-events-none"
            />
          )}
        </div>
      </div>

      {/* Ambient Playful Subtitle */}
      {!imagePreview && !isAnalyzing && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-serif italic text-sm text-emerald-900/85 text-center mt-6 max-w-sm px-4 font-medium"
        >
          "The earth has music for those who listen."
        </motion.p>
      )}
    </div>
  );
};
