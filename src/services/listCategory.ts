import { PrismaClient } from "@prisma/client";

export async function listCategory(){
    const prisma = new PrismaClient();
    const category = prisma.category.findMany({
        select: {
            name: true,
            id: true
        }
    })
    return category
}