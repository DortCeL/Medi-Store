import { NextFunction, Request, Response } from "express"
import jwt, { JwtPayload } from "jsonwebtoken"
import { prisma } from "../lib/prisma"
import { UserRole } from "../types/types"

const auth = (...roles: UserRole[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            // does token exist
            // verify token
            // does decoded user exist
            // is user status active
            // check role

            const authHeader = req.headers.authorization

            if (!authHeader || !authHeader.startsWith("Bearer ")) {
                throw new Error("Invalid token")
            }

            const token = authHeader.split(" ")[1]
            const decoded = jwt.verify(token, "secret-123") as JwtPayload
            console.log("decoded from auth.ts middleware", decoded)

            const userData = await prisma.user.findUnique({
                where: {
                    email: decoded.email,
                },
            })
            if (!userData) throw new Error("could not find user!")

            if (userData.status !== "ACTIVE") {
                throw new Error("Sorry, your account is suspended!!!")
            }

            if (roles.length && !roles.includes(decoded.role))
                throw new Error("Unauthorized!")

            req.user = decoded

            next()
        } catch (error: any) {
            throw new Error(error.message)
        }
    }
}

export default auth
