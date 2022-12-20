"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addItems = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function addItems(order_id, product_id, amount) {
    const order = await prisma.item.create({
        data: {
            orderId: order_id,
            productId: product_id,
            amount: amount
        }
    });
    return order;
}
exports.addItems = addItems;
//# sourceMappingURL=addItems.js.map