import React from 'react';
import { Sparkles, Sun, Moon, BookOpen } from 'lucide-react';

interface HeaderProps {
  journalCount: number;
  onOpenJournal: () => void;
  circadianElement?: string;
}

export const Header: React.FC<HeaderProps> = ({
  journalCount,
  onOpenJournal,
  circadianElement = 'Earth'
}) => {
  const currentHour = new Date().getHours();
  const isNight = currentHour < 6 || currentHour >= 19;
  const timeLabel = isNight ? 'Twilight' : currentHour < 12 ? 'Morning' : 'Afternoon';

  return (
    <header className="sticky top-0 z-20 w-full h-14 px-4 flex items-center justify-between bg-[#060a08]/85 backdrop-blur-md border-b border-[#2dd4bf]/10">
      {/* Brand Identity */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-[#132018] border border-[#2dd4bf]/20 flex items-center justify-center shadow-inner">
          <Sparkles className="w-4 h-4 text-[#2dd4bf] animate-pulse" />
        </div>
        <span className="font-sans font-bold text-sm tracking-wide text-slate-100">
          The Oracle
        </span>
      </div>

      {/* Ambient Circadian Pill */}
      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0c140f] border border-[#2dd4bf]/20 text-[11px] font-medium text-slate-300 shadow-sm">
        {isNight ? (
          <Moon className="w-3.5 h-3.5 text-[#818cf8]" />
        ) : (
          <Sun className="w-3.5 h-3.5 text-[#f59e0b]" />
        )}
        <span>{timeLabel}</span>
        <span className="text-[#2dd4bf]/50">•</span>
        <span className="text-[#2dd4bf] font-semibold">{circadianElement}</span>
      </div>

      {/* Nature Journal Trigger */}
      <button
        onClick={onOpenJournal}
        aria-label="Open Nature Journal"
        className="w-9 h-9 rounded-full bg-[#132018] border border-[#2dd4bf]/20 flex items-center justify-center relative active:scale-95 transition-transform"
      >
        <BookOpen className="w-4 h-4 text-[#2dd4bf]" />
        {journalCount > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#f59e0b] text-[#060a08] text-[9px] font-bold flex items-center justify-center shadow">
            {journalCount}
          </span>
        )}
      </button>
    </header>
  );
};
