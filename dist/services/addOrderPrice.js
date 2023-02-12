"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addOrderPrice = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function addOrderPrice(price, order_id) {
    const order = await prisma.order.update({
        where: {
            id: order_id
        },
        data: {
            total_price: price,
        }
    });
    return order;
}
exports.addOrderPrice = addOrderPrice;
//# sourceMappingURL=addOrderPrice.js.map