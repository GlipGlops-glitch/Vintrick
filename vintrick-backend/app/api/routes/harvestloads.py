# vintrick-backend/app/api/routes/harvestloads.py
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.db import SessionLocal
from app.crud import harvestload as crud
from app.schemas import harvestload as schemas

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/harvestloads", response_model=list[schemas.HarvestLoadOut])
def list_harvestloads(db: Session = Depends(get_db)):
    return crud.get_harvestloads(db)

@router.post("/harvestloads", response_model=schemas.HarvestLoadOut)
def create_harvestload(load: schemas.HarvestLoadCreate, db: Session = Depends(get_db)):
    return crud.create_harvestload(db, load)

