import { Router } from "express";
import auth from "../../middleware/auth.middleware.js";
import * as orderController from './controller/order.controller.js'
const router = Router();
// router.use('/:orderId/comment/', commentRouter)

router.get('/', orderController.getAllOrders)

//==================================== categories====================================

//---------------------------owner-------------------------------------
router.get('/allOrder',auth,orderController.getAllOrders)
router.get('/myOrder',auth,orderController.getUCategories)
router.post('/add',auth,orderController.newOrder);
router.put('/:orderId/',auth,orderController.updateOrder)
router.delete('/:orderId/',auth,orderController.deleteOrder)

export default router