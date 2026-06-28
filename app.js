const express = require('express')
const todoRouter = require('./routes/todos')
const errorHandler = require('./middleware/errorHandler')
const app = express()
const port = 3000

app.use(express.json())
app.use('/todos', todoRouter)


app.get('/',(req, res, next) => {
    res.send('Hello World, server running')
} )

app.use(errorHandler)

app.listen(port, () => {
    console.log(`Serving is running on port: ${port}`);
})