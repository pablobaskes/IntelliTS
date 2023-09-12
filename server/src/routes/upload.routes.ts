import { Router } from "express";
import upload from "../middlewares/file.middleware";
import { uploadFile } from "../controllers/file.controller";

const router = Router();
router.post("/", upload.single("myFile"), uploadFile);
export { router };
