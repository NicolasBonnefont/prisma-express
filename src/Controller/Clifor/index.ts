import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'

const prisma = new PrismaClient()

export class Clifor {
  public static async ListarClientes(req: Request, res: Response) {
    try {

      const usuarios = await prisma.clifor.findMany()

      return res.json(usuarios)

    } catch (error) {

      return res.status(500).json(error)
    }
    
    finally {
      await prisma.$disconnect()
    }

  }
}


export default Clifor