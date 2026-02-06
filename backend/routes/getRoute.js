import express from 'express'
import {getAllproducts, getBookedServices, getBookings, getInvoicesByCustomerID, getRatings, getSeller, getUsers } from '../controllers/getServices.js'


const router= express.Router()

router.post('/getUsers', getUsers)
router.get('/getSeller', getSeller)
router.get('/getAllproducts', getAllproducts)
router.get('/getBookings', getBookings)
router.get('/getBookedServices', getBookedServices)
router.post('/getCustomerBooking', getInvoicesByCustomerID)
router.get('/getRatings', getRatings)

export default router