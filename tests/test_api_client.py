import unittest
import os
import sys
from fastapi.testclient import TestClient

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from core.app import app

class TestAPIEndpoints(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.client = TestClient(app)

    def test_health_endpoint(self):
        response = self.client.get("/api/v1/health")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data["status"], "healthy")
        self.assertIn("engine_mode", data)
        self.assertIn("tabpfn_status", data)

    def test_journal_endpoint(self):
        response = self.client.get("/api/v1/journal")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIsInstance(data, list)

    def test_consult_endpoint_with_image(self):
        # Create a tiny 1x1 test image
        from io import BytesIO
        from PIL import Image

        img_byte_arr = BytesIO()
        image = Image.new('RGB', (10, 10), color='green')
        image.save(img_byte_arr, format='JPEG')
        img_byte_arr.seek(0)

        response = self.client.post(
            "/api/v1/oracle/consult",
            files={"image": ("test_nature.jpg", img_byte_arr, "image/jpeg")},
            data={
                "hour_of_day": 12.5,
                "temperature_c": 22.0,
                "cloud_cover_pct": 30.0
            }
        )
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn("id", data)
        self.assertIn("pattern_found", data)
        self.assertIn("vision_metaphor", data)
        self.assertIn("poetic_reflection", data)
        self.assertIn("somatic_instruction", data)
        self.assertIn("breath_cadence_seconds", data)
        self.assertIn("elemental_focus", data)

if __name__ == "__main__":
    unittest.main()
