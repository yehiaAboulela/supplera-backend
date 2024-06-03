import Joi from "joi";
import { generalFields } from "../../middleware/validation.js";

// Validation schema for adding items to cart
export const add = Joi.object({
    productId: generalFields.id.required(),
    quantity: Joi.number().integer().min(0) 
}).required();

// Validation schema for checking cart ID
export const checkId = Joi.object({
    cartId: generalFields.id.required()
}).required();

// Validation schema for updating cart
export const update = Joi.object({
    id: generalFields.id.required(), 
    productId: generalFields.id, 
    quantity: Joi.number().integer().min(1)
});
