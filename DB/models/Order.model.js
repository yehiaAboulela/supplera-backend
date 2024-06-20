import mongoose, { model, Schema, Types } from "mongoose";

const orderSchema = Schema(
  {
    userId: { type: Types.ObjectId, ref: "User" },
    products: [
      {
        productId: { type: Types.ObjectId, ref: "Product" },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    status: {
      type: String,
      default: "Pending",
      enum: [
        "Pending",
        "Processing",
        "Shipped",
        "Out for Delivery",
        "Delivered",
        "Cancelled",
        "Returned",
        "Refunded",
      ],
    },
  },
  { timestamps: true }
);

const orderModel = mongoose.models.Order || model("Order", orderSchema);
export default orderModel;
