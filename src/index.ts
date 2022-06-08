import express from 'express'
import routes from './Routes'

const server = express()

server.use(routes)

server.get('/', (req, res) => {
  res.status(200).json({
   Message: 'Teste com express e Prisma'
  })
})

server.listen(3333, () => {
  console.log('server is running at port 3333 😎')
})