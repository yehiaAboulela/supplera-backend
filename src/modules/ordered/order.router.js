import { Router } from "express";
import auth from "../../middleware/auth.middleware.js";
import * as orderController from './controller/order.controller.js'
const router = Router();
// router.use('/:orderId/comment/', commentRouter)

router.get('/', orderController.getAllOrders)

//==================================== categories====================================

//---------------------------owner-------------------------------------
router.get('myOrder',auth,orderController.getAllOrders)
router.post('/add',auth,orderController.newOrder);
router.put('/:orderId/',auth,validation(update),orderController.updateOrder)
router.delete('/:orderId/',auth,validation(checkId),orderController.deleteOrder)

export default router