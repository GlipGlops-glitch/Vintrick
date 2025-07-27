// File: vintrick-backend/src/app.js
const express = require('express');
const harvestloadsRoutes = require('./routes/harvestloads');
const errorHandler = require('./middleware/errorHandler');
const authMiddleware = require('./middleware/authMiddleware');

const app = express();

app.use(express.json());
app.use(authMiddleware);
app.use('/api/harvestloads', harvestloadsRoutes);
app.use(errorHandler);

module.exports = app;