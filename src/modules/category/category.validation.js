import Joi from "joi";
import { generalFields } from "../../middleware/validation.js";
// { name, description } 
export const add = Joi.object({
    name:generalFields.str.required(),
    description:generalFields.str.required(),
}).required();

export const checkId = Joi.object({
    categoryId:generalFields.id.required()
}).required();

export const update = Joi.object({
    categoryId:generalFields.id.required(),
    name:generalFields.str,
    description:generalFields.str,
});
