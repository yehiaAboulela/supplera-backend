import joi from 'joi';
import { generalFields } from '../../middleware/validation.js';

// {userName,email,password,age}
export const signupSchema = joi.object({
        userName:generalFields.str.required(),
        email:generalFields.email,
        password:generalFields.password,
        confirmPassword:generalFields.confirmPassword.valid(joi.ref('password')),
        age:generalFields.age.required()
    }).required()

export const loginSchema = joi.object({
        email:generalFields.email,
        password:generalFields.password
    }).required()

export const updatePassword = joi.object({
        oldPassword:generalFields.password,
        newPassword:generalFields.password.invalid(joi.ref('oldPassword')),
        confirmPassword:generalFields.confirmPassword.valid(joi.ref('newPassword')) 
    }).required()


