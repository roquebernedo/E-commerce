import express from 'express'


const router = express.Router()

router.get("/", getSales);

export default router