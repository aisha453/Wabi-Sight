# 🪨 The Stone & Cloud Oracle
> **Micro-Meditations from Nature's Shapes**  
> *Built for Hacktoberfest 2026: "Touch Grass" Challenge*

---

## 🌿 Overview & Philosophy

**The Stone & Cloud Oracle** is a mobile-first, screen-minimizing experience powered by open-source AI. Instead of demanding your visual attention, the Oracle guides you to observe natural patterns outdoors (puddle ripples, bark fissures, cracked earth, cloud formations), translates them into poetic metaphors using open-weight AI, and then **deliberately prompts you to put your phone face down on the grass, close your eyes, and listen to the world around you.**

---

## 🎯 Targeted Hacktoberfest Prize Categories ($900 Total Target)

1. **Grand Theme: "Touch Grass"** — Minimal screen time, open-source AI at its core, offline edge resilience.
2. **Best Use of Gemma ($200)** — Powered by Google's open-weight **Gemma 2** (local via Ollama / GGUF, or cloud fallback via Groq).
3. **Best Use of TabPFN ($200)** — Uses Prior Labs' tabular foundation model to forecast circadian respiration cadences and elemental grounding rhythms from ecological CSV data.
4. **Best Use of Render ($200)** — Configured for one-click deployment via `render.yaml`.
5. **Best Use of ElevenLabs ($100)** — High-fidelity ambient voice narration with native browser Web Speech API offline fallback.
6. **Best Use of Sentry Agent Tracing ($100)** — Instruments TabPFN, Gemma 2, and audio pipelines with end-to-end performance traces and waterfalls.
7. **Best Use of MongoDB Atlas ($100)** — Optional sync to free M0 cluster for cross-device journal persistence.

---

## 📚 Architectural Specification Docs (Strict Rules for Coding)

Before making changes, the **Anti-Gravity coding agent in VS Code** MUST strictly follow the specifications defined in the `docs/` folder:

- 📱 **[FRONTEND_SPEC.md](docs/FRONTEND_SPEC.md)**: Mobile layout, Bioluminescent Zen theme, Framer Motion spring physics, camera shutter, and screen-dimming breathing view.
- ⚙️ **[BACKEND_SPEC.md](docs/BACKEND_SPEC.md)**: FastAPI REST endpoints, Dual-Engine AI (Local Ollama + Free Groq fallback), TabPFN rhythm forecaster, and Sentry spans.
- 🌐 **[SYSTEM_ARCHITECTURE_SPEC.md](docs/SYSTEM_ARCHITECTURE_SPEC.md)**: End-to-end dataflow sequence, local HTTPS QR-code tunnel testing, Render deployment blueprint, and DEV.to submission guide.

---

## 🛠️ Quick Start (Local Development)

### 1. Backend Setup
```bash
python -m venv venv
venv\Scripts\activate  # On Windows
pip install -r requirements.txt
python run.py
```

### 2. Frontend Setup
```bash
cd ui
npm install
npm run dev
```

### 3. Mobile Testing (QR Code Tunnel)
```bash
npx localtunnel --port 5173
# Scan the generated QR code with your smartphone camera!
```

---

## 📜 License
Open source under Apache 2.0. Free forever for all who seek to touch grass.
