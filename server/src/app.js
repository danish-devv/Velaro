import express from "express";
import cookieParser from "cookie-parser"
import authRoutes from "./routes/authRoutes.js"
import errorHandler from "./middlewares/errorMiddleware.js";
const app=express()
app.use(cookieParser())
app.use(express.json())
app.use('/api/auth',authRoutes)
app.use(errorHandler)
export default app