"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUser = void 0;
const client_1 = require("@prisma/client");
const bcryptjs_1 = require("bcryptjs");
const prisma = new client_1.PrismaClient();
async function CreateUser(name, email, password) {
    // verificar se ele enviou um email
    if (!email) {
        throw new Error("Email incorrect");
    }
    //Verificar se esse email já está cadastrado na plataforma
    const userAlreadyExists = await prisma.user.findFirst({
        where: {
            email: email
        }
    });
    if (userAlreadyExists) {
        throw new Error("User already exists");
    }
    const hashedPassword = await (0, bcryptjs_1.hash)(password, 8);
    const user = await prisma.user.create({
        data: {
            name: name,
            email: email,
            password: hashedPassword,
        },
        select: {
            id: true,
            name: true,
            email: true,
        }
    });
    return user;
}
exports.CreateUser = CreateUser;
//# sourceMappingURL=CreateUser.js.map