import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Volume2, Sparkles, Calendar, Compass, Filter } from 'lucide-react';
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
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  if (!isOpen) return null;

  const categories = ['All', 'Water', 'Earth', 'Flora', 'Cloud', 'Stone'];
  const filteredEntries = selectedCategory === 'All'
    ? entries
    : entries.filter(e => e.category?.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-md p-0 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 60, opacity: 0 }}
          transition={{ type: 'spring', damping: 28, stiffness: 280 }}
          className="w-full max-w-4xl max-h-[90vh] bg-forest-950/95 border border-emerald-glow/30 rounded-t-3xl sm:rounded-3xl p-6 sm:p-8 overflow-hidden shadow-2xl relative flex flex-col backdrop-blur-2xl"
        >
          {/* Top Drag Handle for Mobile */}
          <div className="w-12 h-1.5 rounded-full bg-slate-700 mx-auto mb-3 sm:hidden" />

          {/* Header Bar */}
          <div className="flex items-center justify-between pb-5 border-b border-surface-border mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-forest-900/80 border border-firefly-gold/30 flex items-center justify-center shadow-glow-gold">
                <Sparkles className="w-5 h-5 text-firefly-gold" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-serif font-bold text-lg sm:text-xl text-slate-100">
                    Wabi-Sabi Field Scrapbook
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
                    {entries.length} {entries.length === 1 ? 'entry' : 'entries'}
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-sans mt-0.5">
                  Offline field observations & screenless grounding archive
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              aria-label="Close Journal"
              className="w-9 h-9 rounded-full bg-forest-900/80 border border-emerald-glow/20 flex items-center justify-center text-slate-400 hover:text-slate-100 hover:bg-forest-850 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-3 scrollbar-none">
            <Filter className="w-3.5 h-3.5 text-slate-500 shrink-0 ml-1" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-emerald-400 text-forest-950 shadow-glow-emerald font-bold'
                    : 'bg-forest-900/70 border border-surface-border text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Entries Grid Area */}
          <div className="flex-1 overflow-y-auto pr-1">
            {filteredEntries.length === 0 ? (
              <div className="py-20 text-center text-slate-500 flex flex-col items-center justify-center">
                <Compass className="w-12 h-12 text-slate-600 mb-3" />
                <p className="font-serif italic text-base text-slate-300">
                  No observations recorded in this category yet.
                </p>
                <p className="text-xs text-slate-500 mt-1 max-w-xs">
                  Step outdoors, spot fleeting natural geometry, and awaken the Oracle.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-4">
                {filteredEntries.map((item) => (
                  <div
                    key={item.id}
                    className="glass-card rounded-2xl border border-surface-border overflow-hidden flex flex-col p-3 shadow-glass-sm group"
                  >
                    {/* Polaroid Image Thumbnail */}
                    <div className="aspect-[4/3] rounded-xl overflow-hidden bg-forest-950 relative mb-3">
                      <img
                        src={item.image_filename}
                        alt={item.pattern_found}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100%" height="100%" fill="%2307130b"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%232dd4bf" font-size="12">Pattern</text></svg>';
                        }}
                      />
                      <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-forest-950/80 backdrop-blur-sm text-[10px] font-bold text-firefly-gold border border-firefly-gold/30">
                        {item.category}
                      </div>

                      {item.elemental_focus && (
                        <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-forest-950/80 backdrop-blur-sm text-[10px] font-bold text-emerald-300 border border-emerald-500/30">
                          {item.elemental_focus}
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <h4 className="font-sans font-bold text-sm text-slate-100 line-clamp-1 mb-1 group-hover:text-emerald-300 transition-colors">
                      {item.pattern_found}
                    </h4>

                    <p className="font-serif italic text-xs text-slate-300 line-clamp-2 leading-relaxed flex-1 mb-2">
                      "{item.vision_metaphor}"
                    </p>

                    <div className="p-2 rounded-xl bg-forest-950/70 border border-surface-border text-[11px] text-emerald-400 font-medium mb-3 line-clamp-2">
                      {item.somatic_instruction}
                    </div>

                    {/* Footer */}
                    <div className="pt-2 border-t border-surface-border flex items-center justify-between text-[11px] text-slate-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-500" />
                        {new Date(item.created_at).toLocaleDateString([], {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>

                      {item.audio_url && onPlayAudio && (
                        <button
                          onClick={() => onPlayAudio(item)}
                          title="Replay Spoken Guidance"
                          className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-forest-900/80 border border-emerald-glow/20 text-emerald-300 hover:text-white hover:bg-forest-850 transition-colors"
                        >
                          <Volume2 className="w-3.5 h-3.5 text-emerald-glow" />
                          <span className="text-[10px]">Listen</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
