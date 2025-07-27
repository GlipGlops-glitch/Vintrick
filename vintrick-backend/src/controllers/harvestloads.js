// vintrick-backend/src/controllers/harvestloads.js

import {
  fetch_all_harvest_loads,
  fetch_harvest_load_by_id,
  add_new_harvest_load,
  remove_harvest_load
} from '../../services/harvest_load_service.js';

export async function getAllHarvestLoads(req, res) {
  return await fetch_all_harvest_loads(req.db);
}

export async function getHarvestLoadById(req, res) {
  const id = parseInt(req.params.id, 10);
  return await fetch_harvest_load_by_id(req.db, id);
}

export async function createHarvestLoad(req, res) {
  return await add_new_harvest_load(req.db, req.body);
}

export async function deleteHarvestLoad(req, res) {
  const id = parseInt(req.params.id, 10);
  const success = await remove_harvest_load(req.db, id);
  if (!success) {
    const err = new Error('Harvest load not found');
    err.status = 404;
    throw err;
  }
}
