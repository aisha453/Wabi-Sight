import unittest
import os
import sys

# Ensure core is importable
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from core.rhythm_forecaster import RhythmForecaster

class TestTabPFNForecaster(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.forecaster = RhythmForecaster("data/circadian_ecology.csv")

    def test_circadian_predictions_bounds(self):
        # Dawn (6:30 AM)
        dawn = self.forecaster.predict_rhythm(hour=6.5, temp=15.0, clouds=20.0, season_day=105)
        self.assertIn("breath_cadence_seconds", dawn)
        self.assertTrue(3.5 <= dawn["breath_cadence_seconds"] <= 8.5)
        self.assertEqual(dawn["elemental_focus"], "Air")

        # Midday (1:00 PM)
        midday = self.forecaster.predict_rhythm(hour=13.0, temp=27.0, clouds=15.0, season_day=105)
        self.assertTrue(3.5 <= midday["breath_cadence_seconds"] <= 8.5)
        self.assertEqual(midday["elemental_focus"], "Earth")

        # Dusk (6:30 PM)
        dusk = self.forecaster.predict_rhythm(hour=18.5, temp=20.0, clouds=50.0, season_day=105)
        self.assertTrue(3.5 <= dusk["breath_cadence_seconds"] <= 8.5)
        self.assertEqual(dusk["elemental_focus"], "Water")

        # Night (10:00 PM)
        night = self.forecaster.predict_rhythm(hour=22.0, temp=16.0, clouds=80.0, season_day=105)
        self.assertTrue(3.5 <= night["breath_cadence_seconds"] <= 8.5)
        self.assertEqual(night["elemental_focus"], "Stone")

if __name__ == "__main__":
    unittest.main()
