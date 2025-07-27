// File: vintrick-backend/src/controllers/harvestloadsController.js
const service = require('../services/harvestloadsService');

async function getAll(req, res, next) {
  try {
    const loads = await service.fetchAll(req.user.id);
    res.json(loads);
  } catch (err) {
    next(err);
  }
}

async function create(req, res, next) {
  try {
    const newLoad = await service.create(req.user.id, req.body);
    res.status(201).json(newLoad);
  } catch (err) {
    next(err);
  }
}

module.exports = { getAll, create };