import uuid
import os
import shutil
from datetime import datetime
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from core.config import settings
from core.schemas import OracleConsultResponse, JournalEntry, HealthStatus
from core.database import init_db, save_entry, get_entries
from core.telemetry import init_sentry
from core.rhythm_forecaster import forecaster, TABPFN_AVAILABLE
from core.vision_analyzer import analyze_nature_pattern
from core.oracle_agent import generate_oracle_revelation
from core.audio_narrator import synthesize_zen_voice

# Initialize Telemetry & Database
init_sentry()
init_db()

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.VERSION,
    description="Micro-Meditations from Nature's Shapes using Gemma 2 & TabPFN"
)

# Enable CORS for mobile development & Vite dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount static directories
os.makedirs("static", exist_ok=True)
os.makedirs("static/uploads", exist_ok=True)
os.makedirs("static/audio/cache", exist_ok=True)
app.mount("/static", StaticFiles(directory="static"), name="static")

@app.post("/api/v1/oracle/consult", response_model=OracleConsultResponse)
async def consult_oracle(
    image: UploadFile = File(...),
    hour_of_day: float = Form(None),
    temperature_c: float = Form(20.0),
    cloud_cover_pct: float = Form(30.0),
    season_day: int = Form(None)
):
    consult_id = str(uuid.uuid4())
    
    # 1. Resolve environmental context defaults
    now = datetime.now()
    hour = hour_of_day if hour_of_day is not None else round(now.hour + now.minute / 60.0, 1)
    day_of_year = season_day if season_day is not None else now.timetuple().tm_yday
    
    # 2. Save incoming image
    file_ext = image.filename.split(".")[-1] if "." in image.filename else "jpg"
    filename = f"{consult_id}.{file_ext}"
    local_image_path = os.path.join(settings.UPLOAD_DIR, filename)
    with open(local_image_path, "wb") as buffer:
        shutil.copyfileobj(image.file, buffer)

    # 3. Step 1: TabPFN Circadian Respiration Forecasting ($200 Prize)
    rhythm = forecaster.predict_rhythm(
        hour=hour,
        temp=temperature_c,
        clouds=cloud_cover_pct,
        season_day=day_of_year
    )
    cadence = rhythm["breath_cadence_seconds"]
    element = rhythm["elemental_focus"]

    # 4. Step 2: Multimodal Geometry Analysis (Llama 3.2 Vision)
    pattern_data = analyze_nature_pattern(local_image_path)

    # 5. Step 3: Gemma 2 Poetic Naturalist Synthesis ($200 Prize)
    revelation = generate_oracle_revelation(
        pattern_info=pattern_data,
        cadence=cadence,
        element=element
    )

    # 6. Step 4: ElevenLabs Ambient Voice Synthesis ($100 Prize)
    speech_text = (
        f"{revelation.get('vision_metaphor')} "
        f"{revelation.get('somatic_instruction')}"
    )
    audio_url = synthesize_zen_voice(speech_text, consult_id)

    # 7. Persist to SQLite Nature Journal
    save_entry(
        id=consult_id,
        image_filename=f"/static/uploads/{filename}",
        pattern_found=revelation.get("pattern_found", "Ephemeral Pattern"),
        category=revelation.get("category", "Water"),
        vision_metaphor=revelation.get("vision_metaphor", ""),
        poetic_reflection=revelation.get("poetic_reflection", ""),
        somatic_instruction=revelation.get("somatic_instruction", ""),
        breath_cadence_seconds=cadence,
        elemental_focus=element,
        audio_url=audio_url
    )

    return OracleConsultResponse(
        id=consult_id,
        pattern_found=revelation.get("pattern_found", "Ephemeral Pattern"),
        category=revelation.get("category", "Water"),
        vision_metaphor=revelation.get("vision_metaphor", ""),
        poetic_reflection=revelation.get("poetic_reflection", ""),
        somatic_instruction=revelation.get("somatic_instruction", ""),
        breath_count=5,
        breath_cadence_seconds=cadence,
        elemental_focus=element,
        audio_url=audio_url,
        created_at=datetime.utcnow(),
        engine_used=revelation.get("engine_used", "Gemma 2")
    )

@app.get("/api/v1/journal")
async def get_journal(limit: int = 50, offset: int = 0):
    return get_entries(limit=limit, offset=offset)

@app.get("/api/v1/health", response_model=HealthStatus)
async def health_check():
    return HealthStatus(
        status="healthy",
        engine_mode=settings.AI_ENGINE_MODE,
        local_ollama_online=False,
        groq_api_configured=bool(settings.GROQ_API_KEY),
        tabpfn_status="Active" if TABPFN_AVAILABLE else "Fallback (RandomForest)",
        elevenlabs_configured=bool(settings.ELEVENLABS_API_KEY),
        sentry_active=bool(settings.SENTRY_DSN)
    )

# Mount frontend production build after all API routes are registered
if os.path.exists("ui/dist"):
    app.mount("/", StaticFiles(directory="ui/dist", html=True), name="frontend")

