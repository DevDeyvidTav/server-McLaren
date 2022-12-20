import {PrismaClient} from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient()
interface UserRequest{
    name: string;
    email: string;
    password: string;
  }

export async function CreateUser(name: any, email: any, password: any) {
        // verificar se ele enviou um email
        if(!email){
            throw new Error("Email incorrect")
          }
      
          //Verificar se esse email já está cadastrado na plataforma
          const userAlreadyExists = await prisma.user.findFirst({
            where:{
              email: email
            }
          })
      
          if(userAlreadyExists){
            throw new Error("User already exists")
          }
          const hashedPassword = await hash(password, 8)
          
          
          const user = await prisma.user.create({
            data:{
              name: name,
              email: email,
              password: hashedPassword,
            },
            select:{
              id: true,
              name: true,       
              email: true,
            }
          })
      
      
          return user;
        }    

