import express from 'express'
import { addingProducts, gettingProducts, gettingUniqueProducts, saveProducts } from '../controllers/productController.js'
const router = express.Router()

router.get('/', gettingProducts)
router.post('/add', addingProducts)
router.get('/product/:id', gettingUniqueProducts)
router.put('/saved', saveProducts)


export default router