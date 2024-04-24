import express from 'express'
const router = express.Router()
import {
    getUser,
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile
} from '../controllers/userController.js'

router.get('/', getUser)
router.post('/', registerUser)
router.post('/auth', authUser)
router.post('/logout', logoutUser)
router.route('/profile').get(getUserProfile).put(updateUserProfile)
//router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)

export default router