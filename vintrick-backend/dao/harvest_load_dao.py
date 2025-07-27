from models import HarvestLoad
from sqlalchemy.orm import Session

def get_all_loads(session: Session):
    return session.query(HarvestLoad).all()

def get_load_by_id(session: Session, load_id: int):
    return session.query(HarvestLoad).get(load_id)
