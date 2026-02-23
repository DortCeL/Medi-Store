import { prisma } from "../../lib/prisma"
import { CreateMedicineDTO } from "../../types/types"

const createMedicineIntoDB = async (
    payload: CreateMedicineDTO,
    userId: string
) => {
    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
    })

    console.log("user found in medicine Service", user)

    if (!user) {
        throw new Error("Invalid user")
    }

    const { name, description, price, stock, manufacturer } = payload

    // ! image ta schema te default "" dewa hoise
    const result = await prisma.medicine.create({
        data: {
            name,
            description,
            price,
            stock,
            sellerId: userId,
            manufacturer,
        },
    })

    console.log("Medicine created from medicine service", result)

    return result
}

export const MedicineService = {
    createMedicineIntoDB,
}
