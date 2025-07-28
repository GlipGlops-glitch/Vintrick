# vintrick-backend/app/main.py
from fastapi import FastAPI
from app.api.routes import auth, harvestloads
from app.core.db import engine, Base

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Vintrick API")

app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(harvestloads.router, prefix="/api", tags=["harvestloads"])
