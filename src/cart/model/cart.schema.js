import mongoose from "mongoose";
import { type } from "os";

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to User model
    required: true,
  },

  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Products", // Reference to Product model
    required: true,
  },
  quantity: {
    type: Number,
    min: 1,
    default: 1,
  },
  price: {
    type: Number,
    required: true,
  },

  totalAmount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});
cartSchema.pre("save", function (next) {
  this.totalAmount = this.price * this.quantity;
  this.updatedAt = Date.now();
  next();
});

const cartModel = mongoose.model("Cart", cartSchema);
export default cartModel;
