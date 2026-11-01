import requests
from PIL import Image
from io import BytesIO

img = BytesIO()
Image.new("RGB", (30, 30), color="forestgreen").save(img, "JPEG")
img.seek(0)

url = "https://stone-cloud-oracle.onrender.com/api/v1/oracle/consult"
print(f"Pinging live Render endpoint: {url}...")

resp = requests.post(
    url,
    files={"image": ("nature_specimen.jpg", img, "image/jpeg")},
    data={
        "hour_of_day": 15.5,
        "temperature_c": 22.0,
        "cloud_cover_pct": 30.0
    },
    timeout=25
)

print(f"Status Code: {resp.status_code}")
if resp.status_code == 200:
    data = resp.json()
    print("SUCCESS! Live Oracle Response:")
    print("  Pattern Found:", data.get("pattern_found"))
    print("  Vision Metaphor:", data.get("vision_metaphor"))
    print("  Somatic Grounding:", data.get("somatic_instruction"))
    print("  Audio URL:", data.get("audio_url"))
    print("  Engine Used:", data.get("engine_used"))
else:
    print("Error:", resp.text)
