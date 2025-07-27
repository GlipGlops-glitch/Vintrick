// vintrick-backend/utils/db.js

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export function createDbSession() {
  return prisma; // shared singleton instance
}
