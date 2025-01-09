import {
  addItemCart,
  getCart,
  deleteItem,
  deleteAll,
} from "../controller/cart.controller.js";
import express from "express";

import { auth, authByUserRole } from "../../../middleware/auth.js";
import { get } from "http";
const router = express.Router();

router.route("/addToCart/:id").post(auth, addItemCart);
router.route("/getCartItems").get(auth, getCart);
router.route("/deleteCartItem/:id").post(auth, deleteItem);
router.route("/deleteAll").post(auth, deleteAll);

export default router;
