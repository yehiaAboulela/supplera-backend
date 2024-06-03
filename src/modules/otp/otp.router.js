import { Router } from "express";

import * as otpController from './controller/otp.controller.js';
const router = Router();



router.post('/',otpController.sendOTP)

// anther way to confirm Email by otp 
router.post('/verify',otpController.confirmOTP)

router.post('/forgotPassword',otpController.forgotPassword)
export default router