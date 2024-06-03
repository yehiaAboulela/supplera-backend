import { Router } from "express";
import auth from "../../middleware/auth.middleware.js";
import * as cartController from './controller/cart.controller.js'
// import commentRouter from '../comment/comment.router.js'
import { fileUpload, fileValidation } from "../../utils/cloudMulter.js";
import { validation } from "../../middleware/validation.js";
import { add, checkId, update } from "./cart.validation.js";
const router = Router();
// router.use('/:cartId/comment/', commentRouter)

router.get('/', cartController.getAllCarts)

//==================================== categories====================================

//---------------------------owner-------------------------------------
router.get('/',auth,cartController.getAllCarts)
router.post('/addOrRemoveToCard',auth,validation(add),cartController.newCart);
export default router