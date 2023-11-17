import express from "express"
import dotenv from 'dotenv'
import { notFound, errorHandler } from "./middleware/errorMiddleware.js"
dotenv.config()
import userRoutes from './routes/userRoutes.js'
import productRoutes from './routes/productRoutes.js'
import cors from 'cors'
import stripeRoutes from "./routes/stripeRoutes.js"
import cookieParser from 'cookie-parser'
import connectDB from "./config/db.js"

const port = process.env.PORT || 5000
connectDB()

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use("/api/stripe", stripeRoutes)
app.use(cookieParser())
app.use('/api/users', userRoutes)
app.use('/', productRoutes)

app.listen(port, () => console.log(`Server started on port ${port}`))
