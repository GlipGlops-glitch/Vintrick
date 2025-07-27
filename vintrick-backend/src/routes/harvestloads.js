// vintrick-backend/src/routes/harvestloads.js

import express from 'express';
import { body, param } from 'express-validator';

import validateRequest from '../middleware/validationMiddleware.js';
import {
  getAllHarvestLoads,
  getHarvestLoadById,
  createHarvestLoad,
  deleteHarvestLoad
} from '../controllers/harvestloads.js';

const router = express.Router();

router.get('/', getAllHarvestLoads);

router.get(
  '/:id',
  param('id').isInt().withMessage('ID must be an integer'),
  validateRequest,
  getHarvestLoadById
);

router.post(
  '/',
  [
    body('loadDate').isISO8601().withMessage('Valid ISO date required'),
    body('weight').isFloat({ min: 0 }).withMessage('Weight must be a positive number')
  ],
  validateRequest,
  createHarvestLoad
);

router.delete(
  '/:id',
  param('id').isInt().withMessage('ID must be an integer'),
  validateRequest,
  deleteHarvestLoad
);

export default router;
