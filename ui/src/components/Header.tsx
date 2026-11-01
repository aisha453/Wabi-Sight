import React, { useState, useEffect } from 'react';
import { Sparkles, Sun, Moon, Sunrise, Sunset, BookOpen, Volume2, VolumeX } from 'lucide-react';
import { soundscape } from '../utils/soundscape';

interface HeaderProps {
  journalCount: number;
  onOpenJournal: () => void;
  circadianElement?: string;
  resonantCadence?: number;
}

export const Header: React.FC<HeaderProps> = ({
  journalCount,
  onOpenJournal,
  circadianElement = 'Earth',
  resonantCadence = 5.5,
}) => {
  const [currentHour, setCurrentHour] = useState(new Date().getHours());
  const [isSoundscapeOn, setIsSoundscapeOn] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHour(new Date().getHours());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const getCircadianPhase = () => {
    if (currentHour >= 5 && currentHour < 8) return { label: 'Dawn', icon: Sunrise, color: 'text-amber-400' };
    if (currentHour >= 8 && currentHour < 17) return { label: 'Midday', icon: Sun, color: 'text-amber-300' };
    if (currentHour >= 17 && currentHour < 20) return { label: 'Twilight', icon: Sunset, color: 'text-indigo-300' };
    return { label: 'Night', icon: Moon, color: 'text-blue-300' };
  };

  const phase = getCircadianPhase();
  const PhaseIcon = phase.icon;

  const handleToggleSoundscape = () => {
    const active = soundscape.toggle();
    setIsSoundscapeOn(active);
  };

  return (
    <header className="sticky top-0 z-30 w-full h-16 px-4 sm:px-8 flex items-center justify-between bg-forest-950/80 backdrop-blur-xl border-b border-surface-border">
      {/* Brand Identity */}
      <div className="flex items-center gap-3">
        <div className="relative group flex items-center justify-center">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-900/60 to-forest-800/80 border border-emerald-glow/30 flex items-center justify-center shadow-glow-emerald">
            <Sparkles className="w-5 h-5 text-emerald-glow animate-pulse" />
          </div>
          <div className="absolute -inset-1 rounded-2xl bg-emerald-500/10 blur-sm -z-10 group-hover:bg-emerald-500/20 transition-all" />
        </div>
        
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h1 className="font-serif font-bold text-base sm:text-lg tracking-tight text-slate-100">
              The Stone & Cloud Oracle
            </h1>
            <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-950/70 text-emerald-300 border border-emerald-500/30">
              Wabi-Sight
            </span>
          </div>
          <span className="text-[11px] text-slate-400 font-sans tracking-wide">
            Micro-Meditations from Nature's Shapes
          </span>
        </div>
      </div>

      {/* Center Circadian Rhythm Pill (Adaptive) */}
      <div className="hidden md:flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-forest-900/70 border border-emerald-glow/20 text-xs font-medium text-slate-300 shadow-glass-sm backdrop-blur-md">
        <PhaseIcon className={`w-4 h-4 ${phase.color}`} />
        <span className="font-semibold text-slate-200">{phase.label}</span>
        <span className="text-emerald-500/40">•</span>
        <span className="text-emerald-400 font-medium">TabPFN Respiration:</span>
        <span className="text-firefly-gold font-bold">{resonantCadence}s rhythm</span>
        <span className="text-emerald-500/40">•</span>
        <span className="text-emerald-300 font-semibold">{circadianElement}</span>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Ambient Nature Soundscape Toggle */}
        <button
          onClick={handleToggleSoundscape}
          title={isSoundscapeOn ? "Mute Forest Breeze" : "Play Ambient Forest Breeze"}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all ${
            isSoundscapeOn
              ? 'bg-emerald-950/80 border-emerald-400/50 text-emerald-300 shadow-glow-emerald'
              : 'bg-forest-900/60 border-surface-border text-slate-400 hover:text-slate-200 hover:border-emerald-500/30'
          }`}
        >
          {isSoundscapeOn ? (
            <>
              <Volume2 className="w-4 h-4 text-emerald-glow animate-pulse" />
              <span className="hidden sm:inline">Forest Breeze: On</span>
            </>
          ) : (
            <>
              <VolumeX className="w-4 h-4" />
              <span className="hidden sm:inline">Forest Breeze</span>
            </>
          )}
        </button>

        {/* Nature Journal Trigger */}
        <button
          onClick={onOpenJournal}
          aria-label="Open Field Journal"
          className="relative flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-forest-900/80 border border-emerald-glow/25 text-slate-200 hover:text-white hover:border-emerald-glow/40 active:scale-95 transition-all shadow-glass-sm"
        >
          <BookOpen className="w-4 h-4 text-emerald-glow" />
          <span className="hidden sm:inline text-xs font-semibold">Field Journal</span>
          {journalCount > 0 && (
            <span className="px-1.5 py-0.5 min-w-[18px] text-center rounded-full bg-gradient-to-r from-firefly-gold to-amber-500 text-forest-950 text-[10px] font-bold shadow-glow-gold">
              {journalCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};
