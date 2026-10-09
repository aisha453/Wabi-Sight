import sqlite3
import os
from typing import List, Optional
from core.config import settings
from core.schemas import JournalEntry

def init_db():
    os.makedirs(os.path.dirname(settings.DATABASE_PATH), exist_ok=True)
    conn = sqlite3.connect(settings.DATABASE_PATH)
    cursor = conn.cursor()
    cursor.execute("""
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
    )
    """)
    conn.commit()
    conn.close()

def save_entry(
    id: str,
    image_filename: str,
    pattern_found: str,
    category: str,
    vision_metaphor: str,
    poetic_reflection: str,
    somatic_instruction: str,
    breath_cadence_seconds: float,
    elemental_focus: str,
    audio_url: Optional[str]
):
    conn = sqlite3.connect(settings.DATABASE_PATH)
    cursor = conn.cursor()
    cursor.execute("""
    INSERT INTO journal_entries (
        id, image_filename, pattern_found, category, vision_metaphor,
        poetic_reflection, somatic_instruction, breath_cadence_seconds,
        elemental_focus, audio_url
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        id, image_filename, pattern_found, category, vision_metaphor,
        poetic_reflection, somatic_instruction, breath_cadence_seconds,
        elemental_focus, audio_url
    ))
    conn.commit()
    conn.close()

def get_entries(limit: int = 50, offset: int = 0) -> List[JournalEntry]:
    conn = sqlite3.connect(settings.DATABASE_PATH)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    cursor.execute("""
    SELECT * FROM journal_entries ORDER BY created_at DESC LIMIT ? OFFSET ?
    """, (limit, offset))
    rows = cursor.fetchall()
    conn.close()
    
    entries = []
    for r in rows:
        entries.append(JournalEntry(
            id=r["id"],
            image_filename=r["image_filename"],
            pattern_found=r["pattern_found"],
            category=r["category"],
            vision_metaphor=r["vision_metaphor"],
            poetic_reflection=r["poetic_reflection"],
            somatic_instruction=r["somatic_instruction"],
            breath_cadence_seconds=r["breath_cadence_seconds"],
            elemental_focus=r["elemental_focus"],
            audio_url=r["audio_url"],
            created_at=str(r["created_at"])
        ))
    return entries
