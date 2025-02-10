import express from 'express'
const router = express.Router()
import {
    getUser,
    authUser,
    registerUser,
    getUserProfile,
    updateUserProfile,
    updateProfile
} from '../controllers/userController.js'
import { userExtractor } from '../middleware/authMiddleware.js'

router.get('/', getUser)
router.post('/', registerUser)
router.post('/auth', authUser)
//router.post('/logout', logoutUser)
router.put('/update', userExtractor, updateProfile)
router.put('/profile', userExtractor, updateUserProfile)
//router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)

export default router