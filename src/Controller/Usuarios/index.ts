import { Prisma, PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import { Request, Response } from 'express'

const prisma = new PrismaClient()

export class Usuarios {
  public static async listarUsuario(req: Request, res: Response) {
    try {

      const usuarios = await prisma.usuarios.findMany({
        select: {
          id: true,
          usuario: true,
          email: true,
          nome: true
        },
        orderBy: {
          id: 'asc'
        },

      })

      return res.json(usuarios)

    } catch (error) {

      return res.status(500).json(error)
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

      const pesquisaUsuario = await prisma.usuarios.findFirst({
        where: {
          usuario: dados.usuario
        }
      })

      if (pesquisaUsuario) {
        return res.status(400).json({ Mensagem: 'Usuário já existe !' })
      }

      // criptografa a senha do usuário
      bcrypt.hash(dados.senha, 5, async (error, hash) => {

        if (hash) {
          try {

            await prisma.usuarios.create({
              data: {
                email: dados.email,
                nome: dados.nome,
                senha: hash,
                usuario: dados.usuario
              }
            })

            return res.status(201).json({})

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

  }
}


export default Usuarios