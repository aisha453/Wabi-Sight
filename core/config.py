import os
from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    APP_NAME: str = "The Stone & Cloud Oracle"
    VERSION: str = "1.0.0"
    HOST: str = "0.0.0.0"
    PORT: int = 8000
    
    # Engine Mode: 'auto', 'local', or 'groq'
    AI_ENGINE_MODE: str = "auto"
    
    # Cloud Fallback (Groq API - Free Tier, No Credit Card)
    GROQ_API_KEY: Optional[str] = None
    
    # Local Inference (Ollama / PyTorch)
    OLLAMA_BASE_URL: str = "http://localhost:11434"
    LOCAL_LLM_MODEL: str = "gemma2:2b"
    
    # Audio Synthesis (ElevenLabs API - Free Tier: 10k chars/mo)
    ELEVENLABS_API_KEY: Optional[str] = None
    ELEVENLABS_VOICE_ID: str = "pNInz6obpgDQGcFmaJgB"  # Adam / Calm Naturalist
    
    # Observability (Sentry Developer Free Tier)
    SENTRY_DSN: Optional[str] = None
    
    # Optional Database Sync (MongoDB Atlas M0 Free Tier)
    MONGODB_URI: Optional[str] = None
    
    # Storage Paths
    DATABASE_PATH: str = "data/journal.db"
    ECOLOGY_DATA_PATH: str = "data/circadian_ecology.csv"
    UPLOAD_DIR: str = "static/uploads"
    AUDIO_CACHE_DIR: str = "static/audio/cache"

    class Config:
        env_file = ".env"
        extra = "ignore"

settings = Settings()

# Ensure directories exist
os.makedirs("data", exist_ok=True)
os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
os.makedirs(settings.AUDIO_CACHE_DIR, exist_ok=True)
