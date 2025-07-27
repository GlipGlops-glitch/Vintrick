// vintrick-backend/tests/node/harvestloads.test.js

const request = require('supertest');
const express = require('express');
const harvestRoutes = require('../../src/routes/harvestloads');

const app = express();
app.use(express.json());
app.use('/api/harvestloads', harvestRoutes);

jest.mock('../../../services/harvest_load_service', () => ({
  add_new_harvest_load: jest.fn(async (_db, data) => ({ ...data, id: 1 }))
}));

describe('POST /api/harvestloads', () => {
  it('should return 201 on valid input', async () => {
    const res = await request(app)
      .post('/api/harvestloads')
      .send({ loadDate: '2025-01-01', weight: 1200 });
    expect(res.statusCode).toBe(201);
    expect(res.body.weight).toBe(1200);
  });

  it('should return 400 on invalid input', async () => {
    const res = await request(app)
      .post('/api/harvestloads')
      .send({ loadDate: 'invalid', weight: -10 });
    expect(res.statusCode).toBe(400);
    expect(res.body.error.message).toBe('Validation failed');
  });
});
