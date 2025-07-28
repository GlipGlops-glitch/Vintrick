# vintrick-backend/app/schemas/harvestload.py

from pydantic import BaseModel, Field
from typing import Optional
from uuid import UUID
from datetime import datetime

class HarvestLoadBase(BaseModel):
    Vintrace_ST: str
    Block: str
    Tons: float
    Press: str
    Tank: str
    WO: str
    Date_Received: str
    AgCode_ST: str
    Time_Received: str
    Wine_Type: str
    Est_Tons_1: float
    Est_Tons_2: float
    Est_Tons_3: float
    Press_Pick_2: str
    Linked: str
    Crush_Pad: str
    Status: str
    last_modified: datetime
    synced: bool = False

class HarvestLoadCreate(HarvestLoadBase):
    pass

class HarvestLoadOut(HarvestLoadBase):
    uid: UUID

    class Config:
        from_attributes = True