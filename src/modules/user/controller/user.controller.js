import userModel from "../../../../DB/models/User.model.js";
import cloudinary from "../../../utils/cloudinary.js";
import { asyncHandler } from "../../../utils/errorHandling.js";

export const getUserModule = async (req, res) => {
  const users = await userModel.find().select("_id userName image ");
  return res.json({ message: "User module", users });
};
export const profile = asyncHandler(async (req, res, next) => {
  const user = await userModel
    .findById(req.user._id)
    .select(
      "_id timestamps firstName lastName phone email confirmEmail status"
    );
  return res.json({ message: "Done", user });
});
export const updateProfile = asyncHandler(async (req, res, next) => {
  // const {userName, bio, } = req.body;
  const user = await userModel.findByIdAndUpdate(
    { _id: req.user._id },
    req.body
  );
  if (!user) return next(new Error("In-valid user", { cause: 400 }));
  return res.json({ message: "Done", user });
});

export const softDelete = asyncHandler(async (req, res, next) => {
  const user = await userModel.findByIdAndUpdate(
    { _id: req.user._id },
    { softDelete: true },
    { new: true }
  );
  if (!user) return next(new Error("In-valid user", { cause: 400 }));
  return res.json({ message: "Done", user });
});

export const unSoftDelete = asyncHandler(async (req, res, next) => {
  const user = await userModel.findByIdAndUpdate(
    { _id: req.user._id },
    { softDelete: false },
    { new: true }
  );
  if (!user) return next(new Error("In-valid user", { cause: 400 }));
  return res.json({ message: "Done", user });
});

export const deleteUser = asyncHandler(async (req, res, next) => {
  const user = await userModel.findByIdAndDelete({ _id: req.user._id });
  return res.json({ message: "Done", user });
});

// User pic
export const profilePic = asyncHandler(async (req, res, next) => {
  console.log(req.file);
  const { secure_url, public_id } = await cloudinary.uploader.upload(
    req.file.path,
    { folder: `user/${req.user._id}/profile` }
  );
  console.log({ secure_url, public_id });
  const user = await userModel.findByIdAndUpdate(
    req.user._id,
    { profilePic: secure_url, profilePicId: public_id },
    { new: false }
  );
  await cloudinary.uploader.destroy(user.profilePicId);
  return res.json({ message: "Done", user });
});

export const profileCovPic = asyncHandler(async (req, res, next) => {
  console.log(req.files);
  console.log(req.user._id);
  const coverPic = [];
  for (const image of req.files) {
    if (!(image.size < 52428800))
      return next(new Error("it is big size file", { cause: 400 }));
    const { secure_url, public_id } = await cloudinary.uploader.upload(
      image.path,
      { folder: `user/${req.user._id}/profile/cover` }
    );
    console.log({ secure_url, public_id });
    coverPic.push({ secure_url, public_id });
  }
  console.log(coverPic);
  const user = await userModel.findByIdAndUpdate(
    req.user._id,
    { coverPic },
    { new: true }
  );
  return res.json({ message: "Done", user });
});
