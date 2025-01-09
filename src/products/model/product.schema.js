import { timeStamp } from "console";
import mongoose from "mongoose";
import { type } from "os";

const producSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "product title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "product description name is required"],
      minLength: [
        10,
        "product description should be atleat 10 characters long",
      ],
    },
    price: {
      type: Number,
      required: [true, "product price  is required"],
      maxLength: [8, "price can be of maximum 8 digits"],
    },

    image: { type: String, required: true },
    ratingCount: { type: Number, default: 1 },
    category: {
      type: String,
      required: [true, "product category is required"],
      enum: [
        "Mobile",
        "Clothing",
        "Home & Garden",
        "electronics",
        "Health & Beauty",
        "Sports & Outdoors",
        "Toys & Games",
        "Books & Media",
        "jewelery",
        "Food & Grocery",
        "Furniture",
        "Shoes",
        "women's clothing",
        "Office Supplies",
        "Baby & Kids",
        "Art & Collectibles",
        "Travel & Luggage",
        "men's clothing",
        "Electrical Appliances",
        "Handmade Crafts",
      ],
    },
    stock: {
      type: Number,
      required: [true, "product stock is mandatory"],
      maxLength: [5, "stock can be maximum 5 digits"],
      default: 1,
    },
    rating: [
      {
        user: {
          type: mongoose.Schema.ObjectId,
          type: String,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        rate: {
          type: Number,
          required: true,
        },
        comment: {
          type: String,
        },
        count: {
          type: Number,
        },
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  timeStamp
);

const ProductModel = mongoose.model("Products", producSchema);
export default ProductModel;
