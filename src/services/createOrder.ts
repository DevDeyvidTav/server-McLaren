import { PrismaClient } from "@prisma/client";

export async function createOrder(name: string, phone: string, user_id: string){
    const prisma = new PrismaClient()
    const order = await prisma.order.create({
        data: {
            name: name,
            phone: phone,
            user_id: user_id
        }
    })
    return order
}