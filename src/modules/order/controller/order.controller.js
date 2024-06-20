import orderModel from "../../../../DB/models/Order.model.js";
import { asyncHandler } from "../../../utils/errorHandling.js";

export const getAllOrders = asyncHandler(async (req, res, next) => {
  const orders = await orderModel.find();
  return res.status(200).json({ message: "Done", orders: orders });
});
// ----------------  my crud of my order------------------------------------------------

export const getUCategories = asyncHandler(async (req, res, next) => {
  const orders = await orderModel.find({ userId: req.user._id });
  if (!orders) return next(new Error("In-valid y", { cause: 404 }));
  return res.status(200).json({ message: "Done", orders: orders });
});

export const newOrder = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  const { products, totalAmount } = req.body;
  //   if (!req.body) return next(new Error("In-valid data", { cause: 400 }));
  const order = await orderModel.create({
    userId: req.user._id,
    products,
    totalAmount,
  });
  return res.status(201).json({ message: "Done", order });
});

export const updateOrder = asyncHandler(async (req, res, next) => {
  const { orderId } = req.params;
  const order = await orderModel.findById(orderId);
  if (!order) next(new Error("order not found", { cause: 404 }));
  const updateOrder = await orderModel.findByIdAndUpdate(
    { _id: orderId },
    req.body,
    { new: true }
  );
  return res.status(200).json({ message: "Done", updateOrder });
});

export const deleteOrder = asyncHandler(async (req, res, next) => {
  const { orderId } = req.params;
  const deleteOrder = await orderModel.findOneAndDelete(
    { _id: orderId, userId: req.user._id },
    { new: false }
  );
  return deleteOrder
    ? res.status(200).json({ message: "done", deleteOrder })
    : next(new Error("In-valid order", { cause: 404 }));
});
