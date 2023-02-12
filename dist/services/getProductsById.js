"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductsById = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function getProductsById(product_id) {
    const product = await prisma.product.findFirst({
        where: {
            id: product_id
        },
        select: {
            name: true,
            price: true,
            description: true,
            id: true,
        }
    });
    return product;
}
exports.getProductsById = getProductsById;
//# sourceMappingURL=getProductsById.js.map