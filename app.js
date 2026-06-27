const express = require('express')
const todoRouter = require('./routes/todos')
const app = express()
const port = 3000

app.use(express.json())
app.use('/todos', todoRouter)


app.get('/',(req, res, next) => {
    res.send('Hello World')
} )

app.listen(port, () => {
    console.log(`Serving is running on port: ${port}`);
})