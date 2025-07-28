# vintrick-backend/app/services/harvest_load_service.py

from sqlalchemy.orm import Session
from app.models.harvestload import HarvestLoad
from app.schemas.harvestload import HarvestLoadCreate
from uuid import UUID


def get_all_harvestloads(session: Session):
    return session.query(HarvestLoad).all()


def get_harvestload_by_uid(session: Session, uid: UUID):
    return session.query(HarvestLoad).filter(HarvestLoad.uid == uid).first()


def create_harvestload(session: Session, load_data: HarvestLoadCreate):
    load = HarvestLoad(**load_data.dict())
    session.add(load)
    session.commit()
    session.refresh(load)
    return load


def update_harvestload(session: Session, uid: UUID, updates: dict):
    load = get_harvestload_by_uid(session, uid)
    if not load:
        return None
    for key, value in updates.items():
        setattr(load, key, value)
    session.commit()
    return load


def delete_harvestload(session: Session, uid: UUID):
    load = get_harvestload_by_uid(session, uid)
    if not load:
        return None
    session.delete(load)
    session.commit()
    return load
