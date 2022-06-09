import express from 'express'
import routes from './Routes'
import bodyParser from 'body-parser';

const server = express()

server.use(bodyParser.json())

server.get('/', (req, res) => {
  res.status(200).json({
    Message: 'Teste com express e Prisma'
  })
})

server.use(routes)

server.listen(process.env.PORT, () => {
  console.log('server is running at port 3333 😎')
})