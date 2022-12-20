"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrder = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function deleteOrder(orderId) {
    const order = await prisma.order.findUnique({ where: { id: orderId } });
    if (order) {
        await prisma.order.delete({ where: { id: orderId } });
    }
}
exports.deleteOrder = deleteOrder;
//# sourceMappingURL=deleteOrder.js.map