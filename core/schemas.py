from pydantic import BaseModel, Field
from typing import Optional, Literal
from datetime import datetime

class OracleConsultResponse(BaseModel):
    id: str = Field(description="Unique UUID for this consultation")
    pattern_found: str = Field(description="Identified nature pattern e.g. 'Concentric ripples in rainwater'")
    category: Literal["Water", "Earth", "Flora", "Cloud", "Stone"] = Field(description="Primary elemental category")
    vision_metaphor: str = Field(description="Poetic metaphor comparing pattern to nature")
    poetic_reflection: str = Field(description="Philosophical grounding insight")
    somatic_instruction: str = Field(description="Command to put phone down, close eyes, and breathe")
    breath_count: int = Field(default=5, ge=3, le=10, description="Recommended number of breath cycles")
    breath_cadence_seconds: float = Field(default=5.5, ge=3.5, le=8.5, description="Duration per breath cycle predicted by TabPFN")
    elemental_focus: str = Field(description="Grounding focus element e.g. 'Water Stillness'")
    audio_url: Optional[str] = Field(default=None, description="URL to generated ElevenLabs audio, or null for Web Speech fallback")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    engine_used: str = Field(description="Inference provider e.g. 'gemma-2-9b (groq)' or 'gemma-2-2b (local)'")

class JournalEntry(BaseModel):
    id: str
    image_filename: str
    pattern_found: str
    category: str
    vision_metaphor: str
    poetic_reflection: str
    somatic_instruction: str
    breath_cadence_seconds: float
    elemental_focus: str
    audio_url: Optional[str] = None
    created_at: str

class HealthStatus(BaseModel):
    status: Literal["healthy", "degraded"]
    engine_mode: str
    local_ollama_online: bool
    groq_api_configured: bool
    tabpfn_status: str
    elevenlabs_configured: bool
    sentry_active: bool
