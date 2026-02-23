import { Request, Response } from "express"
import sendResponse from "../../utils/sendResponse"
import { MedicineService } from "./medicine.service"

const createMedicine = async (req: Request, res: Response) => {
    try {
        console.log("Hello from medicine controller")

        const result = await MedicineService.createMedicineIntoDB(
            req.body,
            req.user?.id
        )

        console.log("RESULT FROM MEDICINE CONTROLLER", result)

        sendResponse(res, {
            statusCode: 201,
            success: true,
            message: "Medicine Added",
            data: result,
        })
    } catch (error) {
        sendResponse(res, {
            statusCode: 400,
            success: false,
            message: "Something went wrong",
            data: error,
        })
    }
}

export const MedicineController = {
    createMedicine,
}
