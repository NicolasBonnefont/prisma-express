import  { Router } from 'express'
import Clifor from '../../Controller/Clifor'

const CliforRoutes = Router()

CliforRoutes.get('/listar-clientes', Clifor.ListarClientes)

export default CliforRoutes
