import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function deleteItem(item_id: string){
    const item = await prisma.item.delete({
        where: {
            id: item_id
        }
    });
    return item;
}