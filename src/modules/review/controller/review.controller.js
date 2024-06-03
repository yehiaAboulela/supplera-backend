import reviewModel from "../../../../DB/models/Review.model.js";
import { asyncHandler } from "../../../utils/errorHandling.js";



export const getAllReviews = asyncHandler(async(req,res,next)=>{
    const categories = await reviewModel.find()
    // .populate([
    //     {
    //         path:'userId',
    //         select:'userName profilePic'
    //     },
    //     {
    //         path:'like',
    //         select:'userName profilePic'
    //     },
    //     {
    //         path:'unlike',
    //         select:'userName profilePic'
    //     }
    // ])
    return res.status(200).json({message:'Done',categories: categories})
})
// ----------------  my crud of my review------------------------------------------------

export const getAllReview = asyncHandler(async(req,res,next)=>{
    const categories = await reviewModel.find({userId:req.user._id});
    if(!categories) return next(new Error('In-valid y',{cause:404}));
    return res.status(200).json({message:'Done',categories: categories})
});

export const newReview = asyncHandler(async(req,res,next)=>{
    const { user, product, rating, comment } = req.body
    if(!req.body)return next(new Error('In-valid data',{cause:400}));
    const review = await reviewModel.create({ user, product, rating, comment })
    return res.status(201).json({message:'Done',review})
});

export const updateReview = asyncHandler(async(req,res,next)=>{
    const {id} = req.params;
    const review = await reviewModel.findById(id)
    if(!review) next(new Error('review not found',{cause:404}));
    const updateReview = await reviewModel.findByIdAndUpdate({userId:req.user._id},req.body)
    return res.status(200).json({message:'Done',updateReview})
});

export const deleteReview = asyncHandler(async (req,res,next) => {
    const {id} = req.params;
    const deleteReview = await reviewModel.findOneAndDelete({_id:id,userId:req.user._id},{new:false})
    return deleteBook ? res.status(200).json({message:'done', deleteReview}):next(new Error('In-valid review',{cause:404}))
})
