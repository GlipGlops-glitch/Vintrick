# vintrick-backend/services/harvest_load_service.py

from dao.harvest_load_dao import get_all_loads, get_load_by_id, create_load, delete_load
from sqlalchemy.orm import Session
from typing import List, Optional
from models import HarvestLoad

def fetch_all_harvest_loads(session: Session) -> List[HarvestLoad]:
    try:
        return get_all_loads(session)
    except Exception as e:
        raise RuntimeError(f"Failed to fetch loads: {str(e)}")


def fetch_harvest_load_by_id(session: Session, load_id: int) -> Optional[HarvestLoad]:
    try:
        return get_load_by_id(session, load_id)
    except Exception as e:
        raise RuntimeError(f"Failed to fetch load with ID {load_id}: {str(e)}")


def add_new_harvest_load(session: Session, data: dict) -> HarvestLoad:
    try:
        return create_load(session, data)
    except Exception as e:
        raise RuntimeError(f"Failed to create load: {str(e)}")


def remove_harvest_load(session: Session, load_id: int) -> bool:
    try:
        return delete_load(session, load_id)
    except Exception as e:
        raise RuntimeError(f"Failed to delete load with ID {load_id}: {str(e)}")
