import mongoose, { model, Schema, Types } from "mongoose";

const categorySchema =  new Schema({
    name:{type:String,required:true},
    description: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
},{ timestamps:true });

const categoryModel = mongoose.models.Category || model('Category',categorySchema)
export default categoryModel