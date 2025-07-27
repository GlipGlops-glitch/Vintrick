// vintrick-backend/src/app.js

const express = require('express');
const app = express();
const errorHandler = require('./middleware/errorHandler');
const harvestRoutes = require('./routes/harvestloads');

app.use(express.json());
app.use('/api/harvestloads', harvestRoutes);
app.use(errorHandler);

module.exports = app;