import { PrismaClient } from "@prisma/client";

export async function createOrder(name: string, adress: string){
    const prisma = new PrismaClient()
    const order = await prisma.order.create({
        data: {
            name: name,
            adress: adress
        }
    })
    return order
}