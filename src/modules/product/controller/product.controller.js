// import moment from "moment";
// import productModel from "../../../../DB/models/product.model.js";
import productModel from "../../../../DB/models/Product.model.js";

import cloudinary from "../../../utils/cloudinary.js";
import { asyncHandler } from "../../../utils/errorHandling.js";
// import { nanoid } from "nanoid";

export const getAllProducts = asyncHandler(async (req, res, next) => {
  const products = await productModel.find();
  return res.status(200).json({ message: "Done", products });
});
// ----------------  my crud of my product------------------------------------------------

export const getUProducts = asyncHandler(async (req, res, next) => {
  const products = await productModel.find({ userId: req.user._id });
  if (!products) return next(new Error("In-valid y", { cause: 404 }));
  return res.status(200).json({ message: "Done", products });
});

export const newProduct = asyncHandler(async (req, res, next) => {
  const {
    name,
    description,
    category,
    price,
    stock,
    status,
    src,
    state,
    brand,
    negotiable,
    exchange,
  } = req.body;
  if (!req.body && !req.file && !req.user._id)
    return next(new Error("In-valid data", { cause: 400 }));
  // const { public_id, secure_url } = await cloudinary.uploader.upload(
  //   req.file.path,
  //   { folder: `product/${req.user._id}` }
  // );
  const product = await productModel.create({
    name,
    description,
    category,
    // image: { public_id, secure_url },
    src,
    price,
    stock,
    userId: req.user._id,
    status,
    userId: req.user._id,
    state,
    brand,
    negotiable,
    exchange,
  });
  return res.status(201).json({ message: "Done", product });
});

export const selectedProduct = asyncHandler(async (req, res, next) => {
  const { productId } = req.params;
  const product = await productModel.findById(productId);
  if (!product) next(new Error("product not found", { cause: 404 }));
  return res.status(200).json({ message: "Done", product });
});
export const updateProduct = asyncHandler(async (req, res, next) => {
  const { productId } = req.params;
  const product = await productModel.findById(productId);
  if (!product) next(new Error("product not found", { cause: 404 }));
  if (req.file) {
    const { public_id, secure_url } = await cloudinary.uploader.upload(
      req.file.path,
      { folder: `product/${req.user._id}` }
    );
    const updatePicProduct = await productModel.findByIdAndUpdate(
      productId,
      { image: { public_id, secure_url } },
      { new: true }
    );
    await cloudinary.uploader.destroy(product.image.public_id);
    return res.status(200).json({ message: "Done", updateProduct });
  }
  console.log("after check file update", product);
  const updateProduct = await productModel.findByIdAndUpdate(
    productId,
    req.body,
    { new: true }
  );
  console.log(updateProduct);
  return res.status(200).json({ message: "Done", updateProduct });
});
export const deleteProduct = asyncHandler(async (req, res, next) => {
  console.log(" I arrive to delete method");
  const { productId } = req.params;
  console.log(productId);
  const deleteProduct = await productModel.findByIdAndDelete(productId, {
    new: false,
  });
  if (!deleteProduct) return res.status(404).json({ message: "not found" });
  console.log(deleteProduct);
  if (deleteProduct?.image)
    await cloudinary.uploader.destroy(deleteProduct.image.public_id);
  return deleteProduct
    ? res.status(200).json({ message: "done", deleteProduct })
    : next(new Error("In-valid product", { cause: 404 }));
});

// export const deleteProduct = asyncHandler(async (req,res,next) => {
//     console.log(" I arrive to delete method");
//     const {productId} = req.params;
//     console.log("this is product Id: " , productId);

// })

//---------------------------- visitor  CURD------------------------------------

export const likeProduct = asyncHandler(async (req, res, next) => {
  const { productId } = req.params;
  const product = await productModel.findByIdAndUpdate(
    productId,
    { $addToSet: { like: req.user._id }, $pull: { unlike: req.user._id } },
    { new: true }
  );
  if (!product) next(new Error("product not found", { cause: 404 }));
  product.totalVote = product.like.length - product.unlike.length;
  await product.save();
  return res.status(200).json({ message: "Done", product });
});

export const unLikeProduct = asyncHandler(async (req, res, next) => {
  const { productId } = req.params;
  const product = await productModel.findByIdAndUpdate(
    productId,
    { $addToSet: { unlike: req.user._id }, $pull: { like: req.user._id } },
    { new: true }
  );
  if (!product) next(new Error("product not found", { cause: 404 }));
  product.totalVote = product.like.length - product.unlike.length;
  await product.save();
  return res.status(200).json({ message: "Done", product });
});
