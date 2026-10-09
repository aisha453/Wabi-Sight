import pandas as pd
import numpy as np
import os
from core.config import settings
from core.telemetry import trace_span

# Try importing TabPFN
TABPFN_AVAILABLE = False
try:
    from tabpfn import TabPFNRegressor
    TABPFN_AVAILABLE = True
except (ImportError, Exception) as e:
    # Graceful fallback to scikit-learn on identical dataset
    from sklearn.ensemble import RandomForestRegressor
    TABPFN_AVAILABLE = False

class RhythmForecaster:
    def __init__(self, data_path: str = None):
        path = data_path or settings.ECOLOGY_DATA_PATH
        if not os.path.exists(path):
            raise FileNotFoundError(f"Circadian ecology dataset not found at {path}")
            
        self.df = pd.read_csv(path)
        self.feature_cols = ["hour_of_day", "temperature_c", "cloud_cover_pct", "season_day"]
        
        self.X_train = self.df[self.feature_cols].values
        self.y_cadence = self.df["breath_cadence_s"].values
        
        if TABPFN_AVAILABLE:
            try:
                print("[TabPFN] Initializing Prior Labs TabPFNRegressor on CPU...")
                self.regressor = TabPFNRegressor(device='cpu')
                self.regressor.fit(self.X_train, self.y_cadence)
                self.model_name = "TabPFN (Prior Labs Foundation Model)"
            except Exception as e:
                print(f"[TabPFN] Failed initializing TabPFN ({e}), falling back to ensemble regressor.")
                self._init_fallback()
        else:
            self._init_fallback()

    def _init_fallback(self):
        from sklearn.ensemble import RandomForestRegressor
        self.regressor = RandomForestRegressor(n_estimators=50, random_state=42)
        self.regressor.fit(self.X_train, self.y_cadence)
        self.model_name = "Tabular Random Forest (Fallback)"

    @trace_span("tabpfn.forecast", "Forecast Circadian Respiration Cadence")
    def predict_rhythm(self, hour: float, temp: float, clouds: float, season_day: int):
        X_test = np.array([[hour, temp, clouds, season_day]])
        
        predicted_cadence = float(self.regressor.predict(X_test)[0])
        # Clamp between 3.5s and 8.0s for physiological harmony
        clamped_cadence = max(3.5, min(8.0, round(predicted_cadence, 1)))
        
        # Categorize elemental focus based on circadian time and weather
        if 5.0 <= hour < 11.0:
            element = "Air"
        elif 11.0 <= hour < 16.0:
            element = "Earth"
        elif 16.0 <= hour < 20.0:
            element = "Water"
        else:
            element = "Stone"
            
        return {
            "breath_cadence_seconds": clamped_cadence,
            "elemental_focus": element,
            "forecaster_used": self.model_name
        }

# Global singleton
forecaster = RhythmForecaster()
