import asyncHandler from "express-async-handler"
import User from "../models/userModel.js"
import jwt from 'jsonwebtoken'
import bcryptjs from 'bcryptjs'
import { sendEmail } from "../utils/sendEmail.js"
import dotenv from 'dotenv'
dotenv.config() 

//route POST /api/users
const getUser = async (req, res) => {
  const users = await User.find({}).populate('wishlist')
  res.json(users) 
}

//route POST /api/users/auth
const authUser = async (req, res, next) => {
    try{
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
            .populate('addresses')
            .populate('orders')
            .populate('sales')
        console.log("no llega")
        //console.log(user)
        // console.log(user.passwordHash)
        console.log(password)
        console.log(email)

        if(!user){
            return res.status(401).json({
                error: 'this user doesnt exist'
            })
        }
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
        console.log(user.addresses)
        res
            .status(200)
            .send({ token, 
                    expirationTimeMilliseconds, 
                    name: user.name, 
                    email: user.email, 
                    username: user.username,
                    productsOnCart: user.productsOnCart, 
                    products: user.products,
                    id: user._id,
                    wishlist: user.wishlist,
                    notifications: user.notifications,
                    addresses: user.addresses,
                    orders: user.orders,
                    sales: user.sales,
                    emailVerified: user.emailVerified
                })
        console.log(token)
    } catch(error){
        next(error)
    }
}

const signinGoogle = async (req, res, next) => {   
    console.log("Esta es la vencida :v")
    const { sub, email, firstName, lastName } = req.body;
    //const body = req.body
    console.log(sub)
    console.log(email)
    try {
      const userFound = await User.findOne({ email: sub })
            .populate('products')
            .populate('notifications')
            .populate({
                path: 'wishlist',
                populate: {
                    path: 'products',
                    model: 'Product'
                }
            })
            .populate('addresses')
            .populate('orders')
            .populate('sales')
      console.log(userFound)
      console.log("entro aca")
      
      if (!userFound) {
        const newGoogleUser = await User.create({
          email: sub,
          password: sub,
          googleEmail: email,
          emailVerified: true,
          firstName,
          lastName,
          username: firstName || email.split("@")[0],
          isGoogleUser: true,
        });
        console.log(newGoogleUser)
        console.log("entre is")
        const userForToken = {
            name: newGoogleUser.firstName,
            id: newGoogleUser._id,
        }
        console.log("paso?")
        // token expires in 60*60 seconds, that is, in one hour
        const token = jwt.sign(
            userForToken, 
            process.env.SECRET,
            { expiresIn: 60*60 }
        )
        console.log(token)
        const tokenGoogleUser = newGoogleUser.toObject()
        tokenGoogleUser.token = token
        console.log("aca pe el tokensito")
        console.log(tokenGoogleUser)
        console.log(newGoogleUser)
        return res.json(tokenGoogleUser);
      } else {
        // if (userFound.role === "banned")
        //   return res.json({ message: "Cuenta suspendida", error: true });
        const userForToken = {
            name: userFound.firstName,
            id: userFound._id,
        }
        console.log("paso?")
        // token expires in 60*60 seconds, that is, in one hour
        const token = jwt.sign(
            userForToken, 
            process.env.SECRET,
            { expiresIn: 60*60 }
        )
        console.log(token)
        const tokenGoogleUser = userFound.toObject()
        tokenGoogleUser.token = token
        return res.json(tokenGoogleUser);
        console.log("entra aca x2")
      }
    } catch (error) {
      console.log("aca tamos p")
      next(error);
    }
};

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
        passwordHash,
        username: body.email.split("@")[0],
        isGoogleUser: false
    })

    let id, email

    id = user._id
    email = user.email

    const bodyToken = { id, email }
    console.log("Esto es bodytoken: ", bodyToken)
    console.log(user)
    console.log("Aca esta el verifytoken")
    const verifyToken = jwt.sign( bodyToken, process.env.SECRET)
    console.log(verifyToken)
    const link = `http://localhost:3000/verify/${verifyToken}`;
    console.log(link)

    await sendEmail(
        body.email,
        `${user ? "Bienvenida" : "Verificación de email"}`,
        `./templates/${user ? "signup" : "verifyEmail"}.html`,
        { link }
    );
    console.log("se llego aca al user.pas")
    console.log(user.password)
    const savedUser = await user.save()
    res.json(savedUser)
}

const sendVerifyEmail = async (req, res) => {
    console.log("ba")
    const user = req.user
    console.log("sending")
    let id, email

    id = user._id
    email = user.email

    const bodyToken = { id, email }
    console.log("Esto es bodytoken: ", bodyToken)
    console.log(user)
    console.log("Aca esta el verifytoken")
    const verifyToken = jwt.sign(bodyToken, process.env.SECRET)
    console.log(verifyToken)
    const link = `http://localhost:3000/verify/${verifyToken}`;
    console.log(link)

    await sendEmail(
        user.email,
        `${user ? "Bienvenida" : "Verificación de email"}`,
        `./templates/${user ? "signup" : "verifyEmail"}.html`,
        { link }
    );
    console.log("entra")
    //console.log(user.password)
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

const updateProfile = async(req, res, next) => {
    try{
        console.log("usercin")
        const user = req.user
        if(user.isGoogleUser){
            const { firstName, username } = req.body
            const userFound = await User.findById(user._id)
            userFound.firstName = firstName || userFound.firstName
            userFound.username = username || userFound.username

            console.log("hola")
            await userFound.save()
            console.log("holax3")
            return res.json({
                message: "Editado con exito",
                user: {
                    firstName: userFound.firstName,
                    username: userFound.username
                }
            })
        }else{
            const { name, username } = req.body

            console.log("1er console")
            console.log(user)
            const userFound = await User.findById(user._id)
            console.log(userFound)

            userFound.name = name || userFound.name
            userFound.username = username || userFound.username

            console.log("hola")
            await userFound.save()
            console.log("holax3")
            return res.json({
                message: "Editado con exito",
                user: {
                    name: userFound.name,
                    username: userFound.username
                }
            })
        }
    } catch(error){
        next(error)
    }
}

//route PUT /api/users/profile
const updateUserProfile = async (req, res) => {
    console.log("Esta en este update")
    const user = req.user
    
        const { oldPassword, newPassword } = req.body
        console.log(user)
        console.log(oldPassword)
        console.log(newPassword)
        
        const validity = await user.comparePassword(oldPassword)
        console.log(validity)
        console.log("aca esta validity")
        const passwordHash = await bcryptjs.hash(newPassword, 10)
        if (!validity) return res.json({ message: "Contraseña incorrecta", error: true });
        user.passwordHash = passwordHash
        await user.save()
            // console.log(passwordCorrect)
            // console.log(user.passwordHash)
            // if(passwordCorrect){
            //     return res.json({ message: "Has tenido exito!."})
            // }
        //console.log(passwordCorrect)
        console.log(user.passwordHash)
            // return res.json({ message: "Passwords no coinciden."})
    
        // if(req.body.passwordHash){
        //     console.log("entro aca")
        //     console.log(req.body.passwordHash)
        //     const newPasswordHash = await bcryptjs.hash(req.body.passwordHash, 10)
        //     user.passwordHash = newPasswordHash
        // }
        
        await user.save()

        res.status(200).json({
            id: user._id, 
            name: user.name,
            email: user.email,
            passwordHash: user.passwordHash
        })
}

const verifyEmail = async (req, res, next) => {
    console.log("entonces aca 3ra XD")
    const { _id } = req.user;
    console.log(_id)
    console.log(req.user)
    if (!_id) return res.status(401).send({ message: "ID de cuenta no enviado" });
  
    try {
      const userFound = await User.findById(_id);
  
      if (!userFound)
        return res.status(404).json({ message: "Cuenta no encontrada" });
  
      userFound.emailVerified = true;
      await userFound.save();
        console.log(userFound)
      return res.json({ message: "Email verificado con éxito" });
    } catch (error) {
      next(error);
    }
};

export { 
    getUser,
    authUser,
    registerUser,
    getUserProfile,
    updateUserProfile,
    updateProfile,
    verifyEmail,
    sendVerifyEmail,
    signinGoogle
}