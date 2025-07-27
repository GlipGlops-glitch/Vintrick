# dao.py

import os
import uuid
import logging
import requests
from dataclasses import asdict
from tkinter import messagebox

API_URL = os.environ.get("API_URL", "http://localhost:3000")
API_KEY = os.environ.get("API_KEY", "MY_SECRET_KEY")
HEADERS = {"x-api-key": API_KEY}


def safe_api_call(func):
    def wrapper(*args, **kwargs):
        try:
            return func(*args, **kwargs)
        except requests.RequestException as e:
            logging.error(f"API error: {e}")
            messagebox.showerror("Network Error", f"Failed to reach server: {e}")
            return []

    return wrapper


class HarvestLoadDAO:
    def __init__(self):
        self.api_url = f"{API_URL}/harvestloads"

    @safe_api_call
    def get_all_harvest_loads(self):
        resp = requests.get(self.api_url, headers=HEADERS)
        resp.raise_for_status()
        return resp.json()

    @safe_api_call
    def add_load(self, load):
        # Accepts dataclass or dict
        if hasattr(load, "__dataclass_fields__"):
            load = asdict(load)
        if not load.get("uid"):
            load["uid"] = str(uuid.uuid4())
        resp = requests.post(self.api_url, json=load, headers=HEADERS)
        resp.raise_for_status()
        return resp.json()

    @safe_api_call
    def update_load(self, load):
        if hasattr(load, "__dataclass_fields__"):
            load = asdict(load)
        if "uid" not in load:
            raise ValueError("Update requires uid")
        uid = load["uid"]
        resp = requests.patch(f"{self.api_url}/{uid}", json=load, headers=HEADERS)
        resp.raise_for_status()
        return resp.json()

    def close(self):
        pass


class BlendsDAO:
    def __init__(self):
        self.api_url = f"{API_URL}/blends"

    @safe_api_call
    def get_blends(self):
        resp = requests.get(self.api_url, headers=HEADERS)
        resp.raise_for_status()
        return resp.json()

    @safe_api_call
    def add_blend(self, blend):
        if hasattr(blend, "__dataclass_fields__"):
            blend = asdict(blend)
        resp = requests.post(self.api_url, json=blend, headers=HEADERS)
        resp.raise_for_status()
        return resp.json()

    @safe_api_call
    def update_blend(self, blend):
        if hasattr(blend, "__dataclass_fields__"):
            blend = asdict(blend)
        if "id" not in blend:
            raise ValueError("Update requires id")
        blend_id = blend["id"]
        resp = requests.patch(f"{self.api_url}/{blend_id}", json=blend, headers=HEADERS)
        resp.raise_for_status()
        return resp.json()

    def close(self):
        pass
