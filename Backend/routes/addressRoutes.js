import express from 'express'
import { saveAddress,getAddresses} from '../Controllers/addressController.js'
const router=express.Router()
router.post("/add",saveAddress)
router.get("/:userId",getAddresses)
export default router
