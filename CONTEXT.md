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

## ✅ Week 3 Complete
- Wrote `Dockerfile` to containerize the Node app (base image `node:24`)
- Wrote `docker-compose.yml` to run two services together: `app` (Node) and `db` (Postgres 16)
- Wrote `.dockerignore` to keep `node_modules` and `.env` out of the image
- Mounted `db/schema.sql` into `/docker-entrypoint-initdb.d/` on the `db` service, so the `todos` table is created automatically the first time the container starts
- Learned: the containerized `db` is a completely separate Postgres instance from local Homebrew Postgres — different credentials, starts empty, and (with no named volume yet) resets on every `docker-compose down`
- Learned: `app` connects to `db` using the service name `db` as the hostname (Docker Compose's built-in networking), not `localhost`
- Ran `docker-compose up --build` and confirmed both containers start, the table is created, and all 5 CRUD routes work against the containerized stack via Postman
- Pushed to GitHub

## ✅ Week 4 Complete — Auth + Ownership Scoping
- Created `users` table: `id SERIAL PRIMARY KEY`, `email VARCHAR(255) UNIQUE NOT NULL`, `password_hash VARCHAR(60) NOT NULL`
- Installed `bcrypt` and `jsonwebtoken`
- Added `JWT_SECRET` to `.env`
- Built `POST /auth/register`: validates email/password present, checks for duplicate email (409), hashes password with `bcrypt.hash(password, 10)`, inserts user, returns `id` + `email` (never the hash)
- Built `POST /auth/login`: validates input, looks up user by email, verifies password with `bcrypt.compare`, issues a JWT (`jwt.sign({ id }, JWT_SECRET, { expiresIn: '1h' })`), returns the token
- Built `middleware/auth.js`: reads `Authorization: Bearer <token>` header, verifies it with `jwt.verify`, attaches decoded payload to `req.user`, calls `next()` — responds 401 if missing/malformed/invalid
- Applied auth middleware to all 5 todo routes at once via `router.use(authMiddleware)` in `routes/todos.js`
- Added `user_id INTEGER NOT NULL REFERENCES users(id)` to `todos` — every todo now belongs to exactly one user
- Updated all 5 todo controllers to scope by owner: `postTodo` inserts `user_id` from `req.user.id` (never from the request body), and `getAllTodo`/`getTodoById`/`putTodo`/`deleteTodo` all filter with `WHERE user_id = $x` — a todo belonging to another user returns the same 404 as a nonexistent one, so ids aren't leaked
- Ported the `users` table and `todos.user_id` column into `db/schema.sql`, so it now matches the live local database and Docker will create both correctly on next rebuild
- Tested full flow in Postman: register → login → blocked without token → works with valid token → confirmed a second user can't see/edit/delete the first user's todos
- Learned: bcrypt hashing (one-way, salted, fixed 60-char output), JWT structure (header.payload.signature), why login/register must be POST not GET, why login errors should use a generic message (avoid leaking which emails are registered), `next()` vs `next(err)`, chaining multiple handlers per route, foreign keys (`REFERENCES`), why FK-referenced tables must be created first in schema.sql

## Current Project Structure
```
todo-api/
├── app.js                      ← server setup, mounts routers and error handler
├── db/index.js                 ← PostgreSQL connection pool
├── db/schema.sql                ← table definitions (users + todos), auto-run inside the db container
├── routes/todos.js             ← todo route definitions, protected by authMiddleware
├── routes/auth.js              ← /auth/register, /auth/login route definitions
├── controllers/todos.js        ← todo business logic with SQL queries
├── controllers/auth.js         ← register/login logic (bcrypt + JWT)
├── middleware/errorHandler.js  ← centralized error handling
├── middleware/auth.js          ← verifies JWT, attaches req.user
├── Dockerfile                   ← containerizes the Node app
├── docker-compose.yml           ← runs app + Postgres together, named volume for data persistence
├── .dockerignore
└── package.json
```

## Current State
- All 5 todo routes reading/writing from PostgreSQL `todo_db` database, require a valid JWT, and are scoped to the logged-in user only
- Todo object shape: `{ id, title, description, completed, user_id }`
- `/auth/register` and `/auth/login` are public (no token required)
- All errors go through errorHandler middleware via next(err)
- App can run either locally (`npm run dev`, connects to local Homebrew Postgres) or fully containerized (`docker-compose up --build`, connects to the containerized Postgres) — currently running locally, schema.sql is in sync and ready for the next Docker rebuild

## Database Setup
- PostgreSQL via Homebrew, port 5432
- Username: macbookpro, no password
- Database: todo_db
- Table: todos (id SERIAL PRIMARY KEY, title VARCHAR(255), description TEXT, completed BOOLEAN, user_id INTEGER NOT NULL REFERENCES users(id))
- Table: users (id SERIAL PRIMARY KEY, email VARCHAR(255) UNIQUE NOT NULL, password_hash VARCHAR(60) NOT NULL)
- pgAdmin connected to localhost:5432 as macbookpro (server named "Homebrew PG")

## Next Steps (beyond original 4-week plan)
- TBD — options being considered: testing (Jest/Supertest), deployment (Render/Railway/Fly.io), API docs (README or Swagger/OpenAPI)

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
- Password hashing with bcrypt (one-way, salted, fixed 60-char output)
- JWT structure and signing (`header.payload.signature`, `jwt.sign`/`jwt.verify`, `expiresIn`)
- Express middleware chaining (`router.use()`, multiple handlers per route, `next()` vs `next(err)`)
- Auth header convention (`Authorization: Bearer <token>`)
- Status codes: 401 Unauthorized, 409 Conflict

## How to Run

**Locally (no Docker):**
```bash
npm run dev
# Server runs on http://localhost:3000
# PostgreSQL must be running (it starts automatically on Mac with Homebrew)
```

**With Docker:**
```bash
docker-compose up --build
# Server runs on http://localhost:3000
# Postgres runs in its own container, table auto-created from db/schema.sql on first start
```

## Testing
Using Postman. Server must be running before sending requests.
