import express from 'express'
import { userExtractor } from '../middleware/authMiddleware.js';
import { addAddress, getAddress, removeAddress, setDefault, updateAddress } from '../controllers/addressController.js';

const router = express.Router()

router.get("/", userExtractor, getAddress)
router.post("/", userExtractor, addAddress)
router.put("/:id", userExtractor, updateAddress)
router.delete("/:id", userExtractor, removeAddress)
router.put("/default/:id", userExtractor, setDefault)

export default router