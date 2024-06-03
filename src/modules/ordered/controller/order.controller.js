import orderModel from "../../../../DB/models/Order.model.js";
import { asyncHandler } from "../../../utils/errorHandling.js";

export const getAllOrders = asyncHandler(async (req, res, next) => {
  const categories = await orderModel.find();
  return res.status(200).json({ message: "Done", categories: categories });
});
// ----------------  my crud of my order------------------------------------------------

export const getUCategories = asyncHandler(async (req, res, next) => {
  const categories = await orderModel.find({ userId: req.user._id });
  if (!categories) return next(new Error("In-valid y", { cause: 404 }));
  return res.status(200).json({ message: "Done", categories: categories });
});

export const newOrder = asyncHandler(async (req, res, next) => {
  const { name, description } = req.body;
  if (!req.body) return next(new Error("In-valid data", { cause: 400 }));
  const order = await orderModel.create({
    userId: req.user._id,
    // products:,
  });
  return res.status(201).json({ message: "Done", order });
});

export const updateOrder = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const order = await orderModel.findById(id);
  if (!order) next(new Error("order not found", { cause: 404 }));
  const updateOrder = await orderModel.findByIdAndUpdate(
    { userId: req.user._id },
    req.body
  );
  return res.status(200).json({ message: "Done", updateOrder });
});

export const deleteOrder = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const deleteOrder = await orderModel.findOneAndDelete(
    { _id: id, userId: req.user._id },
    { new: false }
  );
  return deleteBook
    ? res.status(200).json({ message: "done", deleteOrder })
    : next(new Error("In-valid order", { cause: 404 }));
});
