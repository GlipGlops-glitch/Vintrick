// vintrick-backend/src/middleware/validationMiddleware.js

import { validationResult } from 'express-validator';

export default function validateRequest(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next({
      status: 400,
      message: 'Validation failed',
      details: errors.array()
    });
  }
  next();
}