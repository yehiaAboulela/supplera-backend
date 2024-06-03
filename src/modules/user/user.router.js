import { Router } from "express";
import auth from "../../middleware/auth.middleware.js";
import { authorization } from "../../middleware/authorization.middleware.js";
import { validation } from "../../middleware/validation.js";

import * as userController from './controller/user.controller.js'
import { updateProfile } from "./user.validation.js";
import { fileUpload, fileValidation } from "../../utils/cloudMulter.js";
const router = Router();

router.get('/',auth,authorization,userController.getUserModule)  

router.get('/profile',auth,userController.profile)  

router.put('/profile/update',auth,validation(updateProfile),userController.updateProfile)
router.patch('/profile/softDelete',auth,userController.softDelete)
router.patch('/profile/unSoftDelete',auth,userController.unSoftDelete)
router.delete('/profile/delete',auth,userController.deleteUser)

router.patch('/profilePic',auth,fileUpload(fileValidation.image).single('image'),userController.profilePic)

router.patch('/profileCovPic',auth,fileUpload(fileValidation.image).array('image',5),userController.profileCovPic)

export default router