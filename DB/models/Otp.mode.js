import mongoose, { model, Schema } from "mongoose";


const otpSchema =  new Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        match:/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    },
    otp:{
        type:String,
        required:true
    }
},{
    timestamps:true
});

otpSchema.index({createdAt:1},{expireAfterSeconds:60000})
const otpModel = mongoose.models.Otp || model('Otp',otpSchema)
export default otpModel