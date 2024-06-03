import Joi, { number } from "joi";
import { generalFields } from "../../middleware/validation.js";

export const add = Joi.object({
    user:generalFields.id.required(),
    products:Joi.array().items(
        Joi.object({
            productId: generalFields.id.required(),
            quantity:number()
        })
    ).required(),
}).required();

export const checkId = Joi.object({
    postId:generalFields.id.required()
}).required();

export const update = Joi.object({
    id:generalFields.id.required(),
    user:generalFields.id.required(),
    products:Joi.array().items(
        Joi.object({
            productId: generalFields.id.required(),
            quantity:number().required()
        })
    ).required(),
});
