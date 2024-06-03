import joi from "joi";
import { generalFields } from "../../middleware/validation.js";

export const updateProfile = joi
  .object({
    userName: generalFields.str,
    email: generalFields.email,
    password: generalFields.password,
    confirmPassword: generalFields.confirmPassword.valid(joi.ref("password")),
    age: generalFields.age,
    phoneNumber: generalFields.phoneNumber,
  })
  .required();
