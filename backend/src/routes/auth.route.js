import express from "express";
import { login, logout, signup, onboard } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router()

/**
 * @route /api/auth/signup
 */
router.post("/signup", signup)

/**
 * @route POST /api/auth/login
 */
router.post("/login", login)

/**
 * @route POST /api/auth/logout
 */
router.post("/logout", logout)

/**
 * @route POST /api/auth/onboarding
 * @access Private
 */
router.post("/onboarding", protectRoute, onboard)


/**
 * @other forget password route
 * @other forget email route
 */



/**
 * @route GET /api/auth/me
 * @access Private
 * @description check if user logged in or not
 */
router.get("/me", protectRoute, (req,res)=>{
    res.status(200).json({
        success: true,
        user: req.user
    })
})

export default router