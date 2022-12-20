"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listCategory = void 0;
const client_1 = require("@prisma/client");
async function listCategory() {
    const prisma = new client_1.PrismaClient();
    const category = prisma.category.findMany({
        select: {
            name: true,
            id: true
        }
    });
    return category;
}
exports.listCategory = listCategory;
//# sourceMappingURL=listCategory.js.map