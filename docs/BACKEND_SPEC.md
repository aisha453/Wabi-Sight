# BACKEND SPECIFICATION & ARCHITECTURE MANUAL
## Project: 🪨 The Stone & Cloud Oracle (Micro-Meditations from Nature's Shapes)
## Target: Hacktoberfest 2026 — "Touch Grass" Challenge

> [!IMPORTANT]
> **STRICT COMPLIANCE REQUIRED FOR ANTIGRAVITY CODING AGENT**:
> Every route, Pydantic schema, prompt template, fallback sequence, and TabPFN calculation in this document MUST be implemented exactly as specified. Do NOT alter endpoint signatures, invent unapproved dependencies, or remove fallback safeguards.

---

## 1. System Philosophy & Dual-Engine AI Architecture

The backend is built with **FastAPI** (Python 3.10+) to deliver **dual-engine AI execution**:

```
                                  [ Incoming Request ]
                                           │
                                           ▼
                                 Is AI_ENGINE_MODE set?
                                  ├── 'local' ────► Run Local Ollama / PyTorch
                                  ├── 'groq'  ────► Run Groq Cloud API (Free)
                                  └── 'auto'  ────► Probe Local Ollama (timeout: 1.5s)
                                                        │
                                          ┌─────────────┴─────────────┐
                                      [Reachable]                [Unreachable]
                                          │                             │
                                          ▼                             ▼
                                   Run Local Ollama            Run Groq Cloud API
                                   (Gemma 2 2B)             (Gemma 2 9B + Vision)
                                                                        │
                                                               [If Groq fails/no key]
                                                                        │
                                                                        ▼
                                                             Offline Heuristic Engine
                                                            (Guarantees zero crashes)
```

1. **Local Edge Mode (Laptop / Offline)**:
   - Evaluates images via local Ollama / PyTorch (`gemma2:2b` and `moondream2` / `paligemma`).
   - Requires zero internet connection.
2. **Cloud Fallback Mode (Phone on Trail / Render Judges)**:
   - When the user is outside on their phone or judges visit Render:
   - Connects to **Groq Cloud API** using `gemma2-9b-it` (Google Gemma open-weights) and `llama-3.2-11b-vision-preview`.
   - **Zero Cost**: Groq's developer tier is completely free ($0), requires no credit card, and runs at 500+ tokens/sec.
3. **Failsafe Offline Heuristic Mode**:
   - If both local Ollama and cloud APIs are unreachable, a built-in algorithmic poetic generator synthesizes the response so the application **never throws an HTTP 500 error**.

---

## 2. Directory Structure & File Manifest

```
core/
├── __init__.py
├── config.py              # Pydantic Settings & environment variable validation
├── schemas.py             # Pydantic Request & Response models
├── database.py            # SQLite database initialization & CRUD helpers
├── rhythm_forecaster.py   # [TabPFN] Prior Labs tabular foundation model engine
├── vision_analyzer.py     # Vision analysis (Groq Llama-3.2-Vision / local VLM)
├── oracle_agent.py        # [Gemma 2] Poetic naturalist prompt & synthesis engine
├── audio_narrator.py      # [ElevenLabs] Voice synthesis & audio streaming
├── telemetry.py           # [Sentry] Performance spans & transaction tracking
└── app.py                 # FastAPI application, CORS, routers, and static file mounting
data/
├── circadian_ecology.csv  # Reference training tabular dataset for TabPFN
└── journal.db             # Local SQLite database (auto-generated)
static/
├── audio/
│   ├── singing_bowl.mp3   # Tibetan singing bowl chime asset
│   └── cache/             # Generated ElevenLabs MP3 speech files
```

---

## 3. Pydantic Schemas (`core/schemas.py`)

```python
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
    created_at: str

class HealthStatus(BaseModel):
    status: Literal["healthy", "degraded"]
    engine_mode: str
    local_ollama_online: bool
    groq_api_configured: bool
    tabpfn_status: str
    elevenlabs_configured: bool
    sentry_active: bool
```

---

## 4. API Endpoints Specification

### 1. `POST /api/v1/oracle/consult`
- **Request Encoding**: `multipart/form-data`
- **Form Parameters**:
  - `image`: `UploadFile` (Required) — JPEG/PNG/WebP image of the natural pattern.
  - `hour_of_day`: `Optional[float]` (Default: current local hour, 0.0–23.9)
  - `temperature_c`: `Optional[float]` (Default: 20.0)
  - `cloud_cover_pct`: `Optional[float]` (Default: 40.0)
  - `season_day`: `Optional[int]` (Default: current day of year, 1–365)
- **Response**: `OracleConsultResponse` (HTTP 200)

### 2. `GET /api/v1/journal`
- **Query Parameters**: `limit: int = 50`, `offset: int = 0`
- **Response**: `List[JournalEntry]` (HTTP 200)

### 3. `GET /api/v1/health`
- **Response**: `HealthStatus` (HTTP 200)

### 4. Static Audio Streaming: `GET /static/audio/{filename}`
- Serves cached ElevenLabs speech files and `singing_bowl.mp3`.

---

## 5. TabPFN Circadian & Biome Rhythm Engine (`core/rhythm_forecaster.py`)

### Training Dataset Specification (`data/circadian_ecology.csv`)
A reference dataset modeling natural circadian cycles and optimal respiratory frequencies:

```csv
hour_of_day,temperature_c,cloud_cover_pct,season_day,breath_cadence_s,element_category
6.5,14.0,20.0,105,4.0,Air
7.0,16.5,30.0,105,4.2,Air
12.0,26.0,10.0,105,5.5,Earth
13.5,27.5,15.0,105,5.5,Earth
18.0,22.0,45.0,105,6.0,Water
19.5,19.0,60.0,105,6.5,Water
21.0,17.0,80.0,105,7.0,Stone
```

### Exact Implementation Code
```python
import pandas as pd
import numpy as np
from tabpfn import TabPFNRegressor, TabPFNClassifier
from core.telemetry import trace_span

class RhythmForecaster:
    def __init__(self, data_path: str = "data/circadian_ecology.csv"):
        self.df = pd.read_csv(data_path)
        self.feature_cols = ["hour_of_day", "temperature_c", "cloud_cover_pct", "season_day"]
        
        # Prepare training data
        self.X_train = self.df[self.feature_cols].values
        self.y_cadence = self.df["breath_cadence_s"].values
        self.y_element = self.df["element_category"].values
        
        # Initialize TabPFN models
        self.regressor = TabPFNRegressor(device='cpu')
        self.regressor.fit(self.X_train, self.y_cadence)

    @trace_span("tabpfn.forecast")
    def predict_rhythm(self, hour: float, temp: float, clouds: float, season_day: int):
        X_test = np.array([[hour, temp, clouds, season_day]])
        
        # Predict optimal breath cadence
        predicted_cadence = float(self.regressor.predict(X_test)[0])
        # Clamp between 3.5s and 8.0s for physiological comfort
        clamped_cadence = max(3.5, min(8.0, round(predicted_cadence, 1)))
        
        # Map element based on hour and conditions
        if 5.0 <= hour < 11.0:
            element = "Air"
        elif 11.0 <= hour < 16.0:
            element = "Earth"
        elif 16.0 <= hour < 20.0:
            element = "Water"
        else:
            element = "Stone"
            
        return {
            "breath_cadence_seconds": clamped_cadence,
            "elemental_focus": element
        }
```

---

## 6. Dual AI Engine & Verbatim Prompts (`core/oracle_agent.py`)

### System Prompt for Gemma 2
```text
You are the Stone & Cloud Oracle—a wise, serene, and playful naturalist inspired by the poetry of Matsuo Bashō, Henry David Thoreau, and Mary Oliver.
Your mission is to get humans OFF their screens and deeply connected to physical nature.
Analyze the provided visual pattern and local environment context.

You must respond ONLY with valid JSON matching this exact structure:
{
  "pattern_found": "A short 4-7 word title of the natural pattern spotted",
  "category": "Water" | "Earth" | "Flora" | "Cloud" | "Stone",
  "vision_metaphor": "One poetic sentence comparing this pattern to another natural wonder.",
  "poetic_reflection": "One sentence offering a philosophical grounding insight about stillness, impermanence, or harmony.",
  "somatic_instruction": "One direct, vivid instruction commanding the user to put their phone face down on the grass or ground, close their eyes, and feel a specific outdoor sensation."
}

Rules:
1. Do not include markdown code block formatting (```json). Return plain JSON only.
2. The somatic_instruction MUST tell the user to put the phone down, close their eyes, and connect with their senses.
3. Keep the tone warm, peaceful, grounded, and sacred yet playful.
```

### Vision Analyzer (`core/vision_analyzer.py`)
- Evaluates the uploaded image to extract:
  - Dominant geometry: concentric rings, branch fissures, dendritic fractures, cloud silhouettes, moss speckles.
  - Returns a clean descriptive summary to feed into Gemma 2.

---

## 7. Hybrid Audio Engine (`core/audio_narrator.py`)

```python
import os
import requests
from core.config import settings

def synthesize_voice(text: str, filename: str) -> str | None:
    """
    Synthesizes speech using ElevenLabs API if key is present.
    If no key or error, returns None so frontend uses Web Speech API.
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
        "model_id": "eleven_monolingual_v1",
        "voice_settings": {
            "stability": 0.75,
            "similarity_boost": 0.85
        }
    }
    
    try:
        response = requests.post(url, json=payload, headers=headers, timeout=10)
        if response.status_code == 200:
            os.makedirs("static/audio/cache", exist_ok=True)
            filepath = os.path.join("static/audio/cache", f"{filename}.mp3")
            with open(filepath, "wb") as f:
                f.write(response.content)
            return f"/static/audio/cache/{filename}.mp3"
    except Exception as e:
        print(f"ElevenLabs synthesis error: {e}")
        
    return None
```

---

## 8. Sentry Tracing & Observability (`core/telemetry.py`)

- Initialized in `core/app.py`:
  ```python
  import sentry_sdk
  if settings.SENTRY_DSN:
      sentry_sdk.init(
          dsn=settings.SENTRY_DSN,
          traces_sample_rate=1.0,
          profiles_sample_rate=1.0,
          environment="production"
      )
  ```
- Wrap each stage of the Oracle consult in a Sentry span:
  - `tabpfn.forecast`: measures latency of TabPFN tabular prediction.
  - `vision.analyze`: measures multimodal image extraction.
  - `gemma.synthesize`: measures Gemma 2 token generation and latency.
  - `audio.synthesize`: measures ElevenLabs API turnaround.

---

## 9. SQLite Persistence Schema (`core/database.py`)

```sql
CREATE TABLE IF NOT EXISTS journal_entries (
    id TEXT PRIMARY KEY,
    image_filename TEXT NOT NULL,
    pattern_found TEXT NOT NULL,
    category TEXT NOT NULL,
    vision_metaphor TEXT NOT NULL,
    poetic_reflection TEXT NOT NULL,
    somatic_instruction TEXT NOT NULL,
    breath_cadence_seconds REAL NOT NULL,
    elemental_focus TEXT NOT NULL,
    audio_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```
