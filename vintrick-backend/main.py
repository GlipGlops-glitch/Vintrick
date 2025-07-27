# File: vintrick-backend/main.py

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List

from dao.harvest_load_dao import HarvestLoadDAO
from models import HarvestLoad

app = FastAPI(title="Vintrick Backend")

dao = HarvestLoadDAO()

# Pydantic model for request validation
class HarvestLoadInput(BaseModel):
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

@app.get("/harvestloads", response_model=List[HarvestLoad])
def get_all_harvestloads():
    try:
        return dao.get_all_harvest_loads()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/harvestloads", response_model=HarvestLoad)
def create_harvestload(payload: HarvestLoadInput):
    try:
        return dao.create_harvest_load(payload.dict())
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
