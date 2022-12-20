import { Request, Response } from "express";
import {PrismaClient} from "@prisma/client"
interface CategoryRequest{
    name: string;
}

export async function createCategory({name}: CategoryRequest){
    
    const prisma = new PrismaClient()
    if(name === ""){
        throw new Error("name invalid")
    }
    const category = await prisma.category.create({
        data: {
            name
        },
        select: {
            id: true,
            name: true
        }
    })
    return category

}