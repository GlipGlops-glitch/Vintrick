// vintrick-backend/src/app.js

import express from 'express';
import errorHandler from './middleware/errorHandler.js';
import dbSessionMiddleware from './middleware/dbSessionMiddleware.js';
import harvestRoutes from './routes/harvestloads.js';

const app = express();

app.use(express.json());
app.use(dbSessionMiddleware);
app.use('/api/harvestloads', harvestRoutes);
app.use(errorHandler);

export default app;
