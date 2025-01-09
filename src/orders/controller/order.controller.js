import { addOrders, getOrders } from "../model/order.repository.js";
import { ErrorHandler } from "../../../utils/errorHandler.js";
import cartModel from "../../cart/model/cart.schema.js";

export const addUserOrders = async (req, res, next) => {
  const userId = req.user._id;

  try {
    const cartItems = await cartModel.find({ user: userId });

    const result = await addOrders(cartItems, userId);
    if (!result) {
      return next(new ErrorHandler(400, "Failed to add order Items"));
    }
    res.status(200).json({ success: true, Orders: result });
  } catch (error) {
    return next(new ErrorHandler(400, error));
  }
};

export const getAllOrders = async (req, res, next) => {
  const userId = req.user._id;
  try {
    const result = await getOrders(userId);
    if (!result) {
      return next(new ErrorHandler(400, "Failed to get order Items"));
    }
    res.status(200).json({ success: true, Orders: result });
  } catch (error) {
    return next(new ErrorHandler(400, error));
  }
};
