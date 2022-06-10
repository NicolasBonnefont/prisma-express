import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';

const prisma = new PrismaClient()

async function seed() {
  bcrypt.hash('123456', 5, async (error, hash) => {

    if (hash) {
      await prisma.usuarios.create({
        data: {
          email: "nicolas@morinfo.com.br",
          nome: "Nicolas Bonnefont",
          senha: hash,
          usuario: "nicolas"
        }
      })
        .then(() => {
          console.log('seed ok !')
        })
        .catch(error => {
          console.log(error)
        })
    }
  })
}

seed()