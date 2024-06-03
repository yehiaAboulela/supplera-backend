import mongoose, { model, Schema, Types } from "mongoose";

const cartSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    items: [{ 
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: Number
    }],
}, { timestamps: true });

const cartModel = mongoose.models.Cart || model('Cart',cartSchema)
export default cartModel