import { Router } from 'express'
import Login from '../../Controller/Login'

const LoginRoutes = Router()

LoginRoutes.post('/login', Login.Logar)

export default LoginRoutes