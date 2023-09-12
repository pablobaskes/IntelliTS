import { Router } from "express";
import {
  deleteItem,
  deleteItems,
  getItem,
  getItems,
  postItem,
  updateItem,
} from "../controllers/item.controller";
const router = Router();
router.get("/", getItems);
router.get("/:id", getItem);
router.post("/", postItem);
router.put("/:id", updateItem);
router.delete("/", deleteItems);
router.delete("/:id", deleteItem);
export { router };
