import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

const protect = asyncHandler(async (req, res, next) => {
    let token
    token = req.cookies.jwt

    if(token){
        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.userId).select('-password')
            next()
        }catch(error){
            res.status(401)
            throw new Error('Not authorized, invalid token')
        }
    }else{
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})

const userExtractor = async (request, response, next) => {
  
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    console.log(decodedToken)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }else{
      const user = await User.findById(decodedToken.id)
      request.user = user
    }
  
    next()
  }
  
  const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization');
    
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      request.token = authorization.substring(7);
    }
    
    next()
  }

export { protect, userExtractor, tokenExtractor };