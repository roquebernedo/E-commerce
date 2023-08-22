import express from "express"
import mysql from "mysql"
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

// app.get('/', (req, res) => res.send('Server is ready gaaa'))
// app.get('/ga', (req, res) => res.send('Server is ready gaaa'))

// app.get('/ge', (req, res) => {
//     res.json("Hello este es el backend webonazo")
// })

app.listen(port, () => console.log(`Server started on port ${port}`))

//const db = mysql.createConnection({
    //     host: "localhost",
    //     user: "root",
    //     password: "gunbonud123",
    //     database: "commerce"
    // })
    
    // app.get('/products', (req, res) => {
        
    //     const q = "SELECT * FROM producto"
    //     db.query(q, (err, data) => {
    //         if(err) return res.json(err)
    //         return res.json(data) 
    //     })
        
        
    // })
    
    // app.get('/products/:id', (req, res) => {
    //     const productId = req.params.id;
    //     const q = "SELECT * FROM producto WHERE id = ?";
      
    //     db.query(q, [productId], (err, data) => {
    //       if (err) return res.json(err);
      
    //       if (data.length === 0) {
    //         return res.status(404).json({ error: 'Product not found' });
    //       }
      
    //       return res.json(data[0]);
    //     });
    // });
    
    // app.get('/product/:id', (req, res) => {
    //     const productId = req.params.id;
    //     const q = "SELECT * FROM producto WHERE id = ?";
      
    //     db.query(q, [productId], (err, data) => {
    //       if (err) return res.json(err);
      
    //       if (data.length === 0) {
    //         return res.status(404).json({ error: 'Product not found' });
    //       }
      
    //       return res.json(data[0]);
    //     });
    // });
    
    // app.post('/products', (req, res) => {
    //     const q = "INSERT INTO producto (`title`, `description`, `image`, `color`, `size`, `material`, `instructions`, `price`) VALUES (?)"
    //     const values = [
    //         req.body.title,
    //         req.body.description,
    //         req.body.image, 
    //         req.body.color,
    //         req.body.size,
    //         req.body.material,
    //         req.body.instructions,
    //         req.body.price,
    //     ]
    
    //     db.query(q, [values], (err, data) => {
    //         if(err) return res.json(err)
    //         return res.json("Product has been created successfully.")
    //     })
    // })
    
    // app.delete("/products/:id", (req,res) =>{
    //     const productId = req.params.id
    //     const q = "DELETE FROM producto WHERE id = ?"
    
    //     db.query(q,[productId], (err,data)=>{
    //         if(err) return res.json(err)
    //         return res.json("Product has been deleted")
    //     })
    // })
    
    // app.put("/products/:id", (req,res) =>{
    //     const productId = req.params.id
    //     const q = "UPDATE producto SET `title`= ?, `description` = ?, `image` = ?, `color` = ?, `size` = ?, `material` = ?, `instructions` = ?, `price` = ? WHERE id = ?"
    
    //     const values = [
    //         req.body.title,
    //         req.body.description,
    //         req.body.image, 
    //         req.body.color,
    //         req.body.size,
    //         req.body.material,
    //         req.body.instructions,
    //         req.body.price,
    //     ]
    
    //     db.query(q, [...values,productId], (err,data)=>{
    //         if(err) return res.json(err)
    //         return res.json("Product has been updated")
    //     })
    // })