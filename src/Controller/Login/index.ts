import { Request, Response } from "express";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export default class {
  public static async Logar(req: Request, res: Response) {

    try {

      const { usuario, senha } = req.body

      const pesquisaUsuario = await prisma.usuarios.findFirst({
        where: {
          usuario
        }
      })

      if (!pesquisaUsuario) {
        return res.status(404).json({
          Mensagem: "Usuario não localziado !"
        })
      }

      bcrypt.compare(senha, pesquisaUsuario.senha, (error, response) => {
        if (!response) {
          return res.status(401).json({
            Mensagem: 'Usuario ou Senha inválidos !'
          })
        }

        const token = jwt.sign({ id: pesquisaUsuario.id }, String(process.env.SECRET), {
          expiresIn: 4000
        })

        return res.json({ token })

      })

    } catch (error) {
      return res.status(500).json(error)
    }

  }
}