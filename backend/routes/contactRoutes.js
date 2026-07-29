import { Router } from "express";
import {
  createContact,
  getContacts,
  markContactRead,
  deleteContact,
} from "../controllers/contactController.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.post("/", createContact);
router.get("/", requireAuth, getContacts);
router.put("/:id/read", requireAuth, markContactRead);
router.delete("/:id", requireAuth, deleteContact);

export default router;
