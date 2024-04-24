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

const port = process.env.PORT || 5000
connectDB()

const app = express()

const allowedOrigins = ['https://main--ecommerce-rq.netlify.app', 'http://localhost:3000']; // Asegúrate de incluir aquí todos tus orígenes permitidos

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(tokenExtractor)
app.use("/api/stripe", stripeRoutes)
app.use(cookieParser())
app.use('/api/users', userRoutes)
app.use('/', productRoutes)

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))
