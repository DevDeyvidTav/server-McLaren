"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.finishOrder = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function finishOrder(order_id) {
    const order = await prisma.order.update({
        where: {
            id: order_id
        },
        data: {
            status: true
        }
    });
    return order;
}
exports.finishOrder = finishOrder;
//# sourceMappingURL=finishOrder.js.map