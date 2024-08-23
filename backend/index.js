import express from "express"
import dotenv from 'dotenv'
import { notFound, errorHandler } from "./middleware/errorMiddleware.js"
import { userExtractor, tokenExtractor } from "./middleware/authMiddleware.js"
dotenv.config() 
import 'express-async-errors'
import userRoutes from './routes/userRoutes.js'
import productRoutes from './routes/productRoutes.js'
import wishlistRoutes from './routes/wishlistRoutes.js'
import notificationRoutes from './routes/notificationRoutes.js'
import cors from 'cors'
import stripeRoutes from "./routes/stripeRoutes.js"
import cookieParser from 'cookie-parser'
import connectDB from "./config/db.js"

const port = process.env.PORT
connectDB()

const app = express()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// app.use(function(req, res, next) {
//     // res.header("Access-Control-Allow-Origin", "*");
//     const allowedOrigins = ['http://localhost:3000', 'https://main--ecommerce-rq.netlify.app/'];
//     const origin = req.headers.origin;
//     if (allowedOrigins.includes(origin)) {
//          res.setHeader('Access-Control-Allow-Origin', origin);
//     }
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//     res.header("Access-Control-Allow-credentials", true);
//     res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE");
//     next();
//   });

app.use(tokenExtractor)
app.use(cookieParser())
app.use('/api/users', userRoutes)
app.use('/', productRoutes)
app.use('/api/wishlist', wishlistRoutes)
app.use('/api/noti', notificationRoutes)
app.use('/api/stripe', stripeRoutes)

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))
