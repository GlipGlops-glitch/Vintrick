# vintrick-backend/tests/python/test_harvest_dao.py

import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import Base, HarvestLoad
from dao.harvest_load_dao import create_load, get_all_loads

@pytest.fixture(scope="module")
def test_db():
    engine = create_engine('sqlite:///:memory:')
    Base.metadata.create_all(engine)
    Session = sessionmaker(bind=engine)
    yield Session()


def test_create_and_get_load(test_db):
    data = {"loadDate": "2025-01-01", "weight": 1000}
    created = create_load(test_db, data)
    assert created.id is not None

    all_loads = get_all_loads(test_db)
    assert len(all_loads) == 1
    assert all_loads[0].weight == 1000
