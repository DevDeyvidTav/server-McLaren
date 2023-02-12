"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addPaymentMethod = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function addPaymentMethod(method, order_id) {
    const order = await prisma.order.update({
        where: {
            id: order_id
        },
        data: {
            payment_method: method
        }
    });
    return order;
}
exports.addPaymentMethod = addPaymentMethod;
//# sourceMappingURL=addPaymentMethod.js.map