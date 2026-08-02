const pool = require('../db/index.js')

const getAllTodo = async (req, res,next) => {
    try {
        const result = await pool.query('SELECT * FROM todos WHERE user_id = $1', [req.user.id])
        res.json(result.rows)
    } catch (error) {
        next(error)
    }
}

const getTodoById = async (req, res, next) => {
    const id = req.params.id
    try {
        const result = await pool.query('SELECT * FROM todos WHERE id = $1 AND user_id = $2', [id, req.user.id])
        if(!result.rows[0]){
            const err = new Error("Requested todo not found")
            err.status = 404
            return next(err)
        }
        return res.status(200).json(result.rows[0])
    } catch (error) {
        next(error)
    }
}

const postTodo = async (req, res, next) => {
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

    try {
        const result = await pool.query('INSERT INTO todos (title, description, completed, user_id) VALUES ($1, $2, $3, $4) RETURNING *', [req.body.title, req.body.description, false, req.user.id])
        return res.status(201).json(result.rows[0])
    } catch (error) {
        next(error)
    }
}

const putTodo = async (req, res, next) => {
    const id = req.params.id
    try {
        const result = await pool.query('UPDATE todos SET title = $1, description = $2, completed = $3 WHERE id = $4 AND user_id = $5 RETURNING *', [req.body.title, req.body.description, req.body.completed, id, req.user.id])
        if(!result.rows[0]){
            const err = new Error("Requested todo not found")
            err.status=404
            return next(err)
        }
        return res.status(200).json(result.rows[0])
    } catch (error) {
        next(error)
    }
}

const deleteTodo = async (req, res, next) => {
    const id = req.params.id
    try {
        const result = await pool.query('DELETE FROM todos WHERE id = $1 AND user_id = $2 RETURNING *', [id, req.user.id])
        if(!result.rows[0]){
            const err = new Error("Requested todo not found")
            err.status=404
            return next(err)
        }
        return res.status(200).json({message: "Todo deleted successfully"})
    } catch (error) {
        next(error)
    }
}

module.exports = {getAllTodo, getTodoById, postTodo, putTodo, deleteTodo}