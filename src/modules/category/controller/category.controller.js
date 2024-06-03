import categoryModel from "../../../../DB/models/Category.model.js";
import { asyncHandler } from "../../../utils/errorHandling.js";



export const getAllCategories = asyncHandler(async(req,res,next)=>{
    const categories = await categoryModel.find()
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
// ----------------  my crud of my category------------------------------------------------

export const getCategory = asyncHandler(async(req,res,next)=>{
    const { categoryId } = req.params;
    const categories = await categoryModel.find({_id: categoryId });
    if(!categories) return next(new Error('In-valid y',{cause:404}));
    return res.status(200).json({message:'Done',categories: categories})
});

// export const getUCategories = asyncHandler(async(req,res,next)=>{
//     console.log(req.user._id);
//     const categories = await categoryModel.find({user:req.user._id });
//     if(!categories) return next(new Error('In-valid y',{cause:404}));
//     return res.status(200).json({message:'Done',categories: categories})
// });

export const getUCategories = asyncHandler(async(req,res,next)=>{
    console.log(req.user._id);

    if (!mongoose.Types.ObjectId.isValid(req.user._id)) {
        return next(new Error('Invalid user ID', { cause: 400 }));
    }

    const categories = await categoryModel.find({user: req.user._id });
    if(!categories || categories.length === 0) {
        return next(new Error('No categories found', { cause: 404 }));
    }
    
    return res.status(200).json({ message: 'Done', categories: categories });
});

export const userCategories = asyncHandler(async(req,res,next)=>{
    const category = await categoryModel.find({ user:req.user._id})
    return res.status(201).json({message:'Done',category})
});



export const newCategory = asyncHandler(async(req,res,next)=>{
    const { name, description } = req.body
    if(!req.body)return next(new Error('In-valid data',{cause:400}));
    console.log( name , description, req.user._id);
    const category = await categoryModel.create({name, description, user:req.user._id})
    return res.status(201).json({message:'Done',category})
});

export const updateCategory = asyncHandler(async(req,res,next)=>{
    const {categoryId} = req.params;
    const category = await categoryModel.findById(categoryId)
    if(!category) next(new Error('category not found',{cause:404}));
    const updateCategory = await categoryModel.findByIdAndUpdate({ _id:categoryId, user:req.user._id },req.body,{new:true})
    return res.status(200).json({message:'Done',updateCategory})
});

export const deleteCategory = asyncHandler(async (req,res,next) => {
    const {categoryId} = req.params;
    console.log(categoryId);
    const deleteCategory = await categoryModel.findOneAndDelete({_id:categoryId},{new:false})
    return deleteCategory ? res.status(200).json({message:'done', deleteCategory}):next(new Error('In-valid category',{cause:404}))
})
