import express from "express"
import { MedicineController } from "./medicine.controller"
import auth from "../../middlewares/auth"
import { UserRole } from "../../types/types"

const router = express.Router()

router.post(
    "/",
    auth(UserRole.admin, UserRole.seller),
    MedicineController.createMedicine
)

export const MedicineRoutes = router
