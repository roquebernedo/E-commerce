import express from 'express'
const router = express.Router()
import {
    getUser,
    authUser,
    registerUser,
    getUserProfile,
    updateUserProfile,
    updateProfile,
    verifyEmail,
    sendVerifyEmail,
    signinGoogle,
    emailToRetrievePassword,
    recoveringPassword,
    updateEmail,
    updateAvatar,
    addAndEditPhoneNumber,
    setAvatar
} from '../controllers/userController.js'
import { userExtractor } from '../middleware/authMiddleware.js'
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // carpeta donde se guardará
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // nombre único
  },
});

const upload = multer({ storage });
console.log("Aca esta el upload")
// console.log(upload)

router.get('/', getUser)
router.post('/', registerUser)
router.post('/auth', authUser)
router.post("/signinGoogle", signinGoogle);
//router.post('/logout', logoutUser)
router.put('/update', userExtractor, updateProfile)
router.put('/profile', userExtractor, updateUserProfile)
router.put("/verifyEmail", userExtractor, verifyEmail);
router.post("/sendVerifyEmail", userExtractor, sendVerifyEmail);
router.post("/retrievePassword", emailToRetrievePassword)
router.put("/recoverPassword", userExtractor, recoveringPassword)
router.put("/changingEmail", userExtractor, updateEmail)
router.put("/updateAvatar", upload.single("newAvatar"), userExtractor, updateAvatar)
router.put("/addPhoneNumber", userExtractor, addAndEditPhoneNumber)
router.post("/avatar", userExtractor, setAvatar)
//router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)

export default router