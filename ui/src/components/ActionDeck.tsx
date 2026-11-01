import React, { useRef } from 'react';
import { Camera, Image as ImageIcon, Sparkles, Wand2 } from 'lucide-react';
import { NATURE_PRESETS, NaturePreset } from '../utils/presets';

interface ActionDeckProps {
  onCapture: (file: File) => void;
  disabled?: boolean;
}

export const ActionDeck: React.FC<ActionDeckProps> = ({
  onCapture,
  disabled = false
}) => {
  const cameraInputRef = useRef<HTMLInputElement | null>(null);
  const galleryInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onCapture(e.target.files[0]);
    }
  };

  const triggerCamera = () => {
    if (navigator.vibrate) {
      navigator.vibrate(30);
    }
    cameraInputRef.current?.click();
  };

  const triggerGallery = () => {
    galleryInputRef.current?.click();
  };

  const handleSelectPreset = async (preset: NaturePreset) => {
    if (disabled) return;
    try {
      const file = await preset.generateImage();
      onCapture(file);
    } catch (e) {
      console.error('Error generating preset:', e);
    }
  };

  return (
    <div className="w-full px-4 sm:px-8 pb-8 pt-2 flex flex-col items-center gap-4 z-20 max-w-xl mx-auto">
      {/* Hidden Mobile Native Camera Input */}
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Hidden Gallery Input for Desktop/Saved Photos */}
      <input
        ref={galleryInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Primary Action Buttons Container */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-3">
        {/* Primary Shutter Button */}
        <button
          onClick={triggerCamera}
          disabled={disabled}
          className="w-full sm:flex-1 h-14 rounded-2xl bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400 text-forest-950 font-bold text-base flex items-center justify-center gap-3 shadow-glow-emerald hover:shadow-glow-emerald-lg active:scale-95 transition-all disabled:opacity-50 group"
        >
          <Camera className="w-5 h-5 text-forest-950 group-hover:rotate-12 transition-transform" />
          <span>Awaken the Oracle</span>
        </button>

        {/* Secondary Gallery / File Button */}
        <button
          onClick={triggerGallery}
          disabled={disabled}
          className="w-full sm:w-auto h-14 px-5 rounded-2xl bg-forest-900/80 border border-emerald-glow/25 text-slate-200 font-semibold text-sm flex items-center justify-center gap-2 hover:bg-forest-850 hover:border-emerald-glow/40 active:scale-95 transition-all disabled:opacity-50 shadow-glass-sm"
        >
          <ImageIcon className="w-4 h-4 text-emerald-glow" />
          <span>Upload File</span>
        </button>
      </div>

      {/* Interactive Sample Nature Presets */}
      <div className="w-full flex flex-col items-center gap-2 pt-1">
        <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-400">
          <Wand2 className="w-3.5 h-3.5 text-firefly-gold" />
          <span>Or explore an organic pattern preset:</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full">
          {NATURE_PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => handleSelectPreset(preset)}
              disabled={disabled}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-forest-950/60 border border-surface-border hover:border-emerald-glow/30 hover:bg-forest-900/60 transition-all text-left group active:scale-95 disabled:opacity-50"
            >
              <span className="text-base group-hover:scale-110 transition-transform">{preset.icon}</span>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-semibold text-slate-200 truncate group-hover:text-emerald-300 transition-colors">
                  {preset.name}
                </span>
                <span className="text-[9px] text-slate-400 uppercase tracking-wider">
                  {preset.category}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
