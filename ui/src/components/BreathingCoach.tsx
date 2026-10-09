import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import confetti from 'canvas-confetti';

interface BreathingCoachProps {
  totalBreaths: number;
  cadenceSeconds: number;
  onComplete: () => void;
  onExit: () => void;
}

export const BreathingCoach: React.FC<BreathingCoachProps> = ({
  totalBreaths = 5,
  cadenceSeconds = 5.5,
  onComplete,
  onExit
}) => {
  const [currentBreath, setCurrentBreath] = useState(1);
  const [phase, setPhase] = useState<'INHALE' | 'HOLD' | 'EXHALE'>('INHALE');
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [secondsRemaining, setSecondsRemaining] = useState(
    Math.round(totalBreaths * cadenceSeconds)
  );

  const voiceEnabledRef = useRef(voiceEnabled);
  useEffect(() => {
    voiceEnabledRef.current = voiceEnabled;
  }, [voiceEnabled]);

  // Peaceful Voice Cue Synthesizer
  const speakCue = (text: string) => {
    if (!voiceEnabledRef.current || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.80; // Slow, unhurried, meditative pace
      utterance.pitch = 0.90; // Warm, peaceful tone
      utterance.volume = 0.85;

      // Select gentle voice if available
      const voices = window.speechSynthesis.getVoices();
      const gentleVoice = voices.find(
        (v) =>
          v.name.includes('Natural') ||
          v.name.includes('Serena') ||
          v.name.includes('Samantha') ||
          v.name.includes('Daniel')
      );
      if (gentleVoice) utterance.voice = gentleVoice;

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      // Ignore audio synthesis errors
    }
  };

  useEffect(() => {
    // Initial welcome cue
    speakCue('Close your eyes. Breathe in.');

    // Total countdown timer
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          triggerCompletion();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Respiration phase durations
    const cycleMs = cadenceSeconds * 1000;
    const inhaleDuration = cycleMs * 0.45;
    const holdDuration = cycleMs * 0.15;
    const exhaleDuration = cycleMs * 0.40;

    let breathCount = 1;
    let isCancelled = false;

    const runCycle = () => {
      if (isCancelled) return;

      // 1. INHALE
      setPhase('INHALE');
      speakCue('Breathe in.');
      if (navigator.vibrate) navigator.vibrate(25);

      // 2. HOLD
      setTimeout(() => {
        if (isCancelled) return;
        setPhase('HOLD');
        speakCue('Hold.');
      }, inhaleDuration);

      // 3. EXHALE
      setTimeout(() => {
        if (isCancelled) return;
        setPhase('EXHALE');
        speakCue('Release.');
        if (navigator.vibrate) navigator.vibrate(15);
      }, inhaleDuration + holdDuration);

      // 4. NEXT CYCLE
      setTimeout(() => {
        if (isCancelled) return;
        breathCount++;
        if (breathCount <= totalBreaths) {
          setCurrentBreath(breathCount);
          runCycle();
        }
      }, cycleMs);
    };

    // Start cycle loop
    const cycleTimer = setTimeout(() => {
      runCycle();
    }, 1200);

    return () => {
      isCancelled = true;
      clearInterval(timer);
      clearTimeout(cycleTimer);
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    };
  }, [totalBreaths, cadenceSeconds]);

  const triggerCompletion = () => {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();

    // 1. Play Tibetan singing bowl chime
    const bowlAudio = new Audio('/static/audio/singing_bowl.mp3');
    bowlAudio.play().catch(() => {});

    // 2. Gentle haptic resonance
    if (navigator.vibrate) {
      navigator.vibrate([40, 80, 40]);
    }

    // 3. Firefly burst celebration
    confetti({
      particleCount: 45,
      spread: 75,
      origin: { y: 0.6 },
      colors: ['#2dd4bf', '#f59e0b', '#34d399']
    });

    // 4. Transition to journal after chime decays
    setTimeout(() => {
      onComplete();
    }, 3800);
  };

  return (
    <div className="fixed inset-0 z-40 bg-[#030604] flex flex-col items-center justify-between p-8 select-none">
      {/* Top Bar with Voice Toggle and Dismiss */}
      <div className="w-full flex items-center justify-between pt-4 px-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setVoiceEnabled(!voiceEnabled);
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#132018] border border-[#2dd4bf]/25 text-xs text-slate-300 hover:text-white transition-colors"
        >
          {voiceEnabled ? (
            <>
              <Volume2 className="w-3.5 h-3.5 text-[#2dd4bf]" />
              <span>Voice Guide: ON</span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5 text-slate-500" />
              <span>Voice Guide: OFF</span>
            </>
          )}
        </button>

        <button
          onClick={onExit}
          className="text-xs text-slate-500 hover:text-slate-300 underline"
        >
          Exit
        </button>
      </div>

      {/* Top Quiet Guidance */}
      <div className="text-center">
        <p className="font-serif italic text-base text-slate-400">
          "Eyes closed. Senses open."
        </p>
        <p className="text-xs text-slate-500 mt-1">
          Listen to the wind. Feel the earth.
        </p>
      </div>

      {/* Central Hypnotic Breathing Orb */}
      <div className="relative w-64 h-64 flex items-center justify-center">
        {/* Pulsing Concentric Aura */}
        <motion.div
          animate={{
            scale: phase === 'INHALE' ? 1.45 : phase === 'HOLD' ? 1.45 : 0.85,
            opacity: phase === 'INHALE' ? 0.9 : phase === 'HOLD' ? 0.9 : 0.4
          }}
          transition={{
            duration: phase === 'INHALE' ? cadenceSeconds * 0.45 : cadenceSeconds * 0.40,
            ease: 'easeInOut'
          }}
          className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#2dd4bf]/20 to-[#f59e0b]/20 blur-xl"
        />

        {/* Breathing Ring */}
        <motion.div
          animate={{
            scale: phase === 'INHALE' ? 1.25 : phase === 'HOLD' ? 1.25 : 0.8
          }}
          transition={{
            duration: phase === 'INHALE' ? cadenceSeconds * 0.45 : cadenceSeconds * 0.40,
            ease: 'easeInOut'
          }}
          className="w-48 h-48 rounded-full border-2 border-[#2dd4bf]/40 flex flex-col items-center justify-center bg-[#0c140f]/60 shadow-[0_0_40px_rgba(45,212,191,0.25)]"
        >
          <span className="font-sans font-bold text-lg tracking-widest text-[#2dd4bf]">
            {phase}
          </span>
          <span className="text-xs text-slate-400 mt-1">
            Breath {currentBreath} of {totalBreaths}
          </span>
        </motion.div>
      </div>

      {/* Bottom Status */}
      <div className="text-center pb-4">
        <span className="font-sans text-xs text-slate-500">
          {secondsRemaining}s remaining
        </span>
      </div>
    </div>
  );
};
