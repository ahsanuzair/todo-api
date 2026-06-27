let todos = []
let nextId = 1

const getAllTodo = (req, res) => {
    res.json(todos)
}

const getTodoById = (req, res) => {
    const id = req.params.id
    const todo = todos.find(t=>t.id === parseInt(id))
    if(!todo){
        return res.status(404).json({message: "Requested todo not found"})
    }
    res.json(todo)
}

const postTodo = (req, res) => {
    const newTodo = {
        id: nextId,
        title: req.body.title,
        description: req.body.description,
        completed: false
    }
    nextId++
    todos.push(newTodo)
    res.status(201).json(newTodo)
}

const putTodo = (req, res) => {
    const id = req.params.id
    const todo = todos.find(t => t.id === parseInt(id))
    if(!todo){
        return res.status(404).json({message: "Requested todo not found"})
    }
    todo.title = req.body.title || todo.title
    todo.description = req.body.description || todo.description
    todo.completed = req.body.completed !== undefined ? req.body.completed : todo.completed
    
    res.json(todo)
}

const deleteTodo = (req, res) => {
    const id = req.params.id
    const todoIndex = todos.findIndex(t => t.id === parseInt(id))
    if(todoIndex === -1){
        return res.status(404).json({message: "Requested todo not found"})
    }
    todos.splice(todoIndex,1)
    res.json({message: "Todo deleted successfully"})
}

module.exports = {getAllTodo, getTodoById, postTodo, putTodo, deleteTodo}