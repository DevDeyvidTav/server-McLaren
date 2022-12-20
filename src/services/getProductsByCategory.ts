import { PrismaClient } from "@prisma/client";
export async function getProductsByCategory(category_id: string){
    const prisma = new PrismaClient();
    const products = await prisma.product.findMany({
        where:{
            categoryId: category_id
        }
    });
    return products;
}