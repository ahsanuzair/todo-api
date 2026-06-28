# Todo API - Project Context

## Goal
4-week backend development bootcamp to land a job. Week 1: build a Todo REST API with Node.js and Express.

## ✅ Week 1 Complete
- Initialized project, installed Express
- Built all 5 CRUD routes: GET /todos, GET /todos/:id, POST /todos, PUT /todos/:id, DELETE /todos/:id
- Refactored into proper folder structure: routes/, controllers/, middleware/
- Installed nodemon — run server with `npm run dev`
- Input validation on POST (title and description required, returns 400 if missing)
- Centralized error handling middleware in middleware/errorHandler.js
- Pushed to GitHub: https://github.com/ahsanuzair/todo-api

## Current Project Structure
```
todo-api/
├── app.js                      ← server setup, mounts router and error handler
├── routes/todos.js             ← route definitions
├── controllers/todos.js        ← business logic, todos array lives here
├── middleware/errorHandler.js  ← centralized error handling
└── package.json
```

## Current State
- In-memory `todos` array (no database yet — Week 2)
- `nextId` counter for auto-incrementing IDs
- Todo object shape: `{ id, title, description, completed }`
- All errors go through errorHandler middleware via next(err)

## Week 2 Plan
- Install PostgreSQL and connect to the database
- Replace in-memory array with real database queries
- Learn SQL: SELECT, INSERT, UPDATE, DELETE
- Use `pg` package to connect Node.js to PostgreSQL

## Key Concepts Covered
- HTTP request/response cycle
- Express middleware (`app.use(express.json())`)
- Route parameters (`req.params.id`)
- `parseInt()` for comparing URL params (strings) with stored IDs (numbers)
- Status codes: 200 OK, 201 Created, 404 Not Found
- Never commit `node_modules` — always use `.gitignore`
- `res.json()` vs `res.send()` — always use `res.json()` for APIs

## How to Resume Tomorrow
```bash
# Navigate to project folder and open Claude Code
cd ~/Documents/todo-api
claude

# Inside Claude Code, type:
/resume
# Pick the most recent session to continue with full chat history
```

## How to Run
```bash
node app.js
# Server runs on http://localhost:3000
```

## Testing
Using Postman. Server must be running before sending requests.
