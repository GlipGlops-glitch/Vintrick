// File: vintrick-backend/tests/harvestloadsController.test.js
const { getAll, create } = require('../src/controllers/harvestloadsController');
const service = require('../src/services/harvestloadsService');

jest.mock('../src/services/harvestloadsService');

describe('harvestloadsController', () => {
  const mockRes = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  const mockNext = jest.fn();

  it('getAll returns loads', async () => {
    const req = { user: { id: 123 } };
    const res = mockRes();
    service.fetchAll.mockResolvedValue([{ id: 1 }]);

    await getAll(req, res, mockNext);

    expect(service.fetchAll).toHaveBeenCalledWith(123);
    expect(res.json).toHaveBeenCalledWith([{ id: 1 }]);
  });

  it('create returns new load', async () => {
    const req = { user: { id: 123 }, body: { weight: 100, date: '2025-07-01' } };
    const res = mockRes();
    service.create.mockResolvedValue({ id: 1, ...req.body });

    await create(req, res, mockNext);

    expect(service.create).toHaveBeenCalledWith(123, req.body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ id: 1, ...req.body });
  });
});
