import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Get all harvest loads
export const getAll = async (req, res) => {
  const all = await prisma.harvestLoad.findMany();
  res.json(all);
};

// Get a single harvest load by UID
export const getOne = async (req, res) => {
  const { uid } = req.params;
  const one = await prisma.harvestLoad.findUnique({ where: { uid } });
  if (!one) return res.status(404).json({ error: "Not found" });
  res.json(one);
};

// Create a new harvest load
export const create = async (req, res) => {
  try {
    const data = req.body;
    // Enforce required fields
    data.last_modified = new Date();
    if (!data.uid) {
      return res.status(400).json({ error: "uid is required" });
    }
    const created = await prisma.harvestLoad.create({ data });
    res.status(201).json(created);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

// Update an existing harvest load
export const update = async (req, res) => {
  try {
    const { uid } = req.params;
    const data = req.body;
    data.last_modified = new Date();
    const updated = await prisma.harvestLoad.update({
      where: { uid },
      data,
    });
    res.json(updated);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

// Delete a harvest load
export const remove = async (req, res) => {
  try {
    const { uid } = req.params;
    await prisma.harvestLoad.delete({ where: { uid } });
    res.json({ status: "deleted" });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
