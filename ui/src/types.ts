export interface OracleConsultation {
  id: string;
  pattern_found: string;
  category: 'Water' | 'Earth' | 'Flora' | 'Cloud' | 'Stone';
  vision_metaphor: string;
  poetic_reflection: string;
  somatic_instruction: string;
  breath_count: number;
  breath_cadence_seconds: number;
  elemental_focus: string;
  audio_url: string | null;
  created_at: string;
  engine_used: string;
  image_preview?: string;
}

export interface JournalItem {
  id: string;
  image_filename: string;
  pattern_found: string;
  category: string;
  vision_metaphor: string;
  poetic_reflection: string;
  somatic_instruction: string;
  breath_cadence_seconds: number;
  elemental_focus: string;
  audio_url?: string | null;
  created_at: string;
}
