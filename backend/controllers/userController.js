import asyncHandler from "express-async-handler"
import generateToken from "../utils/generateToken.js"
import User from "../models/userModel.js"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

//route POST /api/users/auth
const getUser = async (req, res) => {
    const users = await User.find({}).populate('productsOnCart')
  
  res.json(users) 
}

const authUser = async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email }).populate('productsOnCart')
    console.log(user)
    console.log(user.passwordHash)
    console.log(password)
    console.log(email)
    const passwordCorrect = user === null   
        ? false
        : await bcrypt.compare(password, user.passwordHash)
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
    process.env.JWT_SECRET,
    { expiresIn: 60*60 }
  )

  res
    .status(200)
    .send({ token, name: user.name, email: user.email, productsOnCart: user.productsOnCart })
  console.log(token)
}

//route POST /api/users

const registerUser = async (req, res) => {
    const body = req.body
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.passwordHash, saltRounds)
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
const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    })
    res.status(200).json({ message: 'Logout User'})
})

//route GET /api/users/profile
const getUserProfile = asyncHandler(async (req, res) => {
    const user = {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email
    }
    res.status(200).json(user)
})

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
    logoutUser,
    getUserProfile,
    updateUserProfile
}