// vintrick-backend/src/controllers/harvestloads.js

const harvestService = require('../../services/harvest_load_service');

exports.getAllHarvestLoads = async (req, res) => {
  const db = req.db; // Assumes DB session attached to request
  return await harvestService.fetch_all_harvest_loads(db);
};

exports.getHarvestLoadById = async (req, res) => {
  const db = req.db;
  const id = parseInt(req.params.id, 10);
  return await harvestService.fetch_harvest_load_by_id(db, id);
};

exports.createHarvestLoad = async (req, res) => {
  const db = req.db;
  return await harvestService.add_new_harvest_load(db, req.body);
};

exports.deleteHarvestLoad = async (req, res) => {
  const db = req.db;
  const id = parseInt(req.params.id, 10);
  const success = await harvestService.remove_harvest_load(db, id);
  if (!success) {
    const err = new Error('Harvest load not found');
    err.status = 404;
    throw err;
  }
};