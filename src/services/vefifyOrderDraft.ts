import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function VerifyOrderDraft(user_id: string){
    const orderDraft = await prisma.order.findFirst({
        where: {
            user_id: user_id,
            draft: true
        },
    })
    return orderDraft
}