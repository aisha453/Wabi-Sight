# 🪨 The Stone & Cloud Oracle (Wabi-Sight)
> **Micro-Meditations from Nature's Shapes**  
> *An open-weight AI companion designed to minimize screen time and maximize nature immersion.*

---

## 🌿 The "Touch Grass" Philosophy

Most digital technology pulls human attention deeper into glowing screens and endless feeds. **The Stone & Cloud Oracle** does the exact opposite:

1. **Spot Organic Geometry (< 5s)**: Spot a fleeting natural pattern on a trail, garden, or park (puddle ripples, dried mud fissures, leaf venation, tree bark, cloud formations).
2. **Consult the Oracle (< 10s)**: Snap a quick photo. An open-weight vision model interprets the organic geometry into a poetic metaphor and grounding insight.
3. **Put the Screen Away (100% Screen-Free)**: The app prompts:
   > *"Place your phone face down on the grass. Close your eyes, feel the sunlight on your eyelids, and take 5 slow breaths."*
4. **Resonant Mindfulness**: The screen dims to a soft, dark breathing circle matching your local circadian rhythm. Gentle spoken cues and a resonant Tibetan singing bowl chime guide you without ever having to look at a display.
5. **Nature Scrapbook**: The observation, poetry, and element badge are preserved in an offline field journal.

---

## ⚡ Core Technical Architecture & Open-Source Stack

The project brings together an ecosystem of cutting-edge open-source models, tabular foundation models, and screen-minimizing ambient audio:

| Component | Technology | Role & Innovation |
| :--- | :--- | :--- |
| **Poetic Reasoning Core** | **Google Gemma 2 (Open-Weights)** | Acts as the philosophical naturalist mind (inspired by Bashō, Thoreau, and Mary Oliver). Synthesizes natural geometry into reflections and tactile somatic grounding cues. Runs locally via Ollama or accelerated via Groq (`gemma2-9b-it`). |
| **Circadian Forecaster** | **Prior Labs' TabPFN** | Prior Labs' tabular foundation model analyzes local circadian weather and seasonal data (hour, temperature, cloud cover, day of year) to dynamically forecast the user's resonant respiration cadence (seconds/breath) and grounding element. |
| **Multimodal Vision** | **Llama 3.2 Vision / Local VLM** | Extracts geometric structures (concentric rings, branching fractals, radial patterns, dapples) and natural materials from trail photographs. |
| **Ambient Voice Guide** | **ElevenLabs Voice + Web Speech** | Synthesizes gentle, unhurried naturalist narration with automatic offline fallback to browser speech synthesis. |
| **Observability** | **Sentry Agent Tracing** | Instruments end-to-end multi-model execution, tracking latency and token metrics across TabPFN, vision, and Gemma 2 pipelines. |
| **Deployment** | **Render Cloud + Docker** | Fully containerized with a 1-click `render.yaml` blueprint for zero-config public deployment. |

---

## 🛡️ Why Open Innovation Matters

- **100% Offline Wilderness Resilience**: Backcountry trails and national parks rarely have 5G signals. Proprietary cloud APIs fail in the woods; open-weight models run locally on edge hardware with zero external dependencies.
- **Privacy for Personal Mind**: Mindfulness reflections, backyard coordinates, and meditative sessions belong to the user. No personal biometric or observation data is logged or mined by ad networks.
- **Zero Cost Forever**: Anyone, any school outdoor group, and any community nature club can run the software for free indefinitely.

---

## 🛠️ Quick Start (Local Development)

### 1. Backend Setup
```bash
python -m venv venv
venv\Scripts\activate  # On Windows (or source venv/bin/activate on Linux/macOS)
pip install -r requirements.txt
python run.py
```
Open **http://localhost:8000** in your browser to explore the web app.

### 2. Frontend Development (Optional)
```bash
cd ui
npm install
npm run dev
```

### 3. Mobile Testing (Instant HTTPS QR Code)
Mobile browsers require HTTPS for camera and microphone permissions. Generate an instant QR code tunnel:
```bash
python scripts/launch_mobile_tunnel.py
```
Scan the QR code with your iPhone or Android camera to run the app outdoors!

---

## 📚 Technical Documentation & Specs

- 📱 **[FRONTEND_SPEC.md](docs/FRONTEND_SPEC.md)**: Bioluminescent Sumi-e design system, Framer Motion springs, and screen-dimming breathing view.
- ⚙️ **[BACKEND_SPEC.md](docs/BACKEND_SPEC.md)**: Dual-Engine FastAPI, TabPFN circadian forecaster, and Sentry spans.
- 🌐 **[SYSTEM_ARCHITECTURE_SPEC.md](docs/SYSTEM_ARCHITECTURE_SPEC.md)**: End-to-end sequence diagrams, mobile tunnel architecture, and Render deployment.

---

## 📜 License
Open source under Apache 2.0. Free forever for all who seek to touch grass.
