let todos = []
let nextId = 1

const getAllTodo = (req, res,next) => {
    res.json(todos)
}

const getTodoById = (req, res, next) => {
    const id = req.params.id
    const todo = todos.find(t=>t.id === parseInt(id))
    if(!todo){
        const err = new Error("Todo not found")
        err.status = 404
        return next(err)
    }
    res.json(todo)
}

const postTodo = (req, res, next) => {
    if(!req.body.title){
        const err = new Error("Title can't be empty")
        err.status = 400
        return next(err)
    }
    if(!req.body.description){
        const err = new Error("Description can't be empty")
        err.status = 400
        return next(err)
    }
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

const putTodo = (req, res, next) => {
    const id = req.params.id
    const todo = todos.find(t => t.id === parseInt(id))
    if(!todo){
        const err = new Error("Todo not found")
        err.status = 404
        return next(err)
    }
    todo.title = req.body.title || todo.title
    todo.description = req.body.description || todo.description
    todo.completed = req.body.completed !== undefined ? req.body.completed : todo.completed
    
    res.json(todo)
}

const deleteTodo = (req, res, next) => {
    const id = req.params.id
    const todoIndex = todos.findIndex(t => t.id === parseInt(id))
    if(todoIndex === -1){
        const err = new Error("Todo not found")
        err.status = 404
        return next(err)
    }
    todos.splice(todoIndex,1)
    res.json({message: "Todo deleted successfully"})
}

module.exports = {getAllTodo, getTodoById, postTodo, putTodo, deleteTodo}