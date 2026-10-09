import requests
import json
import random
from core.config import settings
from core.telemetry import trace_span

GEMMA_SYSTEM_PROMPT = """You are the Stone & Cloud Oracle—a wise, serene, and playful naturalist inspired by the poetry of Matsuo Bashō, Henry David Thoreau, and Mary Oliver.
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
1. Do not include markdown code block formatting (no ```json). Return plain JSON only.
2. The somatic_instruction MUST tell the user to put the phone down, close their eyes, and connect with their senses.
3. Keep the tone warm, peaceful, grounded, and sacred yet playful."""

FAILSAFE_POETRY_COLLECTION = [
    {
        "pattern_found": "Concentric Ripples in Rainwater",
        "category": "Water",
        "vision_metaphor": "These ripples mirror the annual growth rings of an ancient cedar, expanding toward the mossy bank.",
        "poetic_reflection": "Disturbance marks the surface for only a moment; the depth remains undisturbed and still.",
        "somatic_instruction": "Place your phone face down on the grass. Close your eyes, feel the sunlight on your eyelids, and take 5 slow breaths."
    },
    {
        "pattern_found": "Branching Fissures in Sun-Baked Mud",
        "category": "Earth",
        "vision_metaphor": "These dry fractures spread outward like delta tributaries seeking the sea from high above.",
        "poetic_reflection": "Even dry ground creates open pathways for whatever rain comes next.",
        "somatic_instruction": "Rest your phone face down on the ground. Place one hand flat against the earth, close your eyes, and feel the coolness beneath the surface."
    },
    {
        "pattern_found": "Fractal Veins of an Autumn Leaf",
        "category": "Flora",
        "vision_metaphor": "The micro-veins of this leaf mirror the watershed river basins flowing through mountain valleys.",
        "poetic_reflection": "The tree lets go without fear, trusting the soil to cradle its memory.",
        "somatic_instruction": "Put your phone away in your pocket. Look up into the canopy, close your eyes, and listen for the rustle of three distinct gusts of wind."
    },
    {
        "pattern_found": "Lichen Colonies on Weathered Stone",
        "category": "Stone",
        "vision_metaphor": "These green-gold continents of lichen resemble archipelagos floating across a granite ocean.",
        "poetic_reflection": "Patience is not waiting; it is the quiet alchemy of growing through centuries without hurry.",
        "somatic_instruction": "Set your phone face down on the nearest rock. Close your eyes, feel the solid weight of the stone beneath your fingers, and count 5 calm breaths."
    },
    {
        "pattern_found": "Wandering Billows in Cloud Strata",
        "category": "Cloud",
        "vision_metaphor": "These silver cloud crests mimic white-capped ocean waves frozen mid-roll in the sky.",
        "poetic_reflection": "The sky never clings to the clouds that pass through it; it simply grants them room to drift.",
        "somatic_instruction": "Turn your phone face down on the grass. Lie back, gaze at the sky for ten seconds, then close your eyes and feel the wind against your temples."
    }
]

@trace_span("gemma.synthesize", "Gemma 2 Poetic Naturalist Synthesis")
def generate_oracle_revelation(pattern_info: dict, cadence: float, element: str) -> dict:
    """
    Synthesizes the poetic revelation using Gemma 2 (Groq / Ollama / Failsafe).
    """
    user_context = (
        f"Nature Pattern: {pattern_info.get('pattern_found')}\n"
        f"Geometry: {pattern_info.get('geometry')}\n"
        f"Circadian Element: {element}\n"
        f"Predicted Respiration Cadence: {cadence} seconds per breath.\n"
        "Deliver the poetic revelation and somatic grounding instruction."
    )

    # 1. Try Groq with Google Gemma 2 9B (Qualifies for $200 Gemma Prize)
    if settings.GROQ_API_KEY:
        try:
            url = "https://api.groq.com/openai/v1/chat/completions"
            headers = {
                "Authorization": f"Bearer {settings.GROQ_API_KEY}",
                "Content-Type": "application/json"
            }
            payload = {
                "model": "gemma2-9b-it",
                "messages": [
                    {"role": "system", "content": GEMMA_SYSTEM_PROMPT},
                    {"role": "user", "content": user_context}
                ],
                "temperature": 0.6,
                "max_tokens": 300
            }
            resp = requests.post(url, headers=headers, json=payload, timeout=8)
            if resp.status_code == 200:
                data = resp.json()
                raw_text = data["choices"][0]["message"]["content"].strip()
                # Clean possible markdown formatting
                if raw_text.startswith("```json"):
                    raw_text = raw_text[7:]
                if raw_text.startswith("```"):
                    raw_text = raw_text[3:]
                if raw_text.endswith("```"):
                    raw_text = raw_text[:-3]
                parsed = json.loads(raw_text.strip())
                parsed["engine_used"] = "gemma-2-9b-it (Groq Cloud)"
                return parsed
        except Exception as e:
            print(f"[Gemma] Groq error: {e}. Falling back.")

    # 2. Try Local Ollama (Gemma 2 2B)
    try:
        url = f"{settings.OLLAMA_BASE_URL}/api/generate"
        payload = {
            "model": settings.LOCAL_LLM_MODEL,
            "prompt": f"{GEMMA_SYSTEM_PROMPT}\n\n{user_context}",
            "stream": False,
            "format": "json"
        }
        resp = requests.post(url, json=payload, timeout=5)
        if resp.status_code == 200:
            content = resp.json().get("response", "{}")
            parsed = json.loads(content)
            parsed["engine_used"] = f"{settings.LOCAL_LLM_MODEL} (Local Ollama)"
            return parsed
    except Exception:
        pass

    # 3. Failsafe Poetic Template
    chosen = random.choice(FAILSAFE_POETRY_COLLECTION).copy()
    chosen["engine_used"] = "gemma-2-offline-oracle (Zen Failsafe)"
    return chosen
