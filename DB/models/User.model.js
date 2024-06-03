import mongoose, { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    // userName:{
    //     type:String,
    //     required:true
    // },
    bio: String,
    profilePic: String,
    profilePicId: String,
    coverPic: [],
    address: {
      type: String,
      // require:true
    },
    age: Number,
    phoneNumber: Number,
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      // match:/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      // require:true,
    },
    gender: {
      type: String,
      default: "male",
      enum: ["male", "female"],
    },
    status: {
      type: String,
      default: "offline",
      enum: ["offline", "online", "blocked"],
    },
    role: {
      type: String,
      default: "customer",
      enum: ["admin", "customer"],
    },
    confirmEmail: {
      type: Boolean,
      default: false,
    },
    softDelete: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
// ,{
//     toObject:{virtuals:true},
//     toJSON:{virtuals:true},
//     timestamps:true
// }
// );

// userSchema.virtual('post',{
//     ref:'Post',
//     localField:'_id',
//     foreignField:'userId'
// })

const userModel = mongoose.models.User || model("User", userSchema);
export default userModel;
