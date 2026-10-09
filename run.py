import sys
import os

# Configure stdout for Windows console compatibility
if sys.stdout and hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

import uvicorn
from core.config import settings
from core.app import app

if __name__ == "__main__":
    print(f"""
    ===============================================================
    [The Stone & Cloud Oracle] - Nature's Micro-Meditations
    Hacktoberfest 2026: 'Touch Grass' Challenge
    ===============================================================
    [Web App & API] Serving at: http://localhost:{settings.PORT}
    [Swagger Docs]  API Docs at: http://localhost:{settings.PORT}/docs
    [Engine Mode]   {settings.AI_ENGINE_MODE}
    ===============================================================
    """)
    uvicorn.run(
        app,
        host=settings.HOST,
        port=settings.PORT
    )
