"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetailUser = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function DetailUser(user_id) {
    const user = await prisma.user.findFirst({
        where: {
            id: user_id
        },
        select: {
            id: true,
            name: true,
            email: true,
        }
    });
    return user;
}
exports.DetailUser = DetailUser;
//# sourceMappingURL=DetailUser.js.map