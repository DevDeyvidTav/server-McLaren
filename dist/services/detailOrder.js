"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.detailOrder = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function detailOrder(order_id) {
    const order = await prisma.item.findMany({
        where: {
            orderId: order_id
        },
        include: {
            Product: true,
            Order: true
        }
    });
    return order;
}
exports.detailOrder = detailOrder;
//# sourceMappingURL=detailOrder.js.map