import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wind, Volume2, Sparkles, X, Compass } from 'lucide-react';
import { OracleConsultation } from '../types';

interface RevelationModalProps {
  consultation: OracleConsultation | null;
  onClose: () => void;
  onBeginGrounding: () => void;
  onReplayAudio: () => void;
}

export const RevelationModal: React.FC<RevelationModalProps> = ({
  consultation,
  onClose,
  onBeginGrounding,
  onReplayAudio
}) => {
  if (!consultation) return null;

  const totalGroundingSeconds = Math.round(
    consultation.breath_count * consultation.breath_cadence_seconds
  );

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-40 flex items-end sm:items-center justify-center bg-emerald-950/40 backdrop-blur-md p-0 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ y: 50, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 50, opacity: 0, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25, stiffness: 280 }}
          className="w-full max-w-lg bg-white/95 border-2 border-emerald-300/80 rounded-t-3xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden backdrop-blur-2xl"
        >
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-300/20 rounded-full blur-3xl pointer-events-none -z-10" />

          {/* Drag Pill for Mobile */}
          <div className="w-12 h-1.5 rounded-full bg-emerald-200 mx-auto mb-4 sm:hidden" />

          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close Revelation"
            className="absolute top-5 right-5 w-9 h-9 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 hover:text-emerald-950 hover:bg-emerald-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Top Badges */}
          <div className="flex items-center gap-2 mb-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-[11px] font-bold text-amber-800 uppercase tracking-wider shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>{consultation.category} • {consultation.elemental_focus}</span>
            </div>

            <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-[10px] font-bold text-emerald-800">
              <Compass className="w-3 h-3 text-emerald-600" />
              <span>{consultation.breath_cadence_seconds}s Cadence</span>
            </div>
          </div>

          {/* Pattern Title */}
          <h3 className="font-serif font-bold text-xl sm:text-2xl text-emerald-950 tracking-tight mb-2">
            {consultation.pattern_found}
          </h3>

          {/* The Vision (Poetic Metaphor) */}
          <blockquote className="font-serif italic text-base sm:text-lg leading-relaxed text-emerald-950 border-l-4 border-emerald-500 pl-4 my-4 bg-emerald-50/80 py-3 rounded-r-xl">
            "{consultation.vision_metaphor}"
          </blockquote>

          {/* The Philosophical Reflection */}
          <p className="font-sans text-xs sm:text-sm leading-relaxed text-slate-600 mb-5 font-normal">
            {consultation.poetic_reflection}
          </p>

          {/* The Touch Grass Grounding Cue */}
          <div className="p-4 rounded-2xl bg-emerald-50/90 border border-emerald-300 shadow-sm flex items-start gap-3.5 mb-6">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 border border-emerald-300 flex items-center justify-center shrink-0 mt-0.5">
              <Wind className="w-4 h-4 text-emerald-700 animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 mb-0.5">
                Somatic Grounding Command
              </span>
              <p className="font-sans text-xs sm:text-sm font-bold leading-snug text-emerald-950">
                {consultation.somatic_instruction}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-2.5">
            <button
              onClick={onBeginGrounding}
              className="flex-1 h-13 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-500 to-green-600 text-white font-bold text-sm shadow-lg shadow-emerald-600/25 hover:shadow-emerald-600/40 hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Wind className="w-4 h-4" />
              <span>Begin Screenless Grounding ({totalGroundingSeconds}s)</span>
            </button>

            <button
              onClick={onReplayAudio}
              className="h-13 px-4 py-3.5 rounded-2xl bg-white/95 border-2 border-emerald-300 text-emerald-950 text-xs font-bold flex items-center justify-center gap-2 hover:bg-emerald-50 transition-colors shadow-sm"
            >
              <Volume2 className="w-4 h-4 text-emerald-600" />
              <span>Replay Audio</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
