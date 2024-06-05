import express from 'express'
import { addToList, getUserList, getWishList, removeFavorite } from '../controllers/wishlistController.js'
const router = express.Router()
import { userExtractor } from '../middleware/authMiddleware.js'

router.get('/', userExtractor, getUserList)
router.get('/list', getWishList)
router.post('/:id', userExtractor, addToList)
router.delete('/remove/:id', userExtractor, removeFavorite)

export default router