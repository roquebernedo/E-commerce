import express from 'express'
import { addingProducts, gettingProducts, gettingUniqueProducts, saveProducts, updateProduct } from '../controllers/productController.js'
import { userExtractor, tokenExtractor } from "../middleware/authMiddleware.js"

const router = express.Router()

router.get('/', gettingProducts)
router.post('/add', addingProducts)
router.get('/product/:id', gettingUniqueProducts)
router.put('/saved', saveProducts)
router.put('/products/:id', updateProduct);


export default router