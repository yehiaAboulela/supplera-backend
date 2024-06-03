import { Router } from "express";
import auth from "../../middleware/auth.middleware.js";
import * as categoryController from './controller/category.controller.js'
// import commentRouter from '../comment/comment.router.js'
import { fileUpload, fileValidation } from "../../utils/cloudMulter.js";
import { validation } from "../../middleware/validation.js";
import { add,checkId, update } from "./category.validation.js";
const router = Router();
// router.use('/:categoryId/comment/', commentRouter)

router.get('/', categoryController.getAllCategories)

//==================================== categories====================================

//---------------------------owner-------------------------------------
router.get('/all',auth,categoryController.getAllCategories)
router.get('/:categoryId',auth,categoryController.getCategory)
router.get('/userCategories/category',auth,categoryController.userCategories);
router.post('/add',auth,validation(add),categoryController.newCategory);
router.put('/:categoryId/',auth,validation(update),categoryController.updateCategory)
router.delete('/:categoryId/',auth,validation(checkId),categoryController.deleteCategory)

export default router