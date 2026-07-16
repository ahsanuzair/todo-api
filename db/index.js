const {Pool} = require('pg')

const pool = new Pool ({
    host: 'localhost',
    port: 5432,
    database: 'todo_db',
    user: 'macbookpro',
    password: null
});

module.exports = pool;