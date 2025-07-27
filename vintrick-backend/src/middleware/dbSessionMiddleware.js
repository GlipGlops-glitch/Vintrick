// vintrick-backend/src/middleware/dbSessionMiddleware.js

// This middleware injects DB session into req.db
const { createDbSession } = require('../../utils/db'); // hypothetical DB session loader

async function dbSessionMiddleware(req, res, next) {
  try {
    req.db = await createDbSession();
    res.on('finish', () => req.db?.close?.());
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = dbSessionMiddleware;