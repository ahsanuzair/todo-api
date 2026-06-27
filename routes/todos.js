const express = require("express")
const router = express.Router()
const {getAllTodo, getTodoById, postTodo, putTodo, deleteTodo} = require('../controllers/todos')

router.get('/', getAllTodo)
router.get('/:id', getTodoById)
router.post('/', postTodo)
router.put('/:id', putTodo)
router.delete('/:id', deleteTodo)

module.exports = router
