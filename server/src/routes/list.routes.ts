import { Router } from "express";
import {
  deleteList,
  deleteLists,
  getList,
  getLists,
  getUserLists,
  postList,
  updateList,
} from "../controllers/list.controllers";

const router = Router();

router.get("/", getLists);
router.get("/:id", getList);
router.get("/user/:userId", getUserLists);
router.post("/", postList);
router.put("/:id", updateList);
router.delete("/", deleteLists);
router.delete("/:id", deleteList);

export { router };
