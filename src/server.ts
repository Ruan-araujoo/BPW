import dotenv from 'dotenv'
import express, { type Request, type Response } from 'express'
import rotaUsuarios from './routes/users.js'
import rotaProdutos from './routes/produts.js'
dotenv.config()
const app = express()
const port = process.env.PORT


app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (request: Request, response: Response) => {
    response.json({
        message: 'API FUNCIONANDO!',
        timestamp: new Date().toISOString()
    })
})

app.use('/v1', [
    rotaUsuarios,
    rotaProdutos
])

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`)
    console.log(`Healt http://localhost:${port}/healt`)
})