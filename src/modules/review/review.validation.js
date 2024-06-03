import Joi from "joi";
import { generalFields } from "../../middleware/validation.js";

export const add = Joi.object({
    user:generalFields.id,
    product: generalFields.id,
    rating:Joi.number(),
    comment:generalFields.str,
}).required();

export const checkId = Joi.object({
    postId:generalFields.id.required()
}).required();

export const update = Joi.object({
    user:generalFields.id,
    product: generalFields.id,
    rating:number(),
    comment:generalFields.str,
});
