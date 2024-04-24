import asyncHandler from "express-async-handler"
import Product from "../models/productModel.js"
import User from "../models/userModel.js"
import jwt from "jsonwebtoken"
import { userExtractor } from "../middleware/authMiddleware.js"
import { response } from "express"

const gettingProducts = asyncHandler(async (req, res) => {
    try{
        console.log("hola")
        const response = await Product.find({}).populate('user', { name: 1, email: 1 })
        res.json(response)
    } catch (err){
        res.json(err)
    }
  console.log("hola")
})

const addingProducts = (async (request, response) => {
  // const recipe = new Product(req.body)
  // try{
  //     const response = await recipe.save()
  //     res.json(response)
  // } catch (err){
  //     res.json(err)
  // }
  console.log("aqui esta el error")
  const body = request.body
  const user = request.user
  console.log("user aqui")
  console.log(user)
  const product = new Product({
    title: body.title,
    description: body.description,
    brand: body.brand,
    category: body.category,
    mainCategory: body.mainCategory,
    stock: body.stock,
    main_features: body.main_features,
    price: body.price,
    discount: body.discount,
    date: body.date,
    image: body.image,
    quantity: body.quantity,
    user: user.id
  })

  const savedProduct = await product.save()

  user.products = user.products.concat(savedProduct._id)
  await user.save()
  
  response.status(201).json(savedProduct)
})

const addingProductsToCart = (async (request, response) => {
  const body = request.body
  const user = request.user
  console.log("This is the user")
  console.log(user)
  //const productA = await Product.findById(request.params.id)
  // const product2 = await Product.find()
  // console.log(product2)
  const product = {
    id: body.id,
    title: body.title,
    description: body.description,
    price: body.price,
    image: body.image,
    quantity: body.quantity
  }
  //const usercito = await User.findById("6614620e031f441b99c1c6dd")
  //console.log(usercito.productsOnCart)
  //const product = await Product.findById("660d8c7561262c6c32988ed9")
  console.log("aca esta el producto del carrito")
  console.log(product)
  //const savedProduct = await product.save()
  console.log(saveProducts)

  user.productsOnCart = user.productsOnCart.concat(product)
  await user.save()
  
  response.status(201).json(product)
})

const updatingProductsToCart = (async (request, response) => {
  console.log("aca se actualiza")
  const user = request.user
  const body = request.body
  //const updatedDoc = User.productsOnCart.findByIdAndUpdate("660b69a9c7b3477117635aeb");
  //console.log(updatedDoc)
  //const userID = "6614620e031f441b99c1c6dd"
  const productID = request.params.id
  console.log(productID)
  const quantity = request.body.quantity
  const productChange = {
    id: body.id,
    quantity: body.quantity
  }
  //const user = await User.findById(request.params.id)
  console.log(request.params.id)
  console.log(user)
  //console.log(quantity)
  const productIndex = user.productsOnCart.findIndex(product => product.id === productID);
  console.log("aca va el producto a actualizar: ")
  console.log(productIndex)

  if(productIndex >= 0){
    user.productsOnCart[productIndex].quantity += productChange.quantity
  }
  console.log(user.productsOnCart[productIndex])
  const updateUser = await user.save()
  return response.status(200).json(productChange)
})

const deletingCart = (async (request, response) => {
  console.log("hola user")
  const user = request.user
  console.log(user)
  user.productsOnCart = []
  console.log(user)
  await user.save()
  return response.status(200).json(user)
})

const removeSingleProduct = (async (request, response) => {
  console.log("hola user")
  console.log("estoy removiendo productos")
  const user = request.user
  const productID = request.params.id
  console.log(user)
  user.productsOnCart = user.productsOnCart.filter(product => product.id !== productID)
  console.log(user)
  await user.save()
  return response.status(200).json(productID)
})

const increasingQuantityProduct = (async (request, response) => {
  console.log("aca se actualiza")
  const user = request.user

  const productID = request.params.id
  console.log(productID)
  
  //const user = await User.findById(request.params.id)
  console.log(request.params.id)
  console.log(user)
  //console.log(quantity)
  const productIndex = user.productsOnCart.findIndex(product => product.id === productID);
  console.log("aca va el producto a actualizar: ")
  console.log(productIndex)

  if(productIndex >= 0){
    user.productsOnCart[productIndex].quantity += 1
  }
  console.log(user.productsOnCart[productIndex])
  await user.save()
  return response.status(200).json(user.productsOnCart[productIndex])
})

const decreasingQuantityProduct = (async (request, response) => {
  console.log("aca se actualiza")
  const user = request.user

  const productID = request.params.id
  console.log(productID)
  
  //const user = await User.findById(request.params.id)
  console.log(request.params.id)
  console.log(user)
  //console.log(quantity)
  const productIndex = user.productsOnCart.findIndex(product => product.id === productID);
  console.log("aca va el producto a actualizar: ")
  console.log(productIndex)

  if(productIndex >= 0){
    user.productsOnCart[productIndex].quantity -= 1
  }
  console.log(user.productsOnCart[productIndex])
  await user.save()
  return response.status(200).json(user.productsOnCart[productIndex])
})

// const addingProducts =  async (req, res) => {
//     const body = req.body
//     const token = getTokenFrom(req)
//     const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
//     if (!token || !decodedToken.id) {
//         return res.status(401).json({ error: 'token missing or invalid' })
//     }
//     const user = await User.findById(decodedToken.id)

//     const product = new Product({
//         title: body.title,
//         description: body.description,
//         image: body.image,
//         color: body.color,
//         size: body.size,
//         material: body.material,
//         instructions: body.instructions,
//         price: body.price,
//         user: user._id
//     })

//     const savedProduct = await product.save()
//     user.products = user.products.concat(savedProduct._id)
//     await user.save()
    
//     res.json(savedProduct)
// }

const gettingUniqueProducts = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product); 
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

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
    updateProduct,
    addingProductsToCart,
    updatingProductsToCart,
    deletingCart,
    removeSingleProduct,
    increasingQuantityProduct,
    decreasingQuantityProduct
}