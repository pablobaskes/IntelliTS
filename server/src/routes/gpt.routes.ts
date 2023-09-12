import { Router } from "express";
import { handleAISearch, handleChat } from "../controllers/gpt.controller";
const router = Router();
router.post("/", handleChat);
router.post("/search", handleAISearch);
export { router };
