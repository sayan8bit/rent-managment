import { Router } from "express";
import { dashboard, login, register } from "../controllers/authController";
import authMiddleware from "../middlewares/authMiddleware";
import roleMiddleware from "../middlewares/roleMiddleware";
import {
  deleteUser,
  getAllUser,
  getOneUser,
  updateUser,
} from "../controllers/userController";
const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get(
  "/dashboard",
  authMiddleware,
  roleMiddleware("admin", "user"),
  dashboard
);
router.get("/users", authMiddleware, roleMiddleware("admin"), getAllUser);
router.get(
  "/users/:id",
  authMiddleware,
  roleMiddleware("admin", "user"),
  getOneUser
);
router.put(
  "/users/:id",
  authMiddleware,
  roleMiddleware("admin", "user"),
  updateUser
);

router.delete(
  "/users/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteUser
);

export default router;
