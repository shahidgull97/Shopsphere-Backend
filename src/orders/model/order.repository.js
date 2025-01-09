import orderModel from "./order.schema.js";
import { ErrorHandler } from "../../../utils/errorHandler.js";
import crypto from "crypto";

async function addOrders(products, userId) {
  try {
    const items = products.map((item) => ({
      product: item.product,
      quantity: item.quantity,
      price: item.price,
    }));
    // console.log(items);
    function generateOrderId() {
      return "ORDER-" + crypto.randomBytes(8).toString("hex").toUpperCase();
    }

    // Example usage
    const orderId = generateOrderId();

    const orders = await new orderModel({
      user: userId,
      items,
      orderId: orderId,
    }).save();
    return orders;
  } catch (error) {
    console.log(error);

    throw new ErrorHandler(400, error);
  }
}

async function getOrders(userId) {
  try {
    const orders = orderModel
      .find({ user: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "items.product",
        select: "title image",
      });
    return orders;
  } catch (error) {
    throw new ErrorHandler(400, error);
  }
}
export { addOrders, getOrders };
