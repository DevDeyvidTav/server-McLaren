"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listOrder = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function listOrder() {
    const orders = await prisma.order.findMany({
        where: {
            draft: false,
            status: false,
        },
        orderBy: {
            create_at: 'desc'
        }
    });
    return orders;
}
exports.listOrder = listOrder;
//# sourceMappingURL=listOrder.js.map