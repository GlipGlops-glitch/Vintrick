# models.py

from dataclasses import dataclass, field
from typing import Optional
import uuid
from datetime import datetime

def now_utc_iso():
    return datetime.utcnow().isoformat()

@dataclass
class HarvestLoad:
    uid: str = field(default_factory=lambda: str(uuid.uuid4()))
    Vintrace_ST: str = ""
    Block: str = ""
    Tons: float = 0.0
    Press: str = ""
    Tank: str = ""
    WO: str = ""
    Date_Received: str = ""
    AgCode_ST: str = ""
    Time_Received: str = ""
    Wine_Type: str = ""
    Est_Tons_1: float = 0.0
    Est_Tons_2: float = 0.0
    Est_Tons_3: float = 0.0
    Press_Pick_2: str = 0.0
    Linked: str = ""
    Crush_Pad: str = ""
    Status: str = ""
    last_modified: str = field(default_factory=now_utc_iso)

@dataclass
class Blend:
    id: Optional[int] = None
    name: str = ""
    fg: float = 0.0
    bulk: str = ""
    date_created: str = ""
    last_modified: str = field(default_factory=now_utc_iso)
