import { Router } from "express";
import { registerCtrl, loginCtrl } from "../controllers/auth.controllers";
const router = Router();
router.post("/login", loginCtrl);
router.post("/register", registerCtrl);

export { router };
