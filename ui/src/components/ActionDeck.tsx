import React, { useRef } from 'react';
import { Camera, Image as ImageIcon, Wand2 } from 'lucide-react';
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
          className="w-full sm:flex-1 h-14 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-500 to-green-600 text-white font-bold text-base flex items-center justify-center gap-3 shadow-lg shadow-emerald-600/25 hover:shadow-emerald-600/40 hover:brightness-105 active:scale-95 transition-all disabled:opacity-50 group"
        >
          <Camera className="w-5 h-5 text-white group-hover:rotate-12 transition-transform" />
          <span>Awaken the Oracle</span>
        </button>

        {/* Secondary Gallery / File Button */}
        <button
          onClick={triggerGallery}
          disabled={disabled}
          className="w-full sm:w-auto h-14 px-5 rounded-2xl bg-white/95 border-2 border-emerald-300/80 text-emerald-950 font-bold text-sm flex items-center justify-center gap-2 hover:bg-emerald-50 active:scale-95 transition-all disabled:opacity-50 shadow-sm"
        >
          <ImageIcon className="w-4 h-4 text-emerald-600" />
          <span>Upload File</span>
        </button>
      </div>

      {/* Interactive Sample Nature Presets */}
      <div className="w-full flex flex-col items-center gap-2 pt-1">
        <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900/90">
          <Wand2 className="w-3.5 h-3.5 text-amber-500" />
          <span>Or explore an organic pattern preset:</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 w-full">
          {NATURE_PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => handleSelectPreset(preset)}
              disabled={disabled}
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white/90 border border-emerald-200/90 hover:border-emerald-400 hover:bg-emerald-50/90 transition-all text-left group active:scale-95 disabled:opacity-50 shadow-sm"
            >
              <span className="text-lg group-hover:scale-110 transition-transform">{preset.icon}</span>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-bold text-emerald-950 truncate group-hover:text-emerald-700 transition-colors">
                  {preset.name}
                </span>
                <span className="text-[9px] text-emerald-600 font-bold uppercase tracking-wider">
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
