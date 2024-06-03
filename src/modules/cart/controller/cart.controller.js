import cartModel from "../../../../DB/models/Cart.model.js";
import { asyncHandler } from "../../../utils/errorHandling.js";

// Function to get all carts
export const getAllCarts = async (req, res) => {
    try {
        const carts = await cartModel.find();
        res.status(200).json(carts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const newCart = asyncHandler(async(req,res,next)=>{
    const {productId, quantity} = req.body
    if(!req.body)return next(new Error('In-valid data',{cause:400}));
    const order = await cartModel.create({user:req.user._id,items:[{productId, quantity}]})
    return res.status(201).json({message:'Done',order})
});






// Function to add or remove items from the cart
// export const newCart = async (req, res) => {
//     const { productId, quantity } = req.body;
//     const userId = req.user.id; // Assuming you have user ID in the request object

//     try {
//         let cart = await cartModel.findOne({ user: userId });

//         if (!cart) {
//             // If cart doesn't exist for the user, create a new one
//             cart = new cartModel({
//                 user: userId,
//                 items: [{ productId, quantity }]
//             });
//         } else {
//             // Check if the product already exists in the cart
//             const existingItemIndex = cartModel.items.findIndex(item => item.productId.toString() === productId);

//             if (existingItemIndex !== -1) {
//                 // If product exists, update its quantity
//                 cartModel.items[existingItemIndex].quantity += quantity;
//             } else {
//                 // If product doesn't exist, add it to the cart
//                 cart.items.push({ productId, quantity });
//             }
//         }

//         // Save the updated cart
//         await cartModel.save();
//         res.status(201).json(cart);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

