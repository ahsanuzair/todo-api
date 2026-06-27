# Todo API - Project Context

## Goal
4-week backend development bootcamp to land a job. Week 1: build a Todo REST API with Node.js and Express.

## Completed (Days 1-3)
- Initialized project, installed Express
- Built all 5 CRUD routes: GET /todos, GET /todos/:id, POST /todos, PUT /todos/:id, DELETE /todos/:id
- Refactored into proper folder structure: routes/ and controllers/
- Installed nodemon — run server with `npm run dev`
- Added input validation to POST route (title and description required, returns 400 if missing)
- Created `.gitignore` (node_modules, .env)
- Pushed to GitHub: https://github.com/ahsanuzair/todo-api

## Current Project Structure
```
todo-api/
├── app.js               ← server setup, mounts router
├── routes/todos.js      ← route definitions
├── controllers/todos.js ← business logic, todos array lives here
└── package.json
```

## Current State
- In-memory `todos` array (no database yet — Week 2)
- `nextId` counter for auto-incrementing IDs
- Todo object shape: `{ id, title, description, completed }`

## Remaining (Day 4)
- Error handling middleware — centralized error handling instead of per-route

## Week 2 Plan
- Replace in-memory array with PostgreSQL database

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
