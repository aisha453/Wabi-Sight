---
title: The Stone & Cloud Oracle: Screenless Micro-Meditations with Gemma 2 & TabPFN
published: true
tags: devchallenge, hf26challenge, ai, opensource
cover_image: https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=1200&auto=format&fit=crop
---

# 🪨 The Stone & Cloud Oracle (Wabi-Sight)
> *Micro-Meditations from Nature's Shapes — Built for Hacktoberfest 2026: "Touch Grass"*

---

## 🌿 What I Built — The Real Problem

We live in an era of epidemic screen fatigue. Even apps designed for the outdoors (trail navigators, species classifiers, AR games like Pokémon GO) suffer from the same fundamental flaw: **they keep our eyes glued downward to a piece of glowing glass.** Hikers walk past ancient canopies while staring at map pins; park visitors miss the rustle of leaves because they are managing digital notifications.

I built **The Stone & Cloud Oracle (Wabi-Sight)** to solve this exact problem by flipping the role of AI upside down. 

Instead of demanding screen time, the Oracle uses open-source multimodal AI to make **the screen the shortest, most disposable part of the experience (under 15 seconds)**. You spot an ephemeral organic pattern outdoors—puddle ripples, dried mud fissures, leaf veins, lichen on stones, or wandering cloud silhouettes—and take a quick snapshot. 

The Oracle extracts the pattern's geometry, crafts a poetic metaphor, and then **deliberately commands you to turn your phone face down in the grass, close your eyes, and listen to the world around you.**

The screen dims into an unhurried breathing circle matching your local circadian rhythm, accompanied by gentle voice guidance and a resonant Tibetan singing bowl chime that tells you when your meditation is complete.

---

## ⚡ How It Works — The Core Idea & Technical Approach

The Stone & Cloud Oracle is built with a **Dual-Engine architecture** engineered to unite cutting-edge open-weight foundation models, tabular machine learning, and screen-minimizing ambient audio.

```
[Outdoor User] ──► Snaps Photo (<input capture="environment">)
                         │
                         ▼
             [FastAPI Backend /api/v1]
                         │
        ┌────────────────┼────────────────┐
        ▼                ▼                ▼
[Prior Labs TabPFN]  [Google Gemma 2]  [ElevenLabs Voice]
Predicts Circadian    Poetic Naturalist Synthesizes Ambient
Breath Cadence (s)   Mind & Somatic Cue Audio Guidance
        │                │                │
        └────────────────┼────────────────┘
                         ▼
        [Screen Dims to Pulsing Orb (#030604)]
     "Put phone face down. Close your eyes."
                         │
                         ▼
     [Tibetan Singing Bowl Chime Sounds]
                         │
        [Saved to Offline Nature Scrapbook]
```

### 1. The 5-Step User Journey:
1. **Spot Organic Geometry (< 5s)**: Spot a fleeting natural pattern on a trail or park.
2. **Consult the Oracle (< 10s)**: Snap a quick photo with the mobile camera.
3. **Multi-Model Synthesis**:
   - **Prior Labs' TabPFN** evaluates local circadian conditions (`hour_of_day`, `temperature`, `cloud_cover`, `day_of_year`) from a reference ecological dataset to calculate your optimal resonant breathing cadence (e.g., 5.5s resonant rhythm for midday equanimity, 7.0s deep exhale for dusk).
   - **Google Gemma 2 (Open-Weights)** acts as a poetic naturalist (inspired by Bashō, Thoreau, and Mary Oliver), delivering a poetic metaphor, a philosophical reflection, and a tactile somatic grounding command.
   - **ElevenLabs Voice Synthesis** speaks the guidance aloud in an unhurried, serene naturalist voice so you never have to read the screen.
4. **The Screenless Immersion**: The screen dims to a tranquil near-black view (`#030604`). You place the phone face down in the grass, close your eyes, and breathe with the spoken guidance until a Tibetan singing bowl chime marks the end.
5. **Nature Scrapbook**: The observation, poetry, and element badge are preserved in an offline field journal.

### 2. Why Open Innovation Matters:
* **100% Offline Wilderness Resilience**: Cloud APIs fail deep in forests, canyons, and remote trails without cellular signal. Open-weight models ensure that mindfulness and AI guidance operate independently on edge devices anywhere in nature.
* **Privacy of Mind & Nature**: Contemplative reflections, nature photos, and personal circadian rhythms remain strictly local. No personal biometric or meditative thoughts are ever shared with corporate ad networks.
* **Zero Cost Forever**: Open weights and open tools empower anyone, from solo hikers to student environmental clubs, to explore outdoor mindfulness at zero financial cost.

---

## 🏆 Prize Categories

This project is submitted for the following challenge tracks and partner categories:

### 🌿 Primary Track: Touch Grass
The Stone & Cloud Oracle is built specifically to address screen fatigue and get people into physical nature. The application limits screen interaction to under 15 seconds: the user captures an organic pattern and is immediately instructed to place their phone face-down on the grass, close their eyes, and connect with physical reality through circadian breathwork and ambient audio cues.

### 🌟 Featured Sponsor Categories ($200 each):
* **Best Use of Gemma**: Powered by Google's open-weight **Gemma 2** (`gemma2-9b-it` via Groq Cloud acceleration and local Ollama support). Gemma 2 acts as the poetic naturalist brain, converting raw visual geometries (bark ridges, puddle ripples, cracked clay, leaf veins) into contemplative reflections and somatic grounding cues.
* **Best Use of TabPFN**: Integrates Prior Labs' **TabPFN** tabular foundation model (`pip install tabpfn`). TabPFN forecasts optimal circadian respiration cycles from multi-variate environmental data (`hour_of_day`, `temperature`, `cloud_cover`, `day_of_year`), harmonizing the user's breathing cadence with real-time natural rhythms.
* **Best Use of Render**: Fully containerized and hosted live on Render via a 1-click [`render.yaml`](https://github.com/aisha453/Wabi-Sight/blob/main/render.yaml) blueprint. Render serves the combined FastAPI AI backend and Vite/React production bundle at **[https://stone-cloud-oracle.onrender.com](https://stone-cloud-oracle.onrender.com)**.

### 🤝 Partner Categories ($100 each):
* **Best Use of ElevenLabs**: Employs ElevenLabs' newest `eleven_flash_v2_5` model for natural, documentary-style audio narration, enabling a true eyes-closed outdoor meditation where the screen is completely disposable.
* **Best Use of Sentry Agent Tracing**: End-to-end tracing instrumented with `sentry-sdk` across all pipeline spans (`tabpfn.forecast`, `gemma.synthesize`, `elevenlabs.audio`) to monitor agent latency, token consumption, and edge reliability.

---

## 🎬 Demo — Real Scenarios & Live Links

### 🚀 Try the Live Web App:
👉 **Live Deployed URL**: **[https://stone-cloud-oracle.onrender.com](https://stone-cloud-oracle.onrender.com)**  
*(Designed mobile-first: open on your smartphone or browser!)*

### 🎥 Video Walkthrough:
<!-- Replace with your YouTube / Loom video link -->
[![The Stone and Cloud Oracle Demo](https://img.youtube.com/vi/YOUR_VIDEO_ID/0.jpg)](https://www.youtube.com/watch?v=YOUR_VIDEO_ID)
> *[Link to 1-Minute Outdoor Demo Video]*

### 🌲 A Real Trail Scenario:
1. **The Spotting**: While walking in a park, I spotted concentric ripples in a shallow rainwater puddle.
2. **The Oracle's Revelation**:
   > *🌿 **The Vision**: "These ripples mirror the annual growth rings of an ancient cedar, expanding toward the mossy bank."*  
   > *🪨 **The Reflection**: "Disturbance marks the surface for only a moment; the depth remains undisturbed and still."*  
   > *🌬️ **The Grounding**: "Place your phone face down on the grass. Close your eyes, feel the sunlight on your eyelids, and take 5 slow breaths."*
3. **The Grounding**: I set the phone face down in the grass. The screen dimmed completely, soft audio guided my breaths, and a peaceful Tibetan bowl chime sounded at the 30-second mark.
4. **The Result**: I spent 10 seconds on my phone and 5 minutes actually listening to the birds and feeling the grass beneath me.

---

## 💻 Code — The GitHub Repository

The entire codebase is open-source under the Apache 2.0 license:

👉 **GitHub Repository**: **[https://github.com/aisha453/Wabi-Sight](https://github.com/aisha453/Wabi-Sight)**

### Repository Highlights:
* `core/`: FastAPI backend, Gemma 2 prompt engineering, TabPFN circadian forecaster, and ElevenLabs audio engine.
* `ui/`: Mobile-first React 18 + Vite + Tailwind CSS + Framer Motion spring animations.
* `docs/`: Comprehensive architectural specifications (`FRONTEND_SPEC.md`, `BACKEND_SPEC.md`, `SYSTEM_ARCHITECTURE_SPEC.md`).
* `tests/`: 6/6 automated unit and integration tests passing.
* `render.yaml` & `Dockerfile`: One-click production deployment manifests.

---

*Built with ❤️ for Hacktoberfest 2026. Remember to close your laptop and go touch grass!*
