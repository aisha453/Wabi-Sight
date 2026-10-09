import numpy as np
import wave
import struct
import os

def generate_tibetan_bowl(output_path="static/audio/singing_bowl.mp3", duration_sec=5.0, sample_rate=44100):
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    
    t = np.linspace(0, duration_sec, int(sample_rate * duration_sec), endpoint=False)
    
    # Tibetan Singing Bowl Frequencies (Fundamental + Harmonic partials)
    # 216 Hz (F3), 540 Hz, 864 Hz, 1404 Hz
    harmonics = [
        (216.0, 0.45, 1.8),   # Fundamental (slow decay)
        (540.0, 0.25, 2.2),   # Second harmonic
        (864.0, 0.15, 3.0),   # Third harmonic
        (1404.0, 0.08, 4.0),  # High metallic chime
    ]
    
    signal = np.zeros_like(t)
    for freq, amp, decay_rate in harmonics:
        # Subtle gentle beating/tremolo (1.5 Hz)
        beating = 1.0 + 0.15 * np.sin(2 * np.pi * 1.5 * t)
        decay = np.exp(-t * (decay_rate / 2.0))
        partial = amp * np.sin(2 * np.pi * freq * t) * decay * beating
        signal += partial
        
    # Attack envelope (smooth 30ms ramp up to prevent clicking)
    attack_samples = int(0.03 * sample_rate)
    attack = np.linspace(0, 1, attack_samples)
    signal[:attack_samples] *= attack
    
    # Normalize to 16-bit PCM range
    signal = signal / np.max(np.abs(signal)) * 0.9
    pcm_data = (signal * 32767).astype(np.int16)
    
    # Save as WAV (browser plays .mp3 or .wav transparently)
    wav_path = output_path.replace(".mp3", ".wav")
    with wave.open(wav_path, "wb") as wav_file:
        wav_file.setnchannels(1)  # Mono
        wav_file.setsampwidth(2)  # 16-bit
        wav_file.setframerate(sample_rate)
        wav_file.writeframes(pcm_data.tobytes())
        
    # Also write with .mp3 extension so either URL works
    with open(output_path, "wb") as f:
        with open(wav_path, "rb") as rf:
            f.write(rf.read())
            
    print(f"Generated Tibetan Singing Bowl chime at {output_path} and {wav_path}")

if __name__ == "__main__":
    generate_tibetan_bowl()
