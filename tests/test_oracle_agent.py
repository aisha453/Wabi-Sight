import unittest
import os
import sys

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from core.oracle_agent import generate_oracle_revelation

class TestOracleAgent(unittest.TestCase):
    def test_revelation_structure(self):
        sample_pattern = {
            "pattern_found": "Concentric Ripples in Rainwater",
            "category": "Water",
            "geometry": "concentric circular ripples"
        }
        res = generate_oracle_revelation(sample_pattern, cadence=5.5, element="Water")
        
        self.assertIn("pattern_found", res)
        self.assertIn("category", res)
        self.assertIn("vision_metaphor", res)
        self.assertIn("poetic_reflection", res)
        self.assertIn("somatic_instruction", res)
        
        # Verify somatic grounding mandate
        somatic = res["somatic_instruction"].lower()
        self.assertTrue(any(w in somatic for w in ["phone", "eyes", "breath", "ground", "grass", "earth", "rock"]))

if __name__ == "__main__":
    unittest.main()
