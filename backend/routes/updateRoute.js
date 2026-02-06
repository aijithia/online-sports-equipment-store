import express from 'express'
import { updateUser } from '../controllers/editServices.js'
import { updateStatus } from '../controllers/update.js'

const router= express.Router()

router.put('/UpdateUser',updateUser)
router.put('/UpdateBookings',updateStatus)

export default router