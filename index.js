import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";

import productRoutes from "./src/products/routes/product.routes.js";
import {
  errorHandlerMiddleware,
  handleUncaughtError,
} from "./middleware/errorHandlerMiddleware.js";
import userRoutes from "./src/user/routes/user.routes.js";
import cookieParser from "cookie-parser";
// import orderRoutes from "./src/order/routes/order.routes.js";
import cartRouter from "./src/cart/routes/cart.routs.js";
import orderRouter from "./src/orders/routes/order.routes.js";

const app = express();
// Logging middleware for debugging

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "https://shop-sphere-swart.vercel.app", // Adjust for your frontend's origin
    credentials: true, // If you need credentials like cookies
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
// Handle preflight OPTIONS requests globally
app.options("*", cors());

// configure routes

app.use("/api/shopsphere/product", productRoutes);
app.use("/api/shopsphere/user", userRoutes);
app.use("/api/shopsphere/cart", cartRouter);
app.use("/api/shopsphere/order", orderRouter);

// errorHandlerMiddleware
app.use(errorHandlerMiddleware);

export default app;
