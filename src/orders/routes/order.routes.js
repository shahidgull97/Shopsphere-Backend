import express from "express";
import { addUserOrders, getAllOrders } from "../controller/order.controller.js";
import { auth } from "../../../middleware/auth.js";
const router = express.Router();

router.route("/addorders").post(auth, addUserOrders);
router.route("/getorders").get(auth, getAllOrders);
export default router;
