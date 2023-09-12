import { Router } from "express";
import {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  deleteUsers
} from "../controllers/user.controller";

const router = Router();

router.get("/", getUsers);
router.get("/:id", getUser);
router.put("/:id", updateUser);
router.delete("/", deleteUsers);
router.delete("/:id", deleteUser);

export { router };
