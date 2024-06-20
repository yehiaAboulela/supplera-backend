import userModel from "../../../../DB/models/User.model.js";
import { asyncHandler } from "../../../utils/errorHandling.js";
import sendEmail from "../../../utils/email.js";
import {
  generateToken,
  verifyToken,
} from "../../../utils/generateAndVerifyToken.js";
import { compare, hash } from "../../../utils/hashAndCompare.js";

export const getAuthModule = (req, res) => res.json({ message: "Auth module" });

export const signup = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, email, password, address, phone } = req.body;

  if (!req.body) return next(new Error(`Data is required`, { cause: 400 }));
  const user = await userModel.findOne({ email });
  console.log(user);
  if (user) return next(new Error("Email already  exist", { cause: 409 }));
  // const hashPassword = hash({plaintext:password,});
  // const token = generateToken({payload:{email},expiresIn:60*5})
  // const link = `http://localhost:5000/auth/confirmEmail/${token}`
  // const html = `<a href=${link}>Click me to confirm your email</a>`
  // if(! await sendEmail({to:email,subject:'confirm_Email',html}))return next(new Error('Email rejected',{cause:400}))
  const createdUser = await userModel.create({
    firstName,
    lastName,
    email,
    password,
    address,
    phone,
  });
  return res.status(201).json({ message: "success", user: createdUser._id });
});

export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!(email && password))
    return next(new Error("Data is required", { cause: 400 }));
  const user = await userModel.findOne({ email });
  if (!user) return next(new Error("Email not exist", { cause: 400 }));
  // if(!user.confirmEmail)return next(new Error('you have to confirm your email first',{cause: 400}))
  // if(user.status === 'online') return next(new Error('In-valid email your are online',{cause:409}));
  // const match = compare({plaintext:password,hashValue:user.password});
  // if(!match) return next(new Error('In-valid Password',{cause:400}));
  console.log({ email, password, user });
  const token = generateToken({
    payload: { id: user.id, isLoggedIn: true, role: user.role },
    expiresIn: 60 * 60 * 24 * 30 * 12,
  });
  user.status = "online";
  await user.save();
  return res.status(200).json({ message: "done", access_token: token });
});

export const confirmEmail = asyncHandler(async (req, res, next) => {
  const { token } = req.params;
  const decoded = verifyToken({ token });
  const user = await userModel.updateOne(
    { email: decoded.email, confirmEmail: false },
    { confirmEmail: true }
  );
  if (!user) return next(new Error("In_valid account", { cause: 404 }));
  return res.status(200).redirect(`https://www.google.com/`);
});

export const logOut = asyncHandler(async (req, res, next) => {
  const user = await userModel.findOneAndUpdate(
    { _id: req.user.id, status: "online" },
    { status: "offline" }
  );
  if (!user) return next(new Error("In-valid user"));
  return res.status(200).json({ message: "Done" });
});

export const restPassword = asyncHandler(async (req, res, next) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;
  console.log({ oldPassword, newPassword, confirmPassword });
  const user = await userModel.findById(req.user.id);
  if (!compare({ plaintext: oldPassword, hashValue: user.password }))
    return next(new Error("In-valid oldPassword", { cause: 400 }));
  const hashPassword = hash({ plaintext: newPassword });
  user.password = hashPassword;
  await user.save();
  return res.status(200).json({ message: "Done" });
});
