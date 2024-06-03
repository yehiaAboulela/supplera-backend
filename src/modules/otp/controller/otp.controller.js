import otpModel from "../../../../DB/models/Otp.mode.js";
import userModel from "../../../../DB/models/User.model.js";
import sendEmail from "../../../utils/email.js";
import { asyncHandler } from "../../../utils/errorHandling.js";
import { generateToken } from "../../../utils/generateAndVerifyToken.js";
import { compare, hash } from "../../../utils/hashAndCompare.js";
import webSide from "./html.js";

export const sendOTP = asyncHandler(
    async(req, res, next) =>{
        const {email}=req.body;
        if(!email)return next(new Error('provide values for email,..,..,.. ',{cause:400}));
        await otpModel.deleteOne({email});
        const user = await userModel.findOne({email});
        if(!user)return next(new Error('In-valid email',{cause:404}));
        // generate pin
        const generateOTP = `${Math.floor( 1000 + Math.random() *9000 )}` 
        const hashOTP = hash({plaintext:generateOTP});
        const newOTP = await otpModel.create({
            email,
            otp:hashOTP,
        });
        const html = webSide(generateOTP,email);
        // send email 
        if(! await sendEmail({to:email,subject:'confirm_Email',html}))return next(new Error('Email rejected',{cause:400}))
            return res.status(201).json({message:'Done',newOTP});
    }
)
/// anther way to confirm email
export const confirmOTP = asyncHandler(
    async(req,res,next)=>{
        const {email,otp} = req.body
        if(!( email && otp ))return next(new Error('Provide values for email, otp',{cause:404}));
        const match = await otpModel.findOne({email});
        if(!match)return next(new Error(`NO otp records found`,{cause:404}));
        
        // check if expires date

        if(!check)return next(new Error(``));

        // check if and compare password
        const hashedOTP = compare({plaintext:otp,hashValue:match.otp});
        if(!hashedOTP)return next(new Error(`In-valid otp`,{cause:400}));
        const user = await userModel.updateOne({email},{confirmEmail:true});
        await otpModel.deleteOne({email});
        return res.status(200).json({message:'confirmation done',user:user._id});
    }
)


export const forgotPassword = asyncHandler(
    async(req,res,next)=>{
        const {email,otp,password,confirmPassword} = req.body
        if(!( email && otp , password,confirmPassword ))return next(new Error('Provide values for email, otp',{cause:404}));
        if(password !== confirmPassword) return next(new Error(`passwords do not match`,{cause:400}))
        const match = await otpModel.findOne({email});
        if(!match)return next(new Error(`NO otp records found`,{cause:404}));
        const userF = await userModel.findOne({email});
        if(!userF)return next(new Error(`Invalid email`,{cause:404}));
        const matchPass = compare({ plaintext: password, hashValue: userF.password })
        if(!matchPass)return next(new Error(`the same password must be changed `));
        // check if and compare password
        const hashedOTP = compare({plaintext:otp,hashValue:match.otp});
        if(!hashedOTP)return next(new Error(`In-valid otp`,{cause:400}));
        const user = await userModel.updateOne({email},{password});
        await otpModel.deleteOne({email});
        return res.status(200).json({message:'confirmation done',user:user._id});
    }
)