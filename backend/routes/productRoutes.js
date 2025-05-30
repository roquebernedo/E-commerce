import express from 'express'
import { addingProducts, addingProductsDirstore, addingProductsToCart, cancelando, decreasingQuantityProduct, deletingCart, gettingProducts, gettingUniqueProducts, increasingQuantityProduct, removeSingleProduct, saveProducts, updateProduct, updatingProductsToCart } from '../controllers/productController.js'
import { tokenExtractor, userExtractor } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/', gettingProducts)
router.post('/add', userExtractor, addingProducts)
router.post('/addDirstore', addingProductsDirstore)
router.get('/product/:id', gettingUniqueProducts)
router.put('/saved', saveProducts)
router.put('/products/:id', updateProduct);
router.post('/adding', userExtractor, addingProductsToCart)
router.put('/update/:id', userExtractor, updatingProductsToCart)
router.put('/deleteCart', userExtractor, deletingCart)
router.put('/remove/:id', userExtractor, removeSingleProduct)
router.put('/increaseProduct/:id', userExtractor, increasingQuantityProduct)
router.put('/decreaseProduct/:id', userExtractor, decreasingQuantityProduct)
router.put('/cancelito', userExtractor, cancelando)

export default router