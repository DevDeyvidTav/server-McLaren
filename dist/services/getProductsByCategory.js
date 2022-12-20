"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductsByCategory = void 0;
const client_1 = require("@prisma/client");
async function getProductsByCategory(category_id) {
    const prisma = new client_1.PrismaClient();
    const products = await prisma.product.findMany({
        where: {
            categoryId: category_id
        }
    });
    return products;
}
exports.getProductsByCategory = getProductsByCategory;
//# sourceMappingURL=getProductsByCategory.js.map