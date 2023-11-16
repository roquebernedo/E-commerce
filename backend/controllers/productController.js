import asyncHandler from "express-async-handler"
import Product from "../models/productModel.js"
import User from "../models/userModel.js"
import jwt from "jsonwebtoken"

const gettingProducts = asyncHandler(async (req, res) => {
    try{
        const response = await Product.find({}).populate('user', { name: 1, email: 1 })
        res.json(response)
    } catch (err){
        res.json(err)
    }

})

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      console.log("hola")
      return authorization.substring(7)
    }
    return null
  }

const addingProducts =  async (req, res) => {
    const body = req.body
    const token = getTokenFrom(req)
    console.log(token)
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
    if (!token || !decodedToken.id) {
        return res.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)

    const product = new Product({
        title: body.title,
        description: body.description,
        image: body.image,
        color: body.color,
        size: body.size,
        material: body.material,
        instructions: body.instructions,
        price: body.price,
        user: user._id
    })

    const savedProduct = await product.save()
    user.products = user.products.concat(savedProduct._id)
    await user.save()
    
    res.json(savedProduct)
}

const gettingUniqueProducts = asyncHandler(async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product); 
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

const updateProduct = async (req, res) => {
    const productId = req.params.id;
    const {
      title,
      description,
      image,
      color,
      size,
      material,
      instructions,
      price,
    } = req.body;
  
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        {
          title,
          description,
          image,
          color,
          size,
          material,
          instructions,
          price,
        },
        { new: true }
      );
  
      if (!updatedProduct) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      res.json(updatedProduct);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
};

export { 
    gettingProducts,
    addingProducts,
    gettingUniqueProducts,
    saveProducts,
    updateProduct
}