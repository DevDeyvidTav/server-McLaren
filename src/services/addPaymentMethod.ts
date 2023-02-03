import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function addPaymentMethod(method: string, order_id: string){
    const order = await prisma.order.update({
        where: {
            id: order_id
        },
        data: {
            payment_method: method
        }
    })
    return order
}