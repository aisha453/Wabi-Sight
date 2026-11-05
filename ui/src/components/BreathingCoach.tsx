import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, X, Sparkles } from 'lucide-react';
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
    speakCue('Close your eyes. Breathe in.');

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

    // 3. Lively nature confetti burst celebration
    confetti({
      particleCount: 55,
      spread: 85,
      origin: { y: 0.6 },
      colors: ['#22c55e', '#10b981', '#f59e0b', '#84cc16', '#38bdf8']
    });

    // 4. Transition to journal after chime decays
    setTimeout(() => {
      onComplete();
    }, 3800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#072416] flex flex-col items-center justify-between p-6 sm:p-12 select-none backdrop-blur-3xl">
      {/* Top Bar with Voice Toggle and Exit */}
      <div className="w-full max-w-xl flex items-center justify-between pt-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setVoiceEnabled(!voiceEnabled);
          }}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-emerald-400/30 text-xs text-emerald-100 hover:bg-white/20 transition-colors"
        >
          {voiceEnabled ? (
            <>
              <Volume2 className="w-4 h-4 text-emerald-400" />
              <span>Voice Guide: ON</span>
            </>
          ) : (
            <>
              <VolumeX className="w-4 h-4 text-emerald-300/60" />
              <span>Voice Guide: OFF</span>
            </>
          )}
        </button>

        <button
          onClick={onExit}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-emerald-400/20 text-xs text-emerald-200 hover:bg-white/20 transition-colors"
        >
          <X className="w-3.5 h-3.5" />
          <span>Exit Session</span>
        </button>
      </div>

      {/* Top Quiet Guidance */}
      <div className="text-center max-w-md px-4">
        <p className="font-serif italic text-lg sm:text-xl text-emerald-100 tracking-wide font-medium">
          "Eyes closed. Senses open."
        </p>
        <p className="text-xs sm:text-sm text-emerald-300 mt-1 font-sans">
          Turn your phone down. Feel the earth beneath you.
        </p>
      </div>

      {/* Central Hypnotic Breathing Orb */}
      <div className="relative w-72 h-72 sm:w-96 sm:h-96 flex items-center justify-center">
        {/* Pulsing Concentric Aura */}
        <motion.div
          animate={{
            scale: phase === 'INHALE' ? 1.5 : phase === 'HOLD' ? 1.5 : 0.85,
            opacity: phase === 'INHALE' ? 0.95 : phase === 'HOLD' ? 0.95 : 0.35
          }}
          transition={{
            duration: phase === 'INHALE' ? cadenceSeconds * 0.45 : cadenceSeconds * 0.40,
            ease: 'easeInOut'
          }}
          className="absolute inset-0 rounded-full bg-gradient-to-tr from-emerald-400/30 via-teal-300/25 to-amber-300/30 blur-3xl"
        />

        {/* Outer Ripple */}
        <motion.div
          animate={{
            scale: phase === 'INHALE' ? 1.3 : phase === 'HOLD' ? 1.3 : 0.85,
            opacity: phase === 'HOLD' ? 0.8 : 0.4
          }}
          transition={{
            duration: phase === 'INHALE' ? cadenceSeconds * 0.45 : cadenceSeconds * 0.40,
            ease: 'easeInOut'
          }}
          className="absolute inset-6 rounded-full border-2 border-dashed border-emerald-400/40"
        />

        {/* Central Core Breathing Ring */}
        <motion.div
          animate={{
            scale: phase === 'INHALE' ? 1.25 : phase === 'HOLD' ? 1.25 : 0.82
          }}
          transition={{
            duration: phase === 'INHALE' ? cadenceSeconds * 0.45 : cadenceSeconds * 0.40,
            ease: 'easeInOut'
          }}
          className="w-56 h-56 sm:w-64 sm:h-64 rounded-full border-2 border-emerald-400/50 flex flex-col items-center justify-center bg-[#092e1c]/90 shadow-[0_0_50px_rgba(16,185,129,0.35)] backdrop-blur-md"
        >
          <Sparkles className="w-5 h-5 text-amber-400 mb-1 animate-pulse" />
          <span className="font-sans font-extrabold text-3xl tracking-widest text-emerald-300">
            {phase}
          </span>
          <span className="text-xs text-emerald-100 mt-1 font-medium">
            Breath {currentBreath} of {totalBreaths}
          </span>
          <span className="text-[10px] text-emerald-400 mt-0.5 font-bold">
            {cadenceSeconds}s Respiration
          </span>
        </motion.div>
      </div>

      {/* Bottom Status */}
      <div className="text-center pb-4">
        <span className="font-sans text-xs sm:text-sm text-emerald-200/90 font-medium">
          {secondsRemaining}s remaining until singing bowl chime
        </span>
      </div>
    </div>
  );
};
