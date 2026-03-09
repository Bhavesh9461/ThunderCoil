import express from "express";
import { login, logout, signup } from "../controllers/auth.controller.js";

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

export default router