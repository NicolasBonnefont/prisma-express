import express from 'express'
import routes from './Routes'
import bodyParser from 'body-parser';

const server = express()


server.use(bodyParser.json())

server.use(routes)

server.get('/', (req, res) => {
  res.status(200).json({
    Message: 'Teste com express e Prisma'
  })
})

server.listen(3000, () => {
  console.log('server is running at port 3333 😎')
})