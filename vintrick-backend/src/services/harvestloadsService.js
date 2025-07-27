// File: vintrick-backend/src/services/harvestloadsService.js
const prisma = require('../db');

async function fetchAll(userId) {
  return await prisma.harvestLoad.findMany({ where: { userId } });
}

async function create(userId, data) {
  return await prisma.harvestLoad.create({
    data: { ...data, userId },
  });
}

module.exports = { fetchAll, create };