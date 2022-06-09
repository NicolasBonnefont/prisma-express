import { Router } from 'express'
import verifyJWT from '../Middleware/Auth/verifyJWT'
import LoginRoutes from './Login'
import UsuariosRoutes from './Usuarios'

const routes = Router()

routes.use(LoginRoutes)
routes.use(verifyJWT)
routes.use(UsuariosRoutes)

export default routes
