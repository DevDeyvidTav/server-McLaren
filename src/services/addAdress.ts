import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function addAdress(adress: string, order_id: string){
    const order = await prisma.order.update({
        where: {
            id: order_id
        },
        data: {
            adress: adress
        }
    })
    return order
}