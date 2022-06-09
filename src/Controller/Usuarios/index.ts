import { PrismaClient, Prisma } from '@prisma/client'
import { Request, Response } from 'express'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export class Usuarios {
  public static async listarUsuario(req: Request, res: Response) {
    try {

      const usuarios = await prisma.usuario.findMany()

      return res.json(usuarios)

    } catch (error) {

      return res.status(500).json(error)
    }

    finally {
      await prisma.$disconnect()
    }

  }

  public static async criarUsuario(req: Request, res: Response) {
    try {

      let dados = req.body

      if (dados.senha == '' || dados.nome == '') {
        return res.status(400).send({
          Mensagem: 'Informar todos os dados !'
        })
      }
      // criptografa a senha do usuário
      bcrypt.hash(dados.senha, 5, async (error, hash) => {

        if (hash) {
          try {

            await prisma.usuario.create({
              data: {
                email: dados.email,
                nome: dados.nome,
                senha: hash,
                usuario: dados.usuario
              }
            })

            return res.status(201)

          } catch (error) {

            if (error instanceof Prisma.PrismaClientKnownRequestError) {
              if (error.code === 'P2002') {
                return res.status(400).send({ Mensagem: 'Usuário já cadastrado !' })
              }
            }

            return res.status(400).json({ error })

          }

        } else {
          return res.status(500).send({ error })
        }
      })

    } catch (error) {
      return res.status(500).send(error)
    }
    finally {
      prisma.$disconnect()
    }
  }
}


export default Usuarios