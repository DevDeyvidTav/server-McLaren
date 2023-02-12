"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addAdress = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function addAdress(adress, order_id) {
    const order = await prisma.order.update({
        where: {
            id: order_id
        },
        data: {
            adress: adress
        }
    });
    return order;
}
exports.addAdress = addAdress;
//# sourceMappingURL=addAdress.js.map