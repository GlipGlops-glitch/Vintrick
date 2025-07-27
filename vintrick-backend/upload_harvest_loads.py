# vintrick-backend/Tools/upload_harvest_loads.py   python upload_harvest_loads.py

import pandas as pd
import requests
import uuid
from datetime import datetime, timezone
import time


# Config
API_URL = "http://localhost:3000/api/harvestloads"  # change if needed
EXCEL_PATH = "Tools/harvest Loads.xlsx"

# Load the Excel file
df = pd.read_excel(EXCEL_PATH).fillna("")

for idx, row in df.iterrows():
    # Build the payload for each row
    data = {
        "uid": str(uuid.uuid4()),
        "Vintrace_ST": str(row["Vintrace ST"]),
        "Block": str(row["Block"]),
        "Tons": float(row["Tons"]) if row["Tons"] else 0.0,
        "Press": str(row["Press"]),
        "Tank": str(row["Tank"]),
        "WO": str(row["WO"]),
        "Date_Received": str(row["Date Received"]),
        "AgCode_ST": str(row["AgCode_ST"]),
        "Time_Received": str(row["Time Received"]),
        "Wine_Type": str(row["Wine Type"]),
        "Est_Tons_1": float(row["Est_Tons_1"]) if row["Est_Tons_1"] else 0.0,
        "Est_Tons_2": float(row["Est_Tons_2"]) if row["Est_Tons_2"] else 0.0,
        "Est_Tons_3": float(row["Est_Tons_3"]) if row["Est_Tons_3"] else 0.0,
        "Press_Pick_2": str(row["Press_Pick_2"]),
        "Linked": str(row["Linked"]),
        "Crush_Pad": str(row["Crush Pad"]),
        "Status": str(row["Status"]),
        "last_modified": datetime.now(timezone.utc).isoformat(),
        "synced": False,

    }
    # POST to API
    r = requests.post(API_URL, json=data)
    if r.status_code not in (200, 201):
        print(f"Failed at row {idx}: {r.text}")
        time.sleep(0.2)  # slightly longer pause after failure
    else:
        print(f"Uploaded row {idx+1}/{len(df)}")
        time.sleep(0.05)  # short pause to keep DB/API happy
print("All done!")

# python Tools/upload_harvest_loads.py
