export enum UserRole {
    admin = "ADMIN",
    customer = "CUSTOMER",
    seller = "SELLER",
}

export enum UserStatus {
    active = "ACTIVE",
    suspended = "SUSPENDED",
}

export type CreateMedicineDTO = {
    name: string
    description: string
    price: number
    stock: number
    sellerId: string
    manufacturer: string
    image?: string
}
