import express from "express";
import cookieParser from "cookie-parser"
import authRoutes from "./routes/authRoutes.js"
import productsRoute from "./routes/productsRoute.js"
import categoryRoutes from "./routes/categoryRoutes.js"
import orderRoutes from "./routes/orderRoute.js"
import errorHandler from "./middlewares/errorMiddleware.js";
const app=express()
app.use(cookieParser())
app.use(express.json())
app.use('/api/auth',authRoutes)
app.use('/api/products',productsRoute)
app.use('/api/category',categoryRoutes)
app.use('/api/orders',orderRoutes)
app.use(errorHandler)
export default app