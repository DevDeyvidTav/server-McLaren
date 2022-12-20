"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCategory = void 0;
const client_1 = require("@prisma/client");
async function createCategory({ name }) {
    const prisma = new client_1.PrismaClient();
    if (name === "") {
        throw new Error("name invalid");
    }
    const category = await prisma.category.create({
        data: {
            name
        },
        select: {
            id: true,
            name: true
        }
    });
    return category;
}
exports.createCategory = createCategory;
//# sourceMappingURL=createCategory.js.map