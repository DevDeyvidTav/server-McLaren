import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export async function createProducts(
    name:string,
    price:string,
    description:string,
    category_id:string) {


        const product = await prisma.product.create({
            data:{
                name: name,
                price: price,
                description: description,
                categoryId: category_id,
            }
        })
          

          return product
        
}