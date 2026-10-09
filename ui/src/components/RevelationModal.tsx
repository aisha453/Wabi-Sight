import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wind, Volume2, Sparkles, X } from 'lucide-react';
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

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-30 flex items-end justify-center bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 280 }}
          className="w-full max-w-[420px] bg-[#0c140f] border-t border-[#2dd4bf]/25 rounded-t-3xl p-6 shadow-2xl relative"
        >
          {/* Drag Pill / Handle */}
          <div className="w-12 h-1.5 rounded-full bg-slate-700 mx-auto mb-4" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#132018] flex items-center justify-center text-slate-400 hover:text-slate-200"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Category Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#132018] border border-[#2dd4bf]/25 text-[11px] font-semibold text-[#f59e0b] uppercase tracking-wider mb-3">
            <Sparkles className="w-3 h-3 text-[#f59e0b]" />
            <span>{consultation.category} • {consultation.elemental_focus}</span>
          </div>

          {/* Pattern Title */}
          <h3 className="font-sans font-bold text-base text-slate-100 mb-2">
            {consultation.pattern_found}
          </h3>

          {/* The Vision (Poetic Metaphor) */}
          <blockquote className="font-serif italic text-base leading-relaxed text-slate-100 border-l-2 border-[#2dd4bf] pl-3 my-3">
            "{consultation.vision_metaphor}"
          </blockquote>

          {/* The Philosophical Reflection */}
          <p className="font-sans text-xs leading-relaxed text-slate-300 mt-2">
            {consultation.poetic_reflection}
          </p>

          {/* The Touch Grass Grounding Cue */}
          <div className="mt-4 p-3.5 rounded-2xl bg-[#132018] border border-[#2dd4bf]/30 flex items-start gap-3">
            <Wind className="w-5 h-5 text-[#2dd4bf] shrink-0 mt-0.5" />
            <p className="font-sans text-xs font-semibold leading-snug text-[#2dd4bf]">
              {consultation.somatic_instruction}
            </p>
          </div>

          {/* Action Deck */}
          <div className="mt-5 flex flex-col gap-2">
            <button
              onClick={onBeginGrounding}
              className="w-full h-12 rounded-xl bg-gradient-to-r from-[#2dd4bf] to-[#34d399] text-[#060a08] font-bold text-sm shadow-[0_0_20px_rgba(45,212,191,0.3)] active:scale-95 transition-transform flex items-center justify-center gap-2"
            >
              <Wind className="w-4 h-4" />
              <span>Begin Screenless Grounding ({consultation.breath_count * Math.round(consultation.breath_cadence_seconds)}s)</span>
            </button>

            <button
              onClick={onReplayAudio}
              className="w-full h-10 rounded-xl bg-[#132018] border border-[#2dd4bf]/20 text-slate-300 text-xs font-medium flex items-center justify-center gap-2 hover:bg-[#1a2c22] transition-colors"
            >
              <Volume2 className="w-3.5 h-3.5 text-[#2dd4bf]" />
              <span>Replay Ambient Guidance</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
