import express from 'express'
import { addingProducts, addingProductsToCart, gettingProducts, gettingUniqueProducts, saveProducts, updateProduct } from '../controllers/productController.js'

const router = express.Router()

router.get('/', gettingProducts)
router.post('/add', addingProducts)
router.get('/product/:id', gettingUniqueProducts)
router.put('/saved', saveProducts)
router.put('/products/:id', updateProduct);
router.post('/adding', addingProductsToCart)


export default router