import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();



export async function addItems(order_id: string, product_id: string, amount: number) {
    const order = await prisma.item.create({
        data: {
            orderId: order_id,
            productId: product_id,
            amount: amount
        }
    })
    return order;
}