import React from 'react';
import { Sparkles, Calendar, Volume2, ArrowRight, ShieldCheck, Heart, Leaf } from 'lucide-react';
import { JournalItem } from '../types';

interface RecentRevelationsSidebarProps {
  entries: JournalItem[];
  onOpenJournal: () => void;
  onPlayAudio?: (item: JournalItem) => void;
  circadianElement?: string;
  resonantCadence?: number;
}

export const RecentRevelationsSidebar: React.FC<RecentRevelationsSidebarProps> = ({
  entries,
  onOpenJournal,
  onPlayAudio,
  circadianElement = 'Earth',
  resonantCadence = 5.5
}) => {
  const recentEntries = entries.slice(0, 3);

  return (
    <aside className="w-full flex flex-col gap-5 h-full z-20">
      {/* Nature Sanctuary Stats Card */}
      <div className="glass-panel rounded-3xl p-6 relative overflow-hidden border border-emerald-400/30 shadow-nature-lg">
        {/* Subtle Decorative Botanical Corner Leaf */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-emerald-400/10 to-transparent pointer-events-none" />

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <h3 className="font-serif font-bold text-base text-emerald-50">
              Circadian Harmony
            </h3>
          </div>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-900/80 text-emerald-300 border border-emerald-400/40">
            TabPFN Active
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="p-3.5 rounded-2xl bg-[#062416]/80 border border-emerald-400/30">
            <span className="text-[11px] text-emerald-300/85 block mb-1 font-semibold">Resonant Breath</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-extrabold font-sans text-emerald-300">{resonantCadence}s</span>
              <span className="text-[10px] text-emerald-400 font-medium">per cycle</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#062416]/80 border border-emerald-400/30">
            <span className="text-[11px] text-emerald-300/85 block mb-1 font-semibold">Elemental Focus</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-extrabold font-sans text-amber-300">{circadianElement}</span>
              <span className="text-[10px] text-amber-400 font-medium">zen</span>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-emerald-500/20 flex items-center justify-between text-xs text-emerald-200 font-medium">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Zero-Cloud Private AI
          </span>
          <span className="text-[11px] text-emerald-300 font-bold">
            {entries.length} {entries.length === 1 ? 'Observation' : 'Observations'}
          </span>
        </div>
      </div>

      {/* Recent Observations Card */}
      <div className="glass-panel rounded-3xl p-6 flex-1 flex flex-col justify-between border border-emerald-400/30 shadow-nature-lg">
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-1.5">
              <Leaf className="w-4 h-4 text-emerald-400" />
              <h3 className="font-serif font-bold text-base text-emerald-50">
                Recent Trail Insights
              </h3>
            </div>
            <button
              onClick={onOpenJournal}
              className="text-xs text-emerald-300 hover:text-emerald-200 font-bold flex items-center gap-1 transition-colors"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {recentEntries.length === 0 ? (
            <div className="py-12 text-center text-emerald-200/80">
              <Heart className="w-8 h-8 mx-auto mb-2 text-emerald-400/60" />
              <p className="font-serif italic text-sm text-emerald-100 font-medium">
                "Look deep into nature, and then you will understand everything better."
              </p>
              <p className="text-[11px] text-emerald-400 mt-2 font-medium">
                — Albert Einstein
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {recentEntries.map((item) => (
                <div
                  key={item.id}
                  className="glass-card rounded-2xl p-3 flex gap-3 items-center group cursor-pointer border border-emerald-400/25 hover:border-emerald-400/50 bg-[#082819]/80 shadow-sm"
                  onClick={onOpenJournal}
                >
                  <div className="w-14 h-14 rounded-xl overflow-hidden bg-[#051a0e] shrink-0 relative border border-emerald-400/35">
                    <img
                      src={item.image_filename}
                      alt={item.pattern_found}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100%" height="100%" fill="%23051a0e"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%234ade80" font-size="12">Pattern</text></svg>';
                      }}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-950/80 text-amber-300 border border-amber-400/40">
                        {item.category}
                      </span>
                      <span className="text-[10px] text-emerald-400 font-medium flex items-center gap-1">
                        <Calendar className="w-2.5 h-2.5" />
                        {new Date(item.created_at).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-emerald-100 truncate group-hover:text-emerald-300 transition-colors">
                      {item.pattern_found}
                    </h4>
                    <p className="font-serif italic text-[11px] text-emerald-200/80 truncate mt-0.5">
                      "{item.vision_metaphor}"
                    </p>
                  </div>

                  {item.audio_url && onPlayAudio && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onPlayAudio(item);
                      }}
                      title="Play guidance audio"
                      className="w-8 h-8 rounded-full bg-[#093320] border border-emerald-400/40 flex items-center justify-center text-emerald-300 hover:bg-emerald-800 transition-colors shrink-0"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={onOpenJournal}
          className="mt-4 w-full h-11 rounded-xl bg-[#082918]/85 border border-emerald-400/35 text-emerald-100 font-bold text-xs flex items-center justify-center gap-2 hover:bg-[#0c3822] transition-all shadow-sm"
        >
          <span>Open Full Scrapbook ({entries.length})</span>
        </button>
      </div>
    </aside>
  );
};
