"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProducts = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function createProducts(name, price, description, banner, category_id) {
    const product = await prisma.product.create({
        data: {
            name: name,
            price: price,
            description: description,
            banner: banner,
            categoryId: category_id,
        }
    });
    return product;
}
exports.createProducts = createProducts;
//# sourceMappingURL=createProduct.js.map