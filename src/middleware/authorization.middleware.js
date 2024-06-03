import { asyncHandler } from "../utils/errorHandling.js";
export const authorization = asyncHandler(async(req,res,next)=>{
    // const authUser = await userModel.findById(req.user._id).select('userName email role status');
    if(!req.user.role === 'admin') return next(new Error('Not authentication',{cause:400}))
    return next();
})