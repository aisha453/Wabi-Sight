import unittest
import os
import sys
import uuid

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from core.database import init_db, save_entry, get_entries

class TestDatabase(unittest.TestCase):
    def test_crud_entry(self):
        init_db()
        test_id = f"test-{uuid.uuid4()}"
        save_entry(
            id=test_id,
            image_filename="/static/uploads/test.jpg",
            pattern_found="Test Ripple",
            category="Water",
            vision_metaphor="A metaphor of water.",
            poetic_reflection="A reflection of peace.",
            somatic_instruction="Put your phone face down on the grass.",
            breath_cadence_seconds=5.5,
            elemental_focus="Water",
            audio_url="/static/audio/test.mp3"
        )
        entries = get_entries(limit=10)
        self.assertTrue(any(e.id == test_id for e in entries))

if __name__ == "__main__":
    unittest.main()
