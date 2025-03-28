import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

// const protect = asyncHandler(async (req, res, next) => {
//     let token
//     token = req.cookies.jwt

//     if(token){
//         try{
//             const decoded = jwt.verify(token, process.env.JWT_SECRET)
//             req.user = await User.findById(decoded.userId).select('-password')
//             next()
//         }catch(error){
//             res.status(401)
//             throw new Error('Not authorized, invalid token')
//         }
//     }else{
//         res.status(401)
//         throw new Error('Not authorized, no token')
//     }
// })
  
  const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization');
    console.log("this is the authorization")
    console.log(authorization)
    if (authorization && authorization.startsWith('Bearer ')) {
      request.token = authorization.replace('Bearer ', '')
    }
    console.log("entri")
    console.log(request.token)
    next()
  }

  const userExtractor = async (request, response, next) => {
    console.log("este es el token, siguiente")
    
    console.log(request.token)
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    console.log("aqui va el token")
    console.log("aquisito")
    console.log(decodedToken)
    //console.log(decodedToken.user.id)
    if (!decodedToken.id) {
      console.log("aca entra")
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    // }else{
    //   request.user = await User.findById(decodedToken.id)
    //   next()
    // }

    // if(!decodedToken.user.id){
    //   return response.status(401).json({ error: 'token missing or invalid' })
    // }else{
    //   request.user = await User.findById(decodedToken.user.id)
    // }
    console.log("llego al request")
    request.user = await User.findById(decodedToken.id)
    console.log(request.user)
    next()
  }

export { userExtractor, tokenExtractor };