"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyOrderDraft = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function VerifyOrderDraft(user_id) {
    const orderDraft = await prisma.order.findFirst({
        where: {
            user_id: user_id,
            draft: true
        },
    });
    return orderDraft;
}
exports.VerifyOrderDraft = VerifyOrderDraft;
//# sourceMappingURL=vefifyOrderDraft.js.map