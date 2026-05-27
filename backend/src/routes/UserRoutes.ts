import { Router } from "express";
import { createUser, getUsers } from "../controllers/UserController.js";
import { requireAuth } from "../middlewares/AuthMiddleware.js";
import { requireRole } from "../middlewares/RoleMiddleware.js";

const router = Router();

router.get("/", requireAuth, getUsers);
router.post("/", requireAuth, createUser);

export default router;
