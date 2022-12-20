import { PrismaClient } from "@prisma/client";
import  {sign} from "jsonwebtoken"
import { compare } from 'bcryptjs'

const prisma = new PrismaClient();

export async function AuthUser(email: string, password: string) {
    //Verificar se o email existe.
    const user = await prisma.user.findFirst({
        where:{
          email: email
        }
      })
  
      if(!user){
        throw new Error("User/password incorrect")
      }
  
      // preciso verificar se a senha que ele mandou está correta.
      const passwordMatch = await compare(password, user.password)
  
      if(!passwordMatch){
        throw new Error("User/password incorrect")
      }
  
  
      // gerar um token JWT e devolver os dados do usario como id, name e email
      const token = sign(
        {
          name: user.name,
          email: user.email
        },
        process.env.Secret_JWT,
        {
          subject: user.id,
          expiresIn: "30d"
        }
      )
      return {
        name: user.name,
        email: user.email,
        id: user.id,
        token: token
      }
}
  