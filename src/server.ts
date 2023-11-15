import express from 'express'

const app = express()

app.use(express.json())

app.get('/users', (request, response) => {

  // Query params example
  // const {perPage, currentPage} = request.query;
  // return response.json({})

  return response.json({ users: ['usuario 1', 'usuario 2', 'usuario 3'] })

})

app.post('/users', (request, response) => {
  // Request body example
  const body = request.body
  console.log(body)
  return response.json({
    message: 'Criando usuário'
  })
})

app.put('/users/:id', (request, response) => {
  // Route params example
  const { id } = request.params
  console.log(id)
  return response.json({
    message: `usuário ${id} Atualizado`
  })
})

app.delete('/users', (request, response) => {
  return response.json({
    message: 'Deletando usuário'
  })
})


app.listen('3333', () => {
  console.log('Server is running on port 3333')
})