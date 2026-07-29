import { Router } from "express";
import {
  getExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
} from "../controllers/experienceController.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.get("/", getExperiences);
router.post("/", requireAuth, createExperience);
router.put("/:id", requireAuth, updateExperience);
router.delete("/:id", requireAuth, deleteExperience);

export default router;
