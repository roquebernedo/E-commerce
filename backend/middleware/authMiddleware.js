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
    
    next()
  }

  const userExtractor = async (request, response, next) => {
    console.log("este es el token, siguiente")
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    console.log("aqui va el token")
    console.log(decodedToken)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    request.user = await User.findById(decodedToken.id)
    next()
  }

export { userExtractor, tokenExtractor };