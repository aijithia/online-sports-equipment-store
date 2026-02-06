import express from 'express'
import { Adminlogin,  Sellerlogin,  login } from '../controllers/auth.js'


const router= express.Router()


router.post('/Login', login)
router.post('/SellerLogin', Sellerlogin)
router.post('/AdminLogin', Adminlogin)


export default router
