import asyncHandler from "express-async-handler"
import generateToken from "../utils/generateToken.js"
import User from "../models/userModel.js"
import jwt from 'jsonwebtoken'
import bcryptjs from 'bcryptjs'

//route POST /api/users
const getUser = async (req, res) => {
    const users = await User.find({}).populate('wishlist')
  
  res.json(users) 
}

//route POST /api/users/auth
const authUser = async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
        .populate('products')
        .populate('notifications')
        .populate({
            path: 'wishlist',
            populate: {
                path: 'products',
                model: 'Product'
            }
        })
    console.log(user)
    console.log(user.passwordHash)
    console.log(password)
    console.log(email)
    const passwordCorrect = user === null   
        ? false
        : await bcryptjs.compare(password, user.passwordHash)
    if (!(user && passwordCorrect)) {
        return res.status(401).json({
        error: 'invalid username or password'
        })
    }
    
    const userForToken = {
        name: user.name,
        id: user._id,
    }

    // token expires in 60*60 seconds, that is, in one hour
  const token = jwt.sign(
    userForToken, 
    process.env.SECRET,
    { expiresIn: 60*60 }
  )

  const decodedToken = jwt.decode(token);
  const expirationTimeMilliseconds = decodedToken.exp * 1000
  console.log(user.notifications)
  res
    .status(200)
    .send({ token, 
            expirationTimeMilliseconds, 
            name: user.name, 
            email: user.email, 
            productsOnCart: user.productsOnCart, 
            products: user.products,
            id: user._id,
            wishlist: user.wishlist,
            notifications: user.notifications
        })
  console.log(token)
}

//route POST /api/users

const registerUser = async (req, res) => {
    const body = req.body
    const saltRounds = 10
    const passwordHash = await bcryptjs.hash(body.passwordHash, saltRounds)
    if (body.email.length < 3 || body.passwordHash.length < 3) {
        return res.status(400).json({ error: 'Username or Password must be more than 3 characters' })
    }
    const user = new User({
        email: body.email,
        name: body.name,
        passwordHash
    })

    console.log(user.password)
    const savedUser = await user.save()
    res.json(savedUser)
}

//route POST /api/users/logout
// const logoutUser = asyncHandler(async (req, res) => {
//     res.cookie('jwt', '', {
//         httpOnly: true,
//         expires: new Date(0),
//     })
//     res.status(200).json({ message: 'Logout User'})
// })

//route GET /api/users/profile
const getUserProfile = asyncHandler(async (req, res) => {
    const user = {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email
    }
    res.status(200).json(user)
})

const updateProfile = async(req, res) => {
    const user = req.user
    console.log("hola update profile")
    console.log(user)
    if(user){
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email

        const saltRounds = 10

        if(req.body.password){
            user.passwordHash = await bcryptjs.hash(req.body.password, saltRounds)
        }
        console.log("aca va el token")

        const userForToken = {
            name: user.name,
            id: user.id,
        }
    
        // token expires in 60*60 seconds, that is, in one hour
        const token = jwt.sign(
            userForToken, 
            process.env.SECRET,
            { expiresIn: 60*60 }
        )
        
        const decodedToken = jwt.decode(token);
        const expirationTimeMilliseconds = decodedToken.exp * 1000
        
        
        const updatedUser = await user.save()
        console.log("aca entra el usuario actualizado")
        console.log(user)
        res.status(200).json({
            id: updatedUser.id, 
            name: updatedUser.name,
            email: updatedUser.email,
            //password: updatedUser.passwordHash,
            products: updatedUser.products,
            productsOnCart: updatedUser.productsOnCart,
            expirationTimeMilliseconds,
            token
        })
    }

}

//route PUT /api/users/profile
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    if(user){
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email

        if(req.body.password){
            user.password = req.body.password
        }
        
        const updatedUser = await user.save()

        res.status(200).json({
            _id: updatedUser._id, 
            name: updatedUser.name,
            email: updatedUser.email,
        })
    }else{
        res.status(404)
        throw new Error('User not found')
    }
})

export { 
    getUser,
    authUser,
    registerUser,
    getUserProfile,
    updateUserProfile,
    updateProfile
}