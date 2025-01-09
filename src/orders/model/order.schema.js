import mongoose from "mongoose";
import crypto from "crypto";
import { type } from "os";
import { time } from "console";

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    unique: true,
    default: () => `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to User model
    required: true,
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products", // Reference to Product model
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  totalAmount: {
    type: Number,
    // required: true,
    default: 0,
  },
  status: {
    type: String,
    enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
    default: "Pending",
  },
  paymentMethod: {
    type: String,
    enum: ["Credit Card", "Debit Card", "PayPal", "Cash on Delivery"],
    // required: true,
  },
  paymentStatus: {
    type: String,
    enum: ["Paid", "Unpaid", "Failed"],
    default: "Unpaid",
  },
  //   shippingAddress: {
  //     street: { type: String, required: true },
  //     city: { type: String, required: true },
  //     state: { type: String, required: true },
  //     postalCode: { type: String, required: true },
  //     country: { type: String, required: true },
  //   },
  createdAt: {
    type: Date,
    default: new Date().toLocaleString(),
  },
  updatedAt: {
    type: Date,
    default: new Date().toLocaleString(),
  },
});

orderSchema.pre("save", function (next) {
  this.totalAmount = this.items.reduce(
    (acc, init) => acc + init.price * init.quantity,
    0
  );
  next();
});

const orderModel = mongoose.model("Order", orderSchema);
export default orderModel;
