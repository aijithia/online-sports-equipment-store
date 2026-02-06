import express from 'express'
import { addusers, addBooking, addSeller, addRating, } from '../controllers/addServices.js'


const router= express.Router()


router.post('/addusers', addusers)
router.post('/addBooking', addBooking)
router.post('/addSeller', addSeller)
router.post('/addRating', addRating)


export default router

