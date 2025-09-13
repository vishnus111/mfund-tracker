import express from "express";
import authController from "../controllers/authController.js";
import { loginLimiter } from "../middlewares/rateLimiter.js";

const { signup, login } = authController;
const router = express.Router();

router.post("/signup", signup);
router.post("/login",loginLimiter, login);


export default router;