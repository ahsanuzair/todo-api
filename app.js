const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

let todos = []
let nextId = 1

app.get('/todos', (req, res, next) => {
    res.json(todos)
})

app.get('/todos/:id', (req, res, next) => {
    const id = req.params.id
    const todo = todos.find(t => t.id === parseInt(id))
    if(!todo) {
        return res.status(404).json({message: "To do not found"})
    }
    res.json(todo)
})

app.post('/todos', (req, res, next) => {
    const newTodo = {
        id: nextId,
        title: req.body.title,
        description: req.body.description,
        completed: false
    }
    todos.push(newTodo)
    nextId++
    res.status(201).json(newTodo)

})

app.get('/',(req, res, next) => {
    res.send('Hello World')
} )

app.listen(port, () => {
    console.log(`Serving is running on port: ${port}`);
})