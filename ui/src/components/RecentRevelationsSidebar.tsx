import React from 'react';
import { Sparkles, Calendar, Volume2, ArrowRight, ShieldCheck, Heart } from 'lucide-react';
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
    <aside className="w-full flex flex-col gap-5 h-full">
      {/* Nature Sanctuary Stats Card */}
      <div className="glass-panel rounded-3xl p-6 relative overflow-hidden border border-emerald-200/80 shadow-nature">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <h3 className="font-serif font-bold text-base text-emerald-950">
              Circadian Harmony
            </h3>
          </div>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
            TabPFN Active
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80">
            <span className="text-[11px] text-emerald-800/80 block mb-1 font-semibold">Resonant Breath</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-extrabold font-sans text-emerald-700">{resonantCadence}s</span>
              <span className="text-[10px] text-emerald-600 font-medium">per cycle</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80">
            <span className="text-[11px] text-emerald-800/80 block mb-1 font-semibold">Elemental Focus</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-extrabold font-sans text-amber-600">{circadianElement}</span>
              <span className="text-[10px] text-amber-700/80 font-medium">zen</span>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-emerald-500/15 flex items-center justify-between text-xs text-emerald-800 font-medium">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Zero-Cloud Private AI
          </span>
          <span className="text-[11px] text-emerald-700 font-bold">
            {entries.length} {entries.length === 1 ? 'Observation' : 'Observations'}
          </span>
        </div>
      </div>

      {/* Recent Observations Card */}
      <div className="glass-panel rounded-3xl p-6 flex-1 flex flex-col justify-between border border-emerald-200/80 shadow-nature">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-serif font-bold text-base text-emerald-950">
              Recent Trail Insights
            </h3>
            <button
              onClick={onOpenJournal}
              className="text-xs text-emerald-700 hover:text-emerald-600 font-bold flex items-center gap-1 transition-colors"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {recentEntries.length === 0 ? (
            <div className="py-12 text-center text-emerald-700/80">
              <Heart className="w-8 h-8 mx-auto mb-2 text-emerald-400" />
              <p className="font-serif italic text-sm text-emerald-900 font-medium">
                "Look deep into nature, and then you will understand everything better."
              </p>
              <p className="text-[11px] text-emerald-600 mt-2 font-medium">
                — Albert Einstein
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {recentEntries.map((item) => (
                <div
                  key={item.id}
                  className="glass-card rounded-2xl p-3 flex gap-3 items-center group cursor-pointer border border-emerald-200/80 hover:border-emerald-400 bg-white/90 shadow-sm"
                  onClick={onOpenJournal}
                >
                  <div className="w-14 h-14 rounded-xl overflow-hidden bg-emerald-50 shrink-0 relative border border-emerald-300">
                    <img
                      src={item.image_filename}
                      alt={item.pattern_found}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100%" height="100%" fill="%23ecfdf5"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%23059669" font-size="12">Pattern</text></svg>';
                      }}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
                        {item.category}
                      </span>
                      <span className="text-[10px] text-emerald-600 font-medium flex items-center gap-1">
                        <Calendar className="w-2.5 h-2.5" />
                        {new Date(item.created_at).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-emerald-950 truncate group-hover:text-emerald-700 transition-colors">
                      {item.pattern_found}
                    </h4>
                    <p className="font-serif italic text-[11px] text-slate-600 truncate mt-0.5">
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
                      className="w-8 h-8 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-700 hover:bg-emerald-200 transition-colors shrink-0"
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
          className="mt-4 w-full h-11 rounded-xl bg-white/95 border-2 border-emerald-300 text-emerald-950 font-bold text-xs flex items-center justify-center gap-2 hover:bg-emerald-50 transition-all shadow-sm"
        >
          <span>Open Full Scrapbook ({entries.length})</span>
        </button>
      </div>
    </aside>
  );
};
