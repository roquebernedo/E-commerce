import asyncHandler from "express-async-handler"
import Product from "../models/productModel.js"
import User from "../models/userModel.js"

const gettingProducts = asyncHandler(async (req, res) => {
    try{
        const response = await Product.find({})
        res.json(response)
    } catch (err){
        res.json(err)
    }

})
const addingProducts = asyncHandler(async (req, res) => {
    const recipe = new Product(req.body)
    try{
        const response = await recipe.save()
        res.json(response)
    } catch (err){
        res.json(err)
    }
})

const gettingUniqueProducts = asyncHandler(async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            // Si no se encuentra el producto con el ID proporcionado
            return res.status(404).json({ error: 'Product not found' });
        }
        
        res.json(product); // Devuelve el producto encontrado
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

const saveProducts = asyncHandler(async (req, res) => {
    try{
        const product = await Product.findById(req.body.recipeID)
        const user = await User.findById(req.body.userID)
        user.savedProducts.push(product)
        await user.save()
        res.json({ savedProducts: user.savedProducts })
    } catch (err){
        res.json(err)
    }
})

export { 
    gettingProducts,
    addingProducts,
    gettingUniqueProducts,
    saveProducts
}