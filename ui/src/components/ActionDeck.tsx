import React, { useRef } from 'react';
import { Camera, Image as ImageIcon } from 'lucide-react';

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

  return (
    <div className="w-full px-6 pb-8 pt-2 flex flex-col items-center gap-3 z-20">
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

      {/* Primary Shutter Button */}
      <button
        onClick={triggerCamera}
        disabled={disabled}
        className="w-full max-w-[340px] h-14 rounded-2xl bg-gradient-to-r from-[#2dd4bf] via-[#34d399] to-[#2dd4bf] text-[#060a08] font-bold text-base flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(45,212,191,0.35)] active:scale-95 transition-all disabled:opacity-50"
      >
        <Camera className="w-5 h-5 text-[#060a08]" />
        <span>Awaken the Oracle</span>
      </button>

      {/* Secondary Gallery Link */}
      <button
        onClick={triggerGallery}
        disabled={disabled}
        className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1.5 py-1 transition-colors disabled:opacity-50"
      >
        <ImageIcon className="w-3.5 h-3.5" />
        <span>or choose from trail photos</span>
      </button>
    </div>
  );
};
