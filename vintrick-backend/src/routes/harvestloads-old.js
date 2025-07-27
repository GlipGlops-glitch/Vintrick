import express from "express";
import * as controller from "../controllers/harvestloads.js";
const router = express.Router();

router.get("/", controller.getAll);
router.get("/:uid", controller.getOne);
router.post("/", controller.create);
router.patch("/:uid", controller.update);
router.delete("/:uid", controller.remove);

export default router;

