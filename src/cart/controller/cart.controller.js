import {
  AddToCart,
  getCartItems,
  deleteCartItem,
  deleteAllCartItems,
} from "../model/cart.repository.js";
import { ErrorHandler } from "../../../utils/errorHandler.js";
import cartModel from "../model/cart.schema.js";
export const addItemCart = async (req, res, next) => {
  const productId = req.params.id;
  const userId = req.user._id;
  try {
    const itemPresent = await cartModel.findOne({
      user: userId,
      product: productId,
    });
    if (itemPresent) {
      itemPresent.quantity += 1;
      itemPresent.totalAmount = itemPresent.quantity * itemPresent.totalAmount;
      itemPresent.save();
      res.status(201).json({ success: true, CartItem: itemPresent });
    } else {
      const cartItem = await AddToCart(userId, productId);
      if (!cartItem) {
        return next(new ErrorHandler(400, "Failed to add cartItem"));
      }
      res.status(200).json({ success: true, CartItem: cartItem });
    }
  } catch (error) {
    return next(new ErrorHandler(400, error));
  }
};

export const getCart = async (req, res, next) => {
  const userId = req.user._id;
  try {
    const result = await getCartItems(userId);
    if (!result) {
      return next(new ErrorHandler(400, "Failed to get cartItems"));
    }
    res.status(200).json({ success: true, CartItems: result });
  } catch (error) {
    return next(new ErrorHandler(400, error));
  }
};

export const deleteItem = async (req, res, next) => {
  const itemId = req.params.id;
  try {
    const getItem = await cartModel.findById(itemId);
    if (getItem.quantity > 1) {
      getItem.quantity -= 1;
      getItem.totalAmount = getItem.quantity * getItem.totalAmount;
      getItem.save();
      res.status(200).json({ success: true, DeletedItem: getItem });
    } else {
      const result = await deleteCartItem(itemId);
      if (!result) {
        return next(new ErrorHandler(400, "Failed to delete cart Item"));
      }
      res.status(200).json({ success: true, DeletedItem: result });
    }
  } catch (error) {
    return next(new ErrorHandler(400, error));
  }
};

export const deleteAll = async (req, res, next) => {
  const userId = req.user._id;
  try {
    const result = await deleteAllCartItems(userId);
    if (!result) {
      return next(new ErrorHandler(400, "Failed to delete all cart Items"));
    }
    res.status(200).json({ success: true, DeletedItems: result });
  } catch (error) {
    return next(new ErrorHandler(400, error));
  }
};
