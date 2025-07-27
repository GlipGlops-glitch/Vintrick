// File: vintrick-backend/src/validators/harvestloadsValidator.js
const Joi = require('joi');

const createSchema = Joi.object({
  date: Joi.date().required(),
  weight: Joi.number().required(),
  // Add more fields as necessary
});

function validateCreate(req, res, next) {
  const { error } = createSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details.map(d => d.message) });
  }
  next();
}

module.exports = { validateCreate };