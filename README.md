# Backend Tutorial

A beginner-friendly REST API built with **Node.js**, **Express**, and **MongoDB Atlas** as part of a university backend development assignment.

> **Reference Tutorial:** [Intro to Backend Web Development – Node.js & Express for Beginners](https://www.youtube.com/watch?v=KOutPbKc9UM&t=2s) by Shivani (Hack Club)

---

## Technology Stack

| Technology | Version | Purpose |
|---|---|---|
| Node.js | v24+ | JavaScript runtime |
| Express | v5 | HTTP framework |
| Mongoose | v9 | MongoDB ODM |
| bcryptjs | v3 | Password hashing |
| dotenv | v18 | Environment variables |
| cors | v2 | Cross-Origin Resource Sharing |
| MongoDB Atlas | Free tier | Cloud database (AWS Mumbai) |

---

## Folder Structure

```
backend-tutorial/
├── src/
│   ├── index.js                  # Entry point — connects DB then starts server
│   ├── app.js                    # Express app, middleware, route mounting
│   ├── db/
│   │   └── database.js           # MongoDB connection via Mongoose
│   ├── models/
│   │   ├── user.model.js         # User schema (username, email, password)
│   │   └── post.model.js         # Post schema (name, description, age)
│   ├── controllers/
│   │   ├── user.controller.js    # Register & Login logic
│   │   └── post.controller.js    # CRUD logic for posts
│   ├── routes/
│   │   ├── user.route.js         # /api/v1/users/*
│   │   └── post.route.js         # /api/v1/posts/*
│   └── middleware/
│       └── errorHandler.js       # Centralised error middleware
├── postman/
│   └── backend-tutorial.postman_collection.json
├── .env                          # Secret credentials (git-ignored)
├── .env.example                  # Placeholder template
├── .gitignore
├── package.json
└── README.md
```

---

## Installation

```bash
# 1. Clone the repository
git clone https://github.com/sawaipratap-qt/backend-tutorial.git
cd backend-tutorial

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env
# Edit .env with your MongoDB Atlas URI and desired PORT
```

---

## MongoDB Atlas Configuration

1. Go to [cloud.mongodb.com](https://cloud.mongodb.com) and sign in.
2. Create a free cluster (or use your existing **BackendCluster**).
3. Under **Database Access**, create a database user with read/write permissions.
4. Under **Network Access**, add your IP address (or `0.0.0.0/0` for development).
5. Click **Connect → Drivers**, copy the connection string, and paste it as `MONGODB_URI` in your `.env`.

---

## Environment Variables

| Variable | Description | Example |
|---|---|---|
| `PORT` | HTTP server port | `5000` |
| `MONGODB_URI` | MongoDB Atlas connection string | `mongodb+srv://user:pass@cluster.mongodb.net/dbname` |

Create a `.env` file from `.env.example`. **Never commit `.env`** — it is git-ignored.

---

## How to Run

```bash
# Development (auto-restarts on file changes)
npm run dev

# Production
npm start
```

The server starts at `http://localhost:5000` after a successful MongoDB connection.

Expected startup output:
```
MongoDB connected: ac-XXXXXXX.rqxevoy.mongodb.net
Server running on http://localhost:5000
```

---

## API Endpoints

### Health

| Method | Path | Description |
|---|---|---|
| GET | `/health` | Server health check |

### Users

| Method | Path | Description |
|---|---|---|
| POST | `/api/v1/users/register` | Register a new user |
| POST | `/api/v1/users/login` | Login and verify credentials |

### Posts

| Method | Path | Description |
|---|---|---|
| POST | `/api/v1/posts/create` | Create a new post |
| GET | `/api/v1/posts` | Get all posts |
| GET | `/api/v1/posts/:id` | Get a single post by ID |
| PUT | `/api/v1/posts/:id` | Update a post by ID |
| DELETE | `/api/v1/posts/:id` | Delete a post by ID |

---

## Example JSON Requests

### Register User
```http
POST /api/v1/users/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "secret123"
}
```

**Response (201)**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "_id": "64abc...",
    "username": "johndoe",
    "email": "john@example.com",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### Login User
```http
POST /api/v1/users/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "secret123"
}
```

### Create Post
```http
POST /api/v1/posts/create
Content-Type: application/json

{
  "name": "Alice",
  "description": "A sample post",
  "age": 28
}
```

**Response (201)**
```json
{
  "success": true,
  "message": "Post created successfully",
  "data": {
    "_id": "64def...",
    "name": "Alice",
    "description": "A sample post",
    "age": 28,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### Update Post
```http
PUT /api/v1/posts/:id
Content-Type: application/json

{
  "name": "Alice Updated",
  "age": 29
}
```

### Delete Post
```http
DELETE /api/v1/posts/:id
```

---

## Error Responses

All errors follow this format:

```json
{
  "success": false,
  "message": "Descriptive error message"
}
```

| Status | Meaning |
|---|---|
| 400 | Bad request / validation error / invalid ID |
| 401 | Invalid credentials |
| 404 | Resource not found |
| 409 | Duplicate email or username |
| 500 | Internal server error |

---

## Postman Testing Guide

1. Open **Postman Desktop**.
2. Click **Import** → **File** → select `postman/backend-tutorial.postman_collection.json`.
3. In the imported collection, click **Variables** and verify `baseUrl` is `http://localhost:5000`.
4. Start the server with `npm run dev`.
5. Run requests in this order for a complete CRUD flow:
   1. `Health Check`
   2. `Register User`
   3. `Login User`
   4. `Create Post` ← automatically sets the `postId` variable
   5. `Get All Posts`
   6. `Get Post by ID`
   7. `Update Post`
   8. `Delete Post`

Each request includes automated assertions. Use **Run Collection** to execute all tests at once.

---

## GitHub Repository

**URL:** https://github.com/sawaipratap-qt/backend-tutorial

```bash
# Push your code (after review)
git add .
git commit -m "feat: complete backend tutorial implementation"
git push -u origin main
```

