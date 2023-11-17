import express from 'express'
import cors from 'cors'
import { v4 as uuid } from 'uuid'

const app = express()

app.use(express.json())
app.use(cors({origin: '*'}))

interface User {
  id: string,
  name: string,
  email: string
}

const users: User[] = []

app.get('/users', (request, response) => {
  // buscar no banco de dados
  return response.json(users)
})

app.post('/users', (request, response) => {
  // receber os dados do novo usuario
  const { name, email } = request.body

  // criar um novo usuario
  const user = {
    id: uuid(),
    name,
    email
  }

  // registrar usuario na base de dados
  users.push(user)

  // retornar os dados do novo usuario
  return response.json(user)

})

app.put('/users/:id', (request, response) => {
  // receber os dados do usuario
  const { id } = request.params
  const { name, email } = request.body

  // localizar o usuário na base de dados
  const userIndex = users.findIndex(user => user.id === id)

  // se o usuario nao existir, retornar erro
  if (userIndex < 0) {
    return response.status(404).json({ error: 'User not found' })
  }

  // atualizar os dados do usuario
  const user = { id, name, email }
  users[userIndex] = user

  // retornar os dados do usuario
  return response.json(user)

})

app.delete('/users/:id', (request, response) => {
  // receber id do usuario
  const { id } = request.params

  // localizar o usuário na base de dados
  const userIndex = users.findIndex(user => user.id === id)

  // se o usuario nao existir, retornar erro
  if (userIndex < 0) {
    return response.status(404).json({ error: 'User not found' })
  }

  // excluir o usuario
  users.splice(userIndex, 1)

  // retorna status sucesso
  return response.status(204).send()

})


app.listen('3333', () => {
  console.log('Server is running on port 3333')
})