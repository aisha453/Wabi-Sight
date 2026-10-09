import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from core.audio_narrator import synthesize_zen_voice

print("Testing ElevenLabs with eleven_flash_v2_5...")
audio_url = synthesize_zen_voice("Close your eyes and breathe with the ancient cedar.", "test_nature_voice")
print("Synthesized Audio URL:", audio_url)
if audio_url and os.path.exists(audio_url.lstrip('/')):
    size = os.path.getsize(audio_url.lstrip('/'))
    print(f"SUCCESS! Beautiful MP3 audio file generated! File size: {size} bytes.")
else:
    print("FAILED or returned None.")
