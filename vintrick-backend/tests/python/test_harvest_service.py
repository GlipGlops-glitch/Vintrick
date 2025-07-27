# vintrick-backend/tests/python/test_harvest_service.py

import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import Base
from services.harvest_load_service import add_new_harvest_load, fetch_all_harvest_loads

@pytest.fixture(scope="module")
def test_db():
    engine = create_engine('sqlite:///:memory:')
    Base.metadata.create_all(engine)
    Session = sessionmaker(bind=engine)
    yield Session()


def test_add_and_fetch_load(test_db):
    load = add_new_harvest_load(test_db, {"loadDate": "2025-01-01", "weight": 500})
    assert load.weight == 500

    fetched = fetch_all_harvest_loads(test_db)
    assert any(l.weight == 500 for l in fetched)