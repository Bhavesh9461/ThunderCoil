import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getMyFriends, getRecommendedUsers, sendFriendRequest, acceptFriendRequest, getFriendRequests, getOutgoingFriendReqs } from "../controllers/user.controller.js";

const router = express.Router()

/**
 * @description apply auth middleware to all routes 
 * @uses when you have to add this route to before all controllers
 */
router.use(protectRoute)

/**
 * @route GET /api/users/
 * @description get all recommended users from db
 * @access PRIVATE
 */
router.get("/", getRecommendedUsers)

/**
 * @route GET /api/users/friends
 * @description get all friends from db
 * @access PRIVATE
 */
router.get("/friends", getMyFriends)

/**
 * @route POST /api/users/friend-request/:id
 * @description send friend request to a user
 * @access PRIVATE
 */
router.post("/friend-request/:id", sendFriendRequest)

/**
 * @route PUT /api/users/friend-request/:id/accept
 * @description update or accept friend's request
 * @access PRIVATE
 */
router.put("/friend-request/:id/accept", acceptFriendRequest)

/**
 * @route GET /api/users/friend-requests
 * @description get all friend requests that a recipient gets
 * @access PRIVATE
 */
router.get("/friend-requests", getFriendRequests)

/**
 * @route GET /api/users/outgoing-friend-requests
 * @description get all friend requests that I sent to others
 * @access PRIVATE
 */
router.get("/outgoing-friend-requests", getOutgoingFriendReqs)


export default router