// File: vintrick-backend/src/middleware/authMiddleware.js
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Simulate decoded token (replace with real JWT logic)
  const token = authHeader.split(' ')[1];
  try {
    const decodedUser = { id: parseInt(token) || 123 }; // Replace with JWT verification
    req.user = decodedUser;
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid token' });
  }
}

module.exports = authMiddleware;