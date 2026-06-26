# Todo API - Project Context

## Goal
4-week backend development bootcamp to land a job. Week 1: build a Todo REST API with Node.js and Express.

## Completed (Day 1)
- Initialized project with `npm init -y`
- Installed Express
- Created `app.js` as the entry point
- Built and tested:
  - `GET /` — health check, returns "Hello World"
  - `GET /todos` — returns all todos (empty array for now)
  - `GET /todos/:id` — returns one todo by ID, 404 if not found
  - `POST /todos` — creates a todo, returns 201 with the new todo
- Created `.gitignore` (node_modules, .env)
- Pushed to GitHub: https://github.com/ahsanuzair/todo-api

## Current State of app.js
- In-memory `todos` array (no database yet — Week 2)
- `nextId` counter for auto-incrementing IDs
- Todo object shape: `{ id, title, description, completed }`

## Remaining Routes (Day 2)
- `PUT /todos/:id` — update a todo (title, description, completed)
- `DELETE /todos/:id` — delete a todo

## Day 3-4 Plan
- Refactor into folder structure: routes/, controllers/
- Install nodemon for auto-restart
- Add input validation (what if title is empty?)

## Day 5 Plan
- Add proper error handling middleware
- Polish and final review

## Key Concepts Covered
- HTTP request/response cycle
- Express middleware (`app.use(express.json())`)
- Route parameters (`req.params.id`)
- `parseInt()` for comparing URL params (strings) with stored IDs (numbers)
- Status codes: 200 OK, 201 Created, 404 Not Found
- Never commit `node_modules` — always use `.gitignore`
- `res.json()` vs `res.send()` — always use `res.json()` for APIs

## How to Run
```bash
node app.js
# Server runs on http://localhost:3000
```

## Testing
Using Postman. Server must be running before sending requests.
