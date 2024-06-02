import express from "express";
import userRoutes from "./userRoutes.js";
import movieRoutes from "./movieRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

router.use("/api/images", express.static(path.join(__dirname, "../uploads")));
router.use("/api", userRoutes);
router.use("/api", movieRoutes);

export default router;
