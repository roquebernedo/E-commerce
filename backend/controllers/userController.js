import asyncHandler from "express-async-handler"
import generateToken from "../utils/generateToken.js"
import User from "../models/userModel.js"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

//@desc Auth user/set token
//route POST /api/users/auth
//@access Public

const getUser = async (req, res) => {
    const users = await User.find({}).populate('products', { title: 1, description: 1 })
  
  res.json(users) 
}

const authUser = async (req, res) => {
    const body = req.body
    console.log(body.password)
    const user = await User.findOne({ email: body.email })
    console.log(user.passwordHash)
    console.log("hola")
    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(body.password, user.passwordHash)
    console.log(passwordCorrect)
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
    .send({ token, name: user.name, email: user.email })
  console.log(token)
}

//@desc Register a new user
//route POST /api/users
//@access Public
const registerUser = async (req, res) => {
    // const { name, email, password } = req.body

    // const userExists = await User.findOne({ email })

    // if(userExists){
    //     res.status(400).json({ message: "User already exists" })
    //     return
    // }

    // const user = await User.create({
    //     name,
    //     email,
    //     password
    // })

    // if(user){
    //     generateToken(res, user._id)
    //     res.status(201).json({
    //         _id: user._id,
    //         name: user.name,
    //         email: user.email
    //     })
    // }else{
    //     res.status(400).json({ message: "Invalid user data" })
    // }
    
    const body = req.body
    console.log(body.passwordHash)
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.passwordHash, saltRounds)
    console.log(passwordHash)
    console.log("hola")
    console.log(body.email)
    if (body.email.length < 3 || body.passwordHash.length < 3) {
        return res.status(400).json({ error: 'Username or Password must be more than 3 characters' })
    }
    console.log("hola")
    const user = new User({
        email: body.email,
        name: body.name,
        passwordHash: passwordHash
    })

    console.log(user.password)

    const savedUser = await user.save()

    res.json(savedUser)
}

//@desc Logout user
//route POST /api/users/logout
//@access Public
const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    })

    res.status(200).json({ message: 'Logout User'})
})

//@desc Get user profile
//route GET /api/users/profile
//@access Private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email
    }

    res.status(200).json(user)
})

//@desc Update user profile
//route PUT /api/users/profile
//@access Private
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