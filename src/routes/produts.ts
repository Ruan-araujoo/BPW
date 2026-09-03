import type { Request, Response } from 'express'
import { Router } from 'express'
import { PrismaClient, User } from '@prisma/client'

const prisma = new PrismaClient()

const rotaProdutos = Router()

rotaProdutos.get('/produtos', async (request: Request, response: Response) => {
  const result = await prisma.produtos.findMany()

  return response.status(200).json({
    message: `Lista de produtos`,
    data: result,
  })
})


rotaProdutos.get('/produtos/:id', async (request: Request, response: Response) => {

  const { id, } = request.params

  //todo-winnicius: transferir para o service de consulta do banco de dados
  const result = await prisma.produtos.findUnique({
    where: {
      id: Number(id),
    }
  })


  if (!result) {
    return response.status(404).json({
      message: 'Usuário não encontrado',
      timestamp: new Date().toISOString(),
      status: 'API funcionando!'
    })
  }


  response.status(200).json({
    message: 'Detalhes do usuário:',
    user: result,
    status: 'API funcionando!'
  })
})

rotaProdutos.post('/produtos', async (request: Request<User>, response: Response) => {
  const { nome, email, senha } = request.body
  const user = await prisma.produtos.create({
    data: {
      nome,
      email,
      senha,
    },
  })

  return response.status(201).json({
    message: 'Usuário criado com sucesso!',
    timestamp: new Date().toISOString(),
    user: user,
  })
})


rotaProdutos.put('/produtos/:id', async (request: Request<User>, response: Response) => {
  const { id } = request.params
  const { nome, email, senha } = request.body as User
  const user = await prisma.user.update({
    where: {
      id: Number(id),
    },
    data: {
      nome,
      email,
      senha,
    },
  })

  return response.status(200).json({
    message: 'Usuário atualizado com sucesso!',
    timestamp: new Date().toISOString(),
    user: user,
  })
})

rotaProdutos.delete('/produtos/:id', async (request: Request, response: Response) => {
  const { id } = request.params
  await prisma.user.delete({
    where: {
      id: Number(id),
    },
  })

  return response.status(200).json({
    message: 'Usuário deletado com sucesso!',
    timestamp: new Date().toISOString(),
  })
})

export default rotaProdutos