import os
import requests
from typing import Optional
from core.config import settings
from core.telemetry import trace_span

@trace_span("audio.synthesize", "ElevenLabs Zen Voice Synthesis")
def synthesize_zen_voice(text: str, filename: str) -> Optional[str]:
    """
    Synthesizes speech using ElevenLabs API if key is present.
    If no key or error, returns None so frontend smoothly triggers Web Speech API.
    """
    if not settings.ELEVENLABS_API_KEY:
        return None
        
    url = f"https://api.elevenlabs.io/v1/text-to-speech/{settings.ELEVENLABS_VOICE_ID}"
    headers = {
        "xi-api-key": settings.ELEVENLABS_API_KEY,
        "Content-Type": "application/json"
    }
    payload = {
        "text": text,
        "model_id": "eleven_flash_v2_5",
        "voice_settings": {
            "stability": 0.75,
            "similarity_boost": 0.85
        }
    }
    
    try:
        response = requests.post(url, json=payload, headers=headers, timeout=8)
        if response.status_code == 200:
            os.makedirs(settings.AUDIO_CACHE_DIR, exist_ok=True)
            rel_path = f"static/audio/cache/{filename}.mp3"
            with open(rel_path, "wb") as f:
                f.write(response.content)
            return f"/{rel_path}"
    except Exception as e:
        print(f"[ElevenLabs] Audio synthesis error: {e}. Falling back to Web Speech.")
        
    return None
