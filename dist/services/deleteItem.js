"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteItem = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function deleteItem(item_id) {
    const item = await prisma.item.delete({
        where: {
            id: item_id
        }
    });
    return item;
}
exports.deleteItem = deleteItem;
//# sourceMappingURL=deleteItem.js.map