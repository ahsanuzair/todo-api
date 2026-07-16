# Todo API - Project Context

## Goal
4-week backend development bootcamp to land a job.

## ✅ Week 1 Complete
- Initialized project, installed Express
- Built all 5 CRUD routes: GET /todos, GET /todos/:id, POST /todos, PUT /todos/:id, DELETE /todos/:id
- Refactored into proper folder structure: routes/, controllers/, middleware/
- Installed nodemon — run server with `npm run dev`
- Input validation on POST (title and description required, returns 400 if missing)
- Centralized error handling middleware in middleware/errorHandler.js
- Pushed to GitHub: https://github.com/ahsanuzair/todo-api

## ✅ Week 2 Complete
- Installed PostgreSQL locally (Homebrew, port 5432, username: macbookpro, no password)
- Installed pgAdmin and connected it to the Homebrew PostgreSQL server
- Created `todo_db` database and `todos` table in PostgreSQL
- Installed `pg` package and created `db/index.js` with a connection pool
- Rewrote all 5 controllers to use real SQL queries instead of in-memory array
- Learned: async/await, try/catch, SQL injection prevention with $1/$2 placeholders, RETURNING *

## Current Project Structure
```
todo-api/
├── app.js                      ← server setup, mounts router and error handler
├── db/index.js                 ← PostgreSQL connection pool
├── routes/todos.js             ← route definitions
├── controllers/todos.js        ← business logic with SQL queries
├── middleware/errorHandler.js  ← centralized error handling
└── package.json
```

## Current State
- All 5 routes reading/writing from PostgreSQL `todo_db` database
- Todo object shape: `{ id, title, description, completed }`
- All errors go through errorHandler middleware via next(err)

## Database Setup
- PostgreSQL via Homebrew, port 5432
- Username: macbookpro, no password
- Database: todo_db
- Table: todos (id SERIAL PRIMARY KEY, title VARCHAR(255), description TEXT, completed BOOLEAN)
- pgAdmin connected to localhost:5432 as macbookpro (server named "Homebrew PG")

## Week 3 Plan
- Docker — containerize the app and database
- Learn docker-compose to run Node.js + PostgreSQL together

## Key Concepts Covered
- HTTP request/response cycle
- Express middleware (`app.use(express.json())`)
- Route parameters (`req.params.id`)
- Status codes: 200 OK, 201 Created, 404 Not Found, 400 Bad Request
- Never commit `node_modules` — always use `.gitignore`
- `res.json()` vs `res.send()` — always use `res.json()` for APIs
- async/await for database calls
- SQL: SELECT, INSERT, UPDATE, DELETE, WHERE, RETURNING *
- SQL injection prevention with parameterized queries ($1, $2...)
- Connection pooling with `pg` Pool

## How to Run
```bash
npm run dev
# Server runs on http://localhost:3000
# PostgreSQL must be running (it starts automatically on Mac with Homebrew)
```

## Testing
Using Postman. Server must be running before sending requests.
