# vintrick-backend/app/models/harvestload.py
from sqlalchemy import Column, Integer, String
from app.core.db import Base

class HarvestLoad(Base):
    __tablename__ = "harvestloads"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    weight = Column(Integer)

