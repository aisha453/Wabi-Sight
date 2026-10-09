import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Sparkles } from 'lucide-react';

interface AmbientPortalProps {
  isAnalyzing: boolean;
  imagePreview: string | null;
}

export const AmbientPortal: React.FC<AmbientPortalProps> = ({
  isAnalyzing,
  imagePreview
}) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center relative py-6 px-4 z-10">
      {/* Central Circular Stage */}
      <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
        {/* Outer Concentric Animated Glowing SVG Rings */}
        <motion.div
          animate={{
            rotate: isAnalyzing ? 360 : 0,
            scale: isAnalyzing ? [1, 1.06, 1] : [0.98, 1.03, 0.98]
          }}
          transition={{
            rotate: { duration: isAnalyzing ? 4 : 20, repeat: Infinity, ease: 'linear' },
            scale: { duration: 4.5, repeat: Infinity, ease: 'easeInOut' }
          }}
          className="absolute inset-0 rounded-full border border-[#2dd4bf]/20 shadow-[0_0_50px_rgba(45,212,191,0.2)]"
        />

        {/* Inner SVG Ripple Ring */}
        <div className="absolute inset-4 rounded-full border border-dashed border-[#f59e0b]/20" />

        {/* Portal Core Content */}
        <div className="w-52 h-52 sm:w-60 sm:h-60 rounded-full overflow-hidden relative flex items-center justify-center bg-[#0c140f] border border-[#2dd4bf]/30 shadow-inner">
          {imagePreview ? (
            /* Captured Snapshot Preview */
            <img
              src={imagePreview}
              alt="Nature Pattern"
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            /* Sacred Ensō / Zen Compass Symbol */
            <div className="flex flex-col items-center justify-center p-6 text-center">
              {isAnalyzing ? (
                <div className="flex flex-col items-center gap-3">
                  <Sparkles className="w-8 h-8 text-[#2dd4bf] animate-spin" />
                  <span className="text-xs font-semibold tracking-wider text-[#2dd4bf] uppercase animate-pulse">
                    Divining Pattern...
                  </span>
                </div>
              ) : (
                <motion.div
                  animate={{ scale: [0.95, 1.05, 0.95] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="flex flex-col items-center"
                >
                  <Compass className="w-12 h-12 text-[#2dd4bf]/60 mb-2" />
                  <span className="font-serif italic text-sm text-slate-400">
                    Seek a quiet pattern
                  </span>
                  <span className="text-[11px] text-slate-500 mt-1">
                    Ripples • Bark • Leaves • Clouds
                  </span>
                </motion.div>
              )}
            </div>
          )}

          {/* Analyzing Gradient Overlay */}
          {isAnalyzing && (
            <motion.div
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute inset-0 bg-gradient-to-tr from-[#2dd4bf]/20 via-transparent to-[#f59e0b]/20 rounded-full pointer-events-none"
            />
          )}
        </div>
      </div>

      {/* Ambient Playful Subtitle */}
      {!imagePreview && !isAnalyzing && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-serif text-sm text-slate-400 text-center mt-6 max-w-[280px]"
        >
          "The earth has music for those who listen."
        </motion.p>
      )}
    </div>
  );
};
