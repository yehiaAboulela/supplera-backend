import mongoose, { model, Schema, Types } from "mongoose";

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    src: { type: Array, required: true },
    description: String,
    state: String,
    brand: String,
    negotiable: Boolean,
    exchange: Boolean,
    category: { type: Types.ObjectId, ref: "Category" },
    category: { type: String, ref: "Category" },
    // image: [{ type: Object, required: true }],
    price: { type: Number, required: true },
    stock: { type: Number, required: true, default: 1 },
    userId: { type: Types.ObjectId, ref: "User", required: true },
    like: [{ type: Types.ObjectId, ref: "User" }],
    unlike: [{ type: Types.ObjectId, ref: "User" }],
    isDelete: { type: Boolean, default: false },
    totalVote: { type: Number, default: 0 },
    status: { type: String, default: "private", enum: ["public", "private"] },
    reviwedByAdmin: { type: Boolean, default: false },
    reviwedByShipper: { type: Boolean, default: false },
    spam: { type: Boolean, default: false },
    userTokent: String,
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
    timestamps: true,
  }
);

// productSchema.virtual('Cat',{
//     ref:'Cat',
//     localField:'_id',
//     foreignField:'productId'
// })

const productModel = mongoose.models.Product || model("Product", productSchema);
export default productModel;
