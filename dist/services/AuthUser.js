"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUser = void 0;
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = require("jsonwebtoken");
const bcryptjs_1 = require("bcryptjs");
const prisma = new client_1.PrismaClient();
async function AuthUser(email, password) {
    //Verificar se o email existe.
    const user = await prisma.user.findFirst({
        where: {
            email: email
        }
    });
    if (!user) {
        throw new Error("User/password incorrect");
    }
    // preciso verificar se a senha que ele mandou está correta.
    const passwordMatch = await (0, bcryptjs_1.compare)(password, user.password);
    if (!passwordMatch) {
        throw new Error("User/password incorrect");
    }
    // gerar um token JWT e devolver os dados do usario como id, name e email
    const token = (0, jsonwebtoken_1.sign)({
        name: user.name,
        email: user.email
    }, process.env.Secret_JWT, {
        subject: user.id,
        expiresIn: "30d"
    });
    return {
        name: user.name,
        email: user.email,
        id: user.id,
        token: token
    };
}
exports.AuthUser = AuthUser;
//# sourceMappingURL=AuthUser.js.map