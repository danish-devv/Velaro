import express from "express";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.js";
import productsRoute from "./routes/productsRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import orderRoutes from "./routes/orderRoute.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import webhookRoutes from "./routes/webhookRoute.js";
import getUsersRoutes from "./routes/getUsersRoute.js"
import errorHandler from "./middlewares/errorMiddleware.js";

const app = express();

app.use("/api/webhook", webhookRoutes);

app.use(cookieParser());
app.use(express.json());
app.use("/api/users",getUsersRoutes)
app.use("/api/auth", authRoutes);
app.use("/api/products", productsRoute);
app.use("/api/category", categoryRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payments", paymentRoutes);

app.use(errorHandler);

export default app;
