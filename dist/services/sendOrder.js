"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendOrder = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function sendOrder(order_id) {
    const order = await prisma.order.update({
        where: {
            id: order_id
        },
        data: {
            draft: false
        }
    });
}
exports.sendOrder = sendOrder;
//# sourceMappingURL=sendOrder.js.map