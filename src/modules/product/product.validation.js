import Joi from "joi";
import { generalFields } from "../../middleware/validation.js";

// {name, description, category, image, price, stock, like, unLike, isDelete, totalVote, status}
export const add = Joi.object({
  name: generalFields.str.max(50).required(),
  description: generalFields.str.required(),
  category: generalFields.str.max(50).required(),
  image: generalFields.image,
  price: generalFields.num.required(),
  stock: generalFields.num.required(),
  like: generalFields.id,
  unLike: generalFields.id,
  isDelete: generalFields.bol,
  totalVote: generalFields.num,
  status: generalFields.str,
}).required();

export const checkId = Joi.object({
  productId: generalFields.id.required(),
}).required();

export const update = Joi.object({
  id: generalFields.id,
  name: generalFields.str.max(50),
  description: generalFields.str,
  category: generalFields.str.max(50),
  // image:generalFields.image,
  price: generalFields.num,
  stock: generalFields.num,
  like: generalFields.id,
  unLike: generalFields.id,
  isDelete: generalFields.bol,
  totalVote: generalFields.num,
  status: generalFields.str,
});
