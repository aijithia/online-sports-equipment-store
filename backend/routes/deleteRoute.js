import express from "express";
import {  deleteProduct, deleteSeller, deleteUser } from "../controllers/deleteServices.js";

const router=express.Router();

router.delete('/deleteUser/:id', deleteUser)
router.delete('/deleteSeller/:id', deleteSeller)
router.delete('/deleteProduct/:id', deleteProduct)

export default router