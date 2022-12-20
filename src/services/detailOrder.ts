import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function detailOrder(order_id: string) {
    const order = await prisma.item.findMany({
        where: {
            orderId: order_id
        },
        include: {
            Product: true,
            Order: true
        }
    });

    return order;
}