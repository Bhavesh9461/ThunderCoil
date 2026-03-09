import express from "express"
import "dotenv/config";
import cookieParser from "cookie-parser";

/**
 * @description import routes
 */
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import chatRoutes from "./routes/chat.route.js";
import { connectDB } from "./lib/db.js";


const app = express()
const PORT = process.env.PORT

// some setup code
app.use(express.json())  // to access body's content
app.use(cookieParser()) // to access token from browser

/** use routes */
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/chat", chatRoutes)

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
    connectDB()
})