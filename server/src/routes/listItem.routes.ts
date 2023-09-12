import { Router } from "express";
import {
  deleteListItem,
  deleteListItems,
  getListItem,
  getListItems,
  getListItemsOfAList,
  postListItem,
  updateListItem,
} from "../controllers/listItem.controllers";

const router = Router();

router.get("/", getListItems);
router.get("/:id", getListItem);
router.get("/list/:listId/items", getListItemsOfAList);
router.post("/", postListItem);
router.put("/:id", updateListItem);
router.delete("/", deleteListItems);
router.delete("/:id", deleteListItem);

export { router };
