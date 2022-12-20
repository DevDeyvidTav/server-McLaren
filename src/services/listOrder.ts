import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function listOrder(){
    const orders = await prisma.order.findMany({
        where: {
            draft: false,
            status: false,
        },
        orderBy:{
            create_at: 'desc'
        }
    })
    return orders;
}