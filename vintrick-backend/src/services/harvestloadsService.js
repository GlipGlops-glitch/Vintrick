// vintrick-backend/src/controllers/harvestloads.js

import { fetchAllHarvestLoads, fetchHarvestLoadById, addHarvestLoad, removeHarvestLoad } from '../../services/harvest_load_service.js';

export async function getAllHarvestLoads(req, res, next) {
  try {
    const loads = await fetchAllHarvestLoads(req.db);
    res.json(loads);
  } catch (err) {
    next(err);
  }
}

export async function getHarvestLoadById(req, res, next) {
  try {
    const load = await fetchHarvestLoadById(req.db, req.params.id);
    res.json(load);
  } catch (err) {
    next(err);
  }
}

export async function createHarvestLoad(req, res, next) {
  try {
    const newLoad = await addHarvestLoad(req.db, req.body);
    res.status(201).json(newLoad);
  } catch (err) {
    next(err);
  }
}

export async function deleteHarvestLoad(req, res, next) {
  try {
    await removeHarvestLoad(req.db, req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
}
