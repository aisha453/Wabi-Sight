import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Volume2, Sparkles, Calendar } from 'lucide-react';
import { JournalItem } from '../types';

interface FieldJournalDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  entries: JournalItem[];
  onPlayAudio?: (item: JournalItem) => void;
}

export const FieldJournalDrawer: React.FC<FieldJournalDrawerProps> = ({
  isOpen,
  onClose,
  entries,
  onPlayAudio
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-30 flex items-end justify-center bg-black/70 backdrop-blur-sm">
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 26, stiffness: 260 }}
          className="w-full max-w-[420px] max-h-[85vh] bg-[#0c140f] border-t border-[#2dd4bf]/25 rounded-t-3xl p-5 overflow-y-auto shadow-2xl relative flex flex-col"
        >
          {/* Top Drag Handle */}
          <div className="w-12 h-1.5 rounded-full bg-slate-700 mx-auto mb-3" />

          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[#2dd4bf]/10 mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#f59e0b]" />
              <h2 className="font-sans font-bold text-base text-slate-100">
                Nature Scrapbook
              </h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#132018] text-[#2dd4bf] border border-[#2dd4bf]/20">
                {entries.length} {entries.length === 1 ? 'entry' : 'entries'}
              </span>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-[#132018] flex items-center justify-center text-slate-400 hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Entries Grid */}
          {entries.length === 0 ? (
            <div className="py-16 text-center text-slate-500">
              <p className="font-serif italic text-sm">
                No observations recorded yet.
              </p>
              <p className="text-xs mt-1">
                Walk outside, spot a pattern, and awaken the Oracle.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 pb-6">
              {entries.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl bg-[#132018] border border-[#2dd4bf]/15 overflow-hidden flex flex-col p-2.5 shadow-md hover:border-[#2dd4bf]/35 transition-colors"
                >
                  {/* Polaroid Image Thumbnail */}
                  <div className="aspect-square rounded-xl overflow-hidden bg-[#060a08] relative mb-2">
                    <img
                      src={item.image_filename}
                      alt={item.pattern_found}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback placeholder if image not yet cached
                        (e.target as HTMLImageElement).src =
                          'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100%" height="100%" fill="%230c140f"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%232dd4bf" font-size="12">Pattern</text></svg>';
                      }}
                    />
                    <div className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-sm text-[9px] font-bold text-[#f59e0b] border border-[#f59e0b]/30">
                      {item.category}
                    </div>
                  </div>

                  {/* Caption */}
                  <h4 className="font-sans font-bold text-xs text-slate-200 line-clamp-1 mb-1">
                    {item.pattern_found}
                  </h4>
                  <p className="font-serif italic text-[11px] text-slate-400 line-clamp-2 leading-snug flex-1">
                    "{item.vision_metaphor}"
                  </p>

                  {/* Bottom Footer */}
                  <div className="mt-2 pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-500" />
                      {new Date(item.created_at).toLocaleDateString([], {
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                    {item.audio_url && onPlayAudio && (
                      <button
                        onClick={() => onPlayAudio(item)}
                        className="p-1 rounded-full text-[#2dd4bf] hover:bg-[#0c140f]"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
