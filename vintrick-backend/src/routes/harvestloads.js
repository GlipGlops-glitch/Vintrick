// vintrick-backend/src/routes/harvestloads.js

const express = require('express');
const { body, param } = require('express-validator');
const router = express.Router();

const validateRequest = require('../middleware/validationMiddleware');
const controller = require('../controllers/harvestloads');

router.get('/', async (req, res, next) => {
  try {
    const loads = await controller.getAllHarvestLoads(req, res);
    res.json(loads);
  } catch (err) {
    next(err);
  }
});

router.get(
  '/:id',
  param('id').isInt().withMessage('ID must be an integer'),
  validateRequest,
  async (req, res, next) => {
    try {
      const load = await controller.getHarvestLoadById(req, res);
      res.json(load);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  '/',
  [
    body('loadDate').isISO8601().withMessage('Valid ISO date required'),
    body('weight').isFloat({ min: 0 }).withMessage('Weight must be a positive number')
  ],
  validateRequest,
  async (req, res, next) => {
    try {
      const load = await controller.createHarvestLoad(req, res);
      res.status(201).json(load);
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  '/:id',
  param('id').isInt().withMessage('ID must be an integer'),
  validateRequest,
  async (req, res, next) => {
    try {
      await controller.deleteHarvestLoad(req, res);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;