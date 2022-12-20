import {Request, Response} from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
export async function DetailUser(user_id: string){
    const user = await prisma.user.findFirst({
        where:{
            id: user_id
        },
        select: {
            id: true,
            name: true,
            email: true,
        }
    })
    return user
}