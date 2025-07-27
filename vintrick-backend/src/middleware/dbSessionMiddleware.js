// vintrick-backend/src/middleware/dbSessionMiddleware.js

import { createDbSession } from '../../utils/db.js';

export default async function dbSessionMiddleware(req, res, next) {
  try {
    req.db = await createDbSession();
    res.on('finish', () => req.db?.close?.());
    next();
  } catch (err) {
    next(err);
  }
}
