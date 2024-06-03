import { Router } from "express";
import auth from "../../middleware/auth.middleware.js";
import * as reviewController from './controller/review.controller.js'
// import commentRouter from '../comment/comment.router.js'
import { fileUpload, fileValidation } from "../../utils/cloudMulter.js";
import { validation } from "../../middleware/validation.js";
import { add, checkId, update } from "./review.validation.js";
const router = Router();
// router.use('/:reviewId/comment/', commentRouter)

router.get('/', reviewController.getAllReviews)

//==================================== categories====================================

//---------------------------owner-------------------------------------
router.get('myReview',auth,reviewController.getAllReviews)
router.post('/add',auth,fileUpload(fileValidation.image).single('image'),validation(add),reviewController.newReview);
router.put('/:reviewId/',auth,validation(update),reviewController.updateReview)
router.delete('/:reviewId/',auth,validation(checkId),reviewController.deleteReview)

export default router