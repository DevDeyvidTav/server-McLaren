import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function addOrderPrice(price: any, order_id: string){
    const order = await prisma.order.update({
        where: {
            id: order_id
        },
        data: {
            total_price: price,
        }
    })
    return order
}