// File: vintrick-backend/src/middleware/errorHandler.js
function errorHandler(err, req, res, next) {
  console.error(err);
  if (err.code === 'P2025') {
    return res.status(404).json({ error: 'Not found' });
  }
  res.status(500).json({ error: 'Internal error' });
}

module.exports = errorHandler;