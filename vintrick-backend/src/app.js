import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.js";
import harvestloadsRoutes from "./routes/harvestloads.js";
import mockUser from "./middleware/mockUser.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

if (process.env.SKIP_AUTH === "true") {
  app.use("/api/harvestloads", mockUser, harvestloadsRoutes);
} else {
  app.use("/api/harvestloads", harvestloadsRoutes);
}

app.get("/api/health", (req, res) => res.json({ status: "ok" }));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`API running on port ${port}`));
