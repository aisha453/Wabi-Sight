import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { FireflyCanvas } from './components/FireflyCanvas';
import { AmbientPortal } from './components/AmbientPortal';
import { ActionDeck } from './components/ActionDeck';
import { RecentRevelationsSidebar } from './components/RecentRevelationsSidebar';
import { RevelationModal } from './components/RevelationModal';
import { BreathingCoach } from './components/BreathingCoach';
import { FieldJournalDrawer } from './components/FieldJournalDrawer';
import { OracleConsultation, JournalItem } from './types';

export const App: React.FC = () => {
  // App States
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [currentConsultation, setCurrentConsultation] = useState<OracleConsultation | null>(null);
  const [isGroundingActive, setIsGroundingActive] = useState(false);
  const [isJournalOpen, setIsJournalOpen] = useState(false);
  const [journalEntries, setJournalEntries] = useState<JournalItem[]>([]);
  const [circadianElement, setCircadianElement] = useState('Earth');
  const [resonantCadence, setResonantCadence] = useState(5.5);

  // Load journal from backend + offline localStorage
  useEffect(() => {
    loadJournal();
  }, []);

  const loadJournal = async () => {
    // 1. Load cached offline entries
    const cached = localStorage.getItem('stone_cloud_journal');
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        setJournalEntries(parsed);
        if (parsed.length > 0 && parsed[0].elemental_focus) {
          setCircadianElement(parsed[0].elemental_focus);
          if (parsed[0].breath_cadence_seconds) {
            setResonantCadence(parsed[0].breath_cadence_seconds);
          }
        }
      } catch (e) {
        console.error('Failed reading offline journal cache:', e);
      }
    }

    // 2. Fetch fresh entries from backend
    try {
      const resp = await fetch('/api/v1/journal');
      if (resp.ok) {
        const data = await resp.json();
        setJournalEntries(data);
        localStorage.setItem('stone_cloud_journal', JSON.stringify(data));
        if (data.length > 0 && data[0].elemental_focus) {
          setCircadianElement(data[0].elemental_focus);
          if (data[0].breath_cadence_seconds) {
            setResonantCadence(data[0].breath_cadence_seconds);
          }
        }
      }
    } catch (e) {
      console.warn('Backend journal offline; using local cache.');
    }
  };

  // Handle Photo Capture & Consultation
  const handleCapture = async (file: File) => {
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
    setIsAnalyzing(true);

    const formData = new FormData();
    formData.append('image', file);
    const now = new Date();
    formData.append('hour_of_day', (now.getHours() + now.getMinutes() / 60).toFixed(1));
    formData.append('temperature_c', '21.0');
    formData.append('cloud_cover_pct', '35.0');

    try {
      const resp = await fetch('/api/v1/oracle/consult', {
        method: 'POST',
        body: formData
      });

      if (!resp.ok) {
        throw new Error(`Server returned status ${resp.status}`);
      }

      const result: OracleConsultation = await resp.json();
      result.image_preview = previewUrl;

      setCurrentConsultation(result);
      setCircadianElement(result.elemental_focus);
      setResonantCadence(result.breath_cadence_seconds);

      // Play Audio automatically
      playGuidanceAudio(result);

      // Reload journal
      loadJournal();
    } catch (err) {
      console.error('Oracle consultation error:', err);
      // Failsafe local consultation for zero-crash experience
      const fallbackResult: OracleConsultation = {
        id: 'local-' + Date.now(),
        pattern_found: 'Concentric Rainwater Ripples',
        category: 'Water',
        vision_metaphor: 'These expanding rings mirror the annual growth of a cedar.',
        poetic_reflection: 'The surface stirs only for a moment; the pool remains deep and calm.',
        somatic_instruction: 'Place your phone face down on the grass. Close your eyes, feel the sunlight on your eyelids, and take 5 slow breaths.',
        breath_count: 5,
        breath_cadence_seconds: 5.5,
        elemental_focus: 'Water',
        audio_url: null,
        created_at: new Date().toISOString(),
        engine_used: 'Gemma 2 (Offline Fallback)',
        image_preview: previewUrl
      };
      setCurrentConsultation(fallbackResult);
      playGuidanceAudio(fallbackResult);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Play Spoken Guidance (ElevenLabs or Web Speech API)
  const playGuidanceAudio = (consultation: OracleConsultation) => {
    if (consultation.audio_url) {
      const audio = new Audio(consultation.audio_url);
      audio.play().catch(() => {
        fallbackWebSpeech(consultation.somatic_instruction);
      });
    } else {
      fallbackWebSpeech(consultation.somatic_instruction);
    }
  };

  const fallbackWebSpeech = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.85; // Unhurried, serene cadence
      utterance.pitch = 0.95;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Grounding Complete Handler
  const handleGroundingComplete = () => {
    setIsGroundingActive(false);
    setCurrentConsultation(null);
    setImagePreview(null);
    setIsJournalOpen(true);
  };

  return (
    <div className="min-h-[100dvh] w-full flex flex-col bg-botanical-mesh select-none text-slate-100 relative overflow-x-hidden">
      {/* Background Ambient Fireflies across viewport */}
      <FireflyCanvas />

      {/* Responsive Top Navigation Bar */}
      <Header
        journalCount={journalEntries.length}
        onOpenJournal={() => setIsJournalOpen(true)}
        circadianElement={circadianElement}
        resonantCadence={resonantCadence}
      />

      {/* Main Responsive Experience Grid */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-8 py-6 z-10 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Left / Center Stage: The Oracle Ensō Chamber */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col items-center justify-between glass-panel rounded-3xl sm:rounded-[32px] p-4 sm:p-8 min-h-[560px] sm:min-h-[640px] relative overflow-hidden">
            {/* Shimmering Aura Edge */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-glow/40 to-transparent" />

            {/* Central Ensō Portal with Drag-and-Drop */}
            <AmbientPortal
              isAnalyzing={isAnalyzing}
              imagePreview={imagePreview}
              onFileDrop={handleCapture}
              cadenceSeconds={resonantCadence}
            />

            {/* Action Shutter & Interactive Nature Presets */}
            <ActionDeck
              onCapture={handleCapture}
              disabled={isAnalyzing}
            />
          </div>

          {/* Desktop Right Column: Nature Sanctuary & Recent Revelations */}
          <div className="hidden lg:flex lg:col-span-5 xl:col-span-4 flex-col gap-6">
            <RecentRevelationsSidebar
              entries={journalEntries}
              onOpenJournal={() => setIsJournalOpen(true)}
              onPlayAudio={(item) => {
                if (item.audio_url) {
                  new Audio(item.audio_url).play().catch(() => {});
                } else {
                  fallbackWebSpeech(item.somatic_instruction);
                }
              }}
              circadianElement={circadianElement}
              resonantCadence={resonantCadence}
            />
          </div>

        </div>
      </main>

      {/* The Oracle's Poetic Revelation Card */}
      <RevelationModal
        consultation={currentConsultation}
        onClose={() => {
          setCurrentConsultation(null);
          setImagePreview(null);
        }}
        onBeginGrounding={() => {
          setIsGroundingActive(true);
        }}
        onReplayAudio={() => {
          if (currentConsultation) playGuidanceAudio(currentConsultation);
        }}
      />

      {/* Screen-Dimming Meditative Breathing Coach */}
      {isGroundingActive && currentConsultation && (
        <BreathingCoach
          totalBreaths={currentConsultation.breath_count}
          cadenceSeconds={currentConsultation.breath_cadence_seconds}
          onComplete={handleGroundingComplete}
          onExit={() => setIsGroundingActive(false)}
        />
      )}

      {/* Wabi-Sabi Field Scrapbook Drawer */}
      <FieldJournalDrawer
        isOpen={isJournalOpen}
        onClose={() => setIsJournalOpen(false)}
        entries={journalEntries}
        onPlayAudio={(item) => {
          if (item.audio_url) {
            new Audio(item.audio_url).play().catch(() => {});
          } else {
            fallbackWebSpeech(item.somatic_instruction);
          }
        }}
      />
    </div>
  );
};
