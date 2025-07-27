// vintrick-backend/src/app.js

const express = require('express');
const app = express();
const errorHandler = require('./middleware/errorHandler');
const dbSessionMiddleware = require('./middleware/dbSessionMiddleware');
const harvestRoutes = require('./routes/harvestloads');

app.use(express.json());
app.use(dbSessionMiddleware); // inject req.db
app.use('/api/harvestloads', harvestRoutes);
app.use(errorHandler);

module.exports = app;