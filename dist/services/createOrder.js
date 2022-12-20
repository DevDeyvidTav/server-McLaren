"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrder = void 0;
const client_1 = require("@prisma/client");
async function createOrder(name, adress) {
    const prisma = new client_1.PrismaClient();
    const order = await prisma.order.create({
        data: {
            name: name,
            adress: adress
        }
    });
    return order;
}
exports.createOrder = createOrder;
//# sourceMappingURL=createOrder.js.map