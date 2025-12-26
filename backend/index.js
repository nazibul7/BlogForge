import express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv"
import cors from "cors"
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js"
import postRoutes from "./routes/post.route.js"
import commentRoutes from "./routes/comment.route.js"
import cookieParser from "cookie-parser";

dotenv.config()

const app = express()

app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true
    })
)

app.use(express.json())
app.use(cookieParser())
app.use("/api/user", userRoutes)
app.use('/api/post', postRoutes)
app.use('/api/comment', commentRoutes)
app.use('/api/auth', authRoutes)


app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || "Something went wrong"
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})


mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('MongoDB is connected');
        app.listen(process.env.PORT, () => {
            console.log('Server is running at port 5000');
        })
    })
    .catch((err) => {
        console.log("MongoDB error", err);
    })
