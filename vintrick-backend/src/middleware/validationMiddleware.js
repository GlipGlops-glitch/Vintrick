// vintrick-backend/src/middleware/validationMiddleware.js

const { validationResult } = require('express-validator');

function validateRequest(req, res, next) {
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

module.exports = validateRequest;