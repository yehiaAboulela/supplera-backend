import userModel from "../../DB/models/User.model.js";
import { asyncHandler } from "../utils/errorHandling.js";
import { verifyToken } from "../utils/generateAndVerifyToken.js";

const auth = asyncHandler(async(req,res,next)=>{
    const{authorization} = req.headers;
    if(!authorization?.startsWith(process.env.BEARER_KEY))return next(new Error('In-valid authorization or bearer token',{cause:'500'}))
    const token = authorization.split(process.env.BEARER_KEY)[1];

    if(!token)return next(new Error('Token is required',{cause:'403'}))
    const decoded = verifyToken({token});
    if(!decoded?.id)return next(new Error('In_valid token payload',{cause:'500'})) 
    const authUser = await userModel.findById(decoded.id).select('userName email role status');
    if(!authUser)return next(new Error('Not register account',{cause:'500'})) 
    req.user = authUser;
    
    return next(); 
})

export default auth;