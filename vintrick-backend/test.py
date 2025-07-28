# scripts/create_table.py
from app.core.db import Base, engine
from app.models.harvestload import HarvestLoad

if __name__ == "__main__":
    Base.metadata.create_all(bind=engine)
    print("✅ harvestloads table created.")
