import express from "express"
import "dotenv/config";

/**
 * @description import routes
 */
import authRoutes from "./routes/auth.route.js";
import { connectDB } from "./lib/db.js";


const app = express()
const PORT = process.env.PORT


/** use routes */
app.use("/api/auth", authRoutes)

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
    connectDB()
})