import { Router } from 'express'
import Usuarios from '../../Controller/Usuarios'

const UsuariosRoutes = Router()

UsuariosRoutes.get('/usuarios/listar-usuarios', Usuarios.listarUsuario)

UsuariosRoutes.post('/usuarios/', Usuarios.criarUsuario)

export default UsuariosRoutes
