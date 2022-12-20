import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function finishOrder(order_id: string){
    const order = await prisma.order.update({
        where:{
            id: order_id
        },
        data: {
            status: true
        }
    })
    return order
}