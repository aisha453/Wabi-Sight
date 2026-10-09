# Multi-stage build: Node for frontend, Python for backend
FROM node:20-slim AS frontend-builder
WORKDIR /app/ui
COPY ui/package*.json ./
RUN npm install
COPY ui/ ./
RUN npm run build

FROM python:3.11-slim
WORKDIR /app
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential libsndfile1 curl && \
    rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY core/ ./core/
COPY data/ ./data/
COPY static/ ./static/
COPY --from=frontend-builder /app/ui/dist ./ui/dist

ENV PORT=8000
EXPOSE 8000
CMD ["uvicorn", "core.app:app", "--host", "0.0.0.0", "--port", "8000"]
