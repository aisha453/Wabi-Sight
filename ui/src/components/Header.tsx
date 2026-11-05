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
    if (currentHour >= 5 && currentHour < 8) return { label: 'Dawn', icon: Sunrise, color: 'text-amber-500' };
    if (currentHour >= 8 && currentHour < 17) return { label: 'Midday', icon: Sun, color: 'text-amber-500' };
    if (currentHour >= 17 && currentHour < 20) return { label: 'Twilight', icon: Sunset, color: 'text-indigo-500' };
    return { label: 'Night', icon: Moon, color: 'text-blue-500' };
  };

  const phase = getCircadianPhase();
  const PhaseIcon = phase.icon;

  const handleToggleSoundscape = () => {
    const active = soundscape.toggle();
    setIsSoundscapeOn(active);
  };

  return (
    <header className="sticky top-0 z-30 w-full h-16 px-4 sm:px-8 flex items-center justify-between bg-white/85 backdrop-blur-xl border-b border-emerald-500/15 shadow-sm">
      {/* Brand Identity */}
      <div className="flex items-center gap-3">
        <div className="relative group flex items-center justify-center">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-100 to-teal-50 border border-emerald-300 flex items-center justify-center shadow-sm">
            <Sparkles className="w-5 h-5 text-emerald-600 animate-pulse" />
          </div>
          <div className="absolute -inset-1 rounded-2xl bg-emerald-400/20 blur-sm -z-10 group-hover:bg-emerald-400/30 transition-all" />
        </div>
        
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h1 className="font-serif font-bold text-base sm:text-lg tracking-tight text-emerald-950">
              The Stone & Cloud Oracle
            </h1>
            <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
              Wabi-Sight
            </span>
          </div>
          <span className="text-[11px] text-emerald-700/80 font-sans tracking-wide font-medium">
            Micro-Meditations from Nature's Shapes
          </span>
        </div>
      </div>

      {/* Center Circadian Rhythm Pill (Adaptive) */}
      <div className="hidden md:flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/90 border border-emerald-300/60 text-xs font-medium text-emerald-900 shadow-sm backdrop-blur-md">
        <PhaseIcon className={`w-4 h-4 ${phase.color}`} />
        <span className="font-bold text-emerald-950">{phase.label}</span>
        <span className="text-emerald-400">•</span>
        <span className="text-emerald-700 font-medium">TabPFN Respiration:</span>
        <span className="text-amber-600 font-bold">{resonantCadence}s rhythm</span>
        <span className="text-emerald-400">•</span>
        <span className="text-emerald-800 font-bold">{circadianElement}</span>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Ambient Nature Soundscape Toggle */}
        <button
          onClick={handleToggleSoundscape}
          title={isSoundscapeOn ? "Mute Forest Breeze" : "Play Ambient Forest Breeze"}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
            isSoundscapeOn
              ? 'bg-emerald-100 border-emerald-400 text-emerald-800 shadow-sm'
              : 'bg-white/80 border-emerald-200 text-emerald-800 hover:bg-emerald-50 hover:border-emerald-300'
          }`}
        >
          {isSoundscapeOn ? (
            <>
              <Volume2 className="w-4 h-4 text-emerald-600 animate-pulse" />
              <span className="hidden sm:inline">Forest Breeze: On</span>
            </>
          ) : (
            <>
              <VolumeX className="w-4 h-4 text-emerald-600" />
              <span className="hidden sm:inline">Forest Breeze</span>
            </>
          )}
        </button>

        {/* Nature Journal Trigger */}
        <button
          onClick={onOpenJournal}
          aria-label="Open Field Journal"
          className="relative flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/90 border border-emerald-300/80 text-emerald-950 hover:bg-emerald-50 active:scale-95 transition-all shadow-sm"
        >
          <BookOpen className="w-4 h-4 text-emerald-600" />
          <span className="hidden sm:inline text-xs font-bold">Field Journal</span>
          {journalCount > 0 && (
            <span className="px-1.5 py-0.5 min-w-[18px] text-center rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-emerald-950 text-[10px] font-extrabold shadow-sm">
              {journalCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};
