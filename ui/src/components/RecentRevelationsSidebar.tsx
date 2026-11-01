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
      <div className="glass-panel rounded-3xl p-6 relative overflow-hidden border border-surface-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-firefly-gold" />
            <h3 className="font-serif font-bold text-base text-slate-100">
              Circadian Harmony
            </h3>
          </div>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">
            TabPFN Active
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="p-3.5 rounded-2xl bg-forest-950/70 border border-surface-border">
            <span className="text-[11px] text-slate-400 block mb-1">Resonant Breath</span>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold font-sans text-emerald-glow">{resonantCadence}s</span>
              <span className="text-[10px] text-slate-500">per cycle</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-forest-950/70 border border-surface-border">
            <span className="text-[11px] text-slate-400 block mb-1">Elemental Focus</span>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold font-sans text-firefly-gold">{circadianElement}</span>
              <span className="text-[10px] text-slate-500">zen</span>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-emerald-500/10 flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Zero-Cloud Private AI
          </span>
          <span className="text-[11px] text-emerald-300/80">
            {entries.length} {entries.length === 1 ? 'Observation' : 'Observations'}
          </span>
        </div>
      </div>

      {/* Recent Observations Card */}
      <div className="glass-panel rounded-3xl p-6 flex-1 flex flex-col justify-between border border-surface-border">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-serif font-bold text-base text-slate-100">
              Recent Trail Insights
            </h3>
            <button
              onClick={onOpenJournal}
              className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1 transition-colors"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {recentEntries.length === 0 ? (
            <div className="py-12 text-center text-slate-500">
              <Heart className="w-8 h-8 mx-auto mb-2 text-slate-600/60" />
              <p className="font-serif italic text-sm text-slate-400">
                "Look deep into nature, and then you will understand everything better."
              </p>
              <p className="text-[11px] text-slate-500 mt-2">
                — Albert Einstein
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {recentEntries.map((item) => (
                <div
                  key={item.id}
                  className="glass-card rounded-2xl p-3 flex gap-3 items-center group cursor-pointer"
                  onClick={onOpenJournal}
                >
                  <div className="w-14 h-14 rounded-xl overflow-hidden bg-forest-950 shrink-0 relative border border-emerald-glow/20">
                    <img
                      src={item.image_filename}
                      alt={item.pattern_found}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100%" height="100%" fill="%2307130b"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%232dd4bf" font-size="12">Pattern</text></svg>';
                      }}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-forest-950 text-firefly-gold border border-firefly-gold/30">
                        {item.category}
                      </span>
                      <span className="text-[10px] text-slate-500 flex items-center gap-1">
                        <Calendar className="w-2.5 h-2.5" />
                        {new Date(item.created_at).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-200 truncate group-hover:text-emerald-300 transition-colors">
                      {item.pattern_found}
                    </h4>
                    <p className="font-serif italic text-[11px] text-slate-400 truncate mt-0.5">
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
                      className="w-8 h-8 rounded-full bg-forest-950/80 border border-emerald-glow/20 flex items-center justify-center text-emerald-glow hover:bg-forest-900 transition-colors shrink-0"
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
          className="mt-4 w-full h-11 rounded-xl bg-forest-900/60 border border-emerald-glow/20 text-slate-300 font-semibold text-xs flex items-center justify-center gap-2 hover:bg-forest-850 hover:text-white transition-all shadow-glass-sm"
        >
          <span>Open Full Scrapbook ({entries.length})</span>
        </button>
      </div>
    </aside>
  );
};
