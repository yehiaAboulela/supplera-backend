import { Router } from "express";
import auth from "../../middleware/auth.middleware.js";
import * as productController from './controller/product.controller.js'
import { fileUpload, fileValidation } from "../../utils/cloudMulter.js";
import { validation } from "../../middleware/validation.js";
import { add,checkId, update } from "./product.validation.js";
const router = Router();

router.get('/', productController.getAllProducts)

//==================================== products====================================

//---------------------------owner-------------------------------------
router.get('/',auth,productController.getAllProducts)
router.get('/userProduct',auth,productController.getUProducts)
router.get('/:productId/',auth,productController.selectedProduct)
router.post('/add',auth,productController.newProduct);
router.put('/:productId/',auth/*,validation(update)*/,productController.updateProduct)
router.delete('/:productId/',auth,validation(checkId),productController.deleteProduct)

// router.delete('/:productId/',auth,validation(checkId),productController.deleteProduct)

//---------------------------visitor-------------------------------------
router.patch('/like/:productId',auth,validation(checkId),productController.likeProduct)
router.patch('/unLike/:productId',auth,validation(checkId),productController.unLikeProduct)

export default router