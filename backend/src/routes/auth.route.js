import express from "express";
import { login, logout, signup, onboard } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router()

/**
 * @route /api/auth/signup
 */
router.post("/signup", signup)

/**
 * @route /api/auth/login
 */
router.post("/login", login)

/**
 * @route /api/auth/logout
 */
router.post("/logout", logout)

/**
 * @route /api/auth/onboarding
 * @access Private
 */
router.post("/onboarding", protectRoute, onboard)

export default router