import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function deleteOrder(orderId: string){
    const order = await prisma.order.findUnique({ where: { id: orderId } });
    if(order){
        await prisma.order.delete({ where: { id: orderId } });
    }
}