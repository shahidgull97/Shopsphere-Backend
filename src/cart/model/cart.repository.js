import cartModle from "./cart.schema.js";
import ProductModel from "../../products/model/product.schema.js";
import { ErrorHandler } from "../../../utils/errorHandler.js";

async function AddToCart(userId, productId) {
  try {
    console.log(productId);

    const product = await ProductModel.findById(productId);
    console.log(product);
    const price = product.price;

    const cart = await new cartModle({
      user: userId,
      product: productId,
      price,
    }).save();
    return cart;
  } catch (error) {
    throw new ErrorHandler(400, error);
  }
}

async function getCartItems(userId) {
  const cartItems = cartModle.find({ user: userId }).populate({
    path: "product",
    select: "title image price ",
  });
  return cartItems;
}
async function deleteCartItem(itemId) {
  try {
    const deletedItem = await cartModle.deleteOne({ _id: itemId });
    return deletedItem;
  } catch (error) {
    throw new ErrorHandler(400, error);
  }
}

async function deleteAllCartItems(userId) {
  try {
    const deleteAll = await cartModle.deleteMany({ user: userId });
    return deleteAll;
  } catch (error) {
    throw new ErrorHandler(400, error);
  }
}
export { AddToCart, getCartItems, deleteCartItem, deleteAllCartItems };
