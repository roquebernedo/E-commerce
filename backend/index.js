import express from "express"
import dotenv from 'dotenv'
import { notFound, errorHandler } from "./middleware/errorMiddleware.js"
import { userExtractor, tokenExtractor } from "./middleware/authMiddleware.js"
dotenv.config() 
import 'express-async-errors'
import userRoutes from './routes/userRoutes.js'
import productRoutes from './routes/productRoutes.js'
import cors from 'cors'
import stripeRoutes from "./routes/stripeRoutes.js"
import cookieParser from 'cookie-parser'
import connectDB from "./config/db.js"

const port = process.env.PORT
connectDB()

const app = express()

app.use(cors())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(tokenExtractor)
app.use("/api/stripe", stripeRoutes)
app.use(cookieParser())
app.use('/api/users', userRoutes)
app.use('/', productRoutes)

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))
