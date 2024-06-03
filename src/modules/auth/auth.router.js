import { Router } from "express";
import auth from "../../middleware/auth.middleware.js";
import {validation} from "../../middleware/validation.js";
import { loginSchema, signupSchema, updatePassword } from "./auth.validation.js";
import * as authController from './controller/auth.controller.js'
const router = Router();

router.get('/',authController.getAuthModule)  
router.post('/signup',authController.signup)
router.post('/login',validation(loginSchema), authController.login)
router.get('/confirmEmail/:token',authController.confirmEmail)
router.post('/logOut',auth,authController.logOut)
router.patch('/password',validation(updatePassword),auth,authController.restPassword)
export default router

