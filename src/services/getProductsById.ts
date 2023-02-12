import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function getProductsById(product_id: string){
    const product = await prisma.product.findFirst({
        where: {
            id: product_id
        },
        select:{
            name: true,
            price: true,
            description: true,
            id: true,
        }
    })
    return product
}