import express from 'express'

const router = express.Router()
import { userExtractor } from '../middleware/authMiddleware.js'
import { deleteNotification, getUserNotifications, gettingNotifications, gettingUniqueNotification, markAsSeen } from '../controllers/notificationController.js'

router.get('/', userExtractor, getUserNotifications)
router.delete('/:id', userExtractor, deleteNotification)
router.put('/:id', userExtractor, markAsSeen)
router.get('/unique/:id', userExtractor, gettingUniqueNotification)
router.get('/setNotis/notification', gettingNotifications)

export default router