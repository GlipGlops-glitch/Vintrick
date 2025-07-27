// File: vintrick-backend/tests/harvestloadsService.test.js
const service = require('../src/services/harvestloadsService');
const prisma = require('../src/db');

jest.mock('../src/db');

describe('harvestloadsService', () => {
  it('fetchAll returns user harvest loads', async () => {
    prisma.harvestLoad.findMany.mockResolvedValue([{ id: 1 }]);
    const result = await service.fetchAll(123);
    expect(result).toEqual([{ id: 1 }]);
  });

  it('create adds a new harvest load', async () => {
    const mockData = { weight: 100, date: '2025-07-01' };
    prisma.harvestLoad.create.mockResolvedValue({ id: 1, ...mockData });
    const result = await service.create(123, mockData);
    expect(result).toEqual({ id: 1, ...mockData });
  });
});
