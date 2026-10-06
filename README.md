# Task Management API

A backend REST API for managing **users, projects, and tasks** with secure JWT authentication and MongoDB.

This project was developed as a backend assignment to demonstrate REST API development, authentication, authorization, database relationships, and CRUD operations using **Node.js, Express.js, and MongoDB**.

## 🚀 Features

* User Registration
* User Login
* JWT Authentication
* Protected API routes
* Create, Read, Update and Delete Projects
* Create, Read, Update and Delete Tasks
* Assign tasks to users
* Task status and priority management
* Project ownership and authorization
* MongoDB database integration
* Password hashing
* RESTful API architecture
* Environment variable configuration

## 🛠️ Tech Stack

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcrypt
* dotenv
* CORS

### Development Tools

* Postman
* Nodemon
* Git
* GitHub
* VS Code

## 📁 Project Structure

```text
task-management/
│
├── controllers/
│   ├── authController.js
│   ├── projectController.js
│   └── taskController.js
│
├── middleware/
│   └── authMiddleware.js
│
├── models/
│   ├── User.js
│   ├── Project.js
│   └── Task.js
│
├── routes/
│   ├── authRoutes.js
│   ├── projectRoutes.js
│   └── taskRoutes.js
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── server.js
```

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Navigate into the project

```bash
cd task-management
```

### 3. Install dependencies

```bash
npm install
```

### 4. Create `.env`

Create a `.env` file in the root directory:

```env
PORT=5000
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

> Never commit your `.env` file or expose your MongoDB credentials and JWT secret.

### 5. Start the development server

```bash
npm run dev
```

The API will run at:

```text
http://localhost:5000
```

## 🔐 Authentication

The application uses **JWT-based authentication**.

After successful login, the API returns a JWT token.

For protected endpoints, send the token in the request header:

```text
Authorization: Bearer YOUR_JWT_TOKEN
```

## 📌 API Endpoints

### Authentication

| Method | Endpoint             | Description         | Auth |
| ------ | -------------------- | ------------------- | ---- |
| POST   | `/api/auth/register` | Register a new user | No   |
| POST   | `/api/auth/login`    | Login user          | No   |

### Projects

| Method | Endpoint            | Description         | Auth |
| ------ | ------------------- | ------------------- | ---- |
| POST   | `/api/projects`     | Create project      | Yes  |
| GET    | `/api/projects`     | Get user's projects | Yes  |
| GET    | `/api/projects/:id` | Get project by ID   | Yes  |
| PUT    | `/api/projects/:id` | Update project      | Yes  |
| DELETE | `/api/projects/:id` | Delete project      | Yes  |

### Tasks

| Method | Endpoint                         | Description       | Auth |
| ------ | -------------------------------- | ----------------- | ---- |
| POST   | `/api/projects/:projectId/tasks` | Create task       | Yes  |
| GET    | `/api/projects/:projectId/tasks` | Get project tasks | Yes  |
| GET    | `/api/tasks/:id`                 | Get task by ID    | Yes  |
| PUT    | `/api/tasks/:id`                 | Update task       | Yes  |
| DELETE | `/api/tasks/:id`                 | Delete task       | Yes  |

## 📝 Example Requests

### Register

**POST**

```text
/api/auth/register
```

```json
{
  "name": "Mohar Singh Yadav",
  "email": "mohar@example.com",
  "password": "password123"
}
```

### Login

**POST**

```text
/api/auth/login
```

```json
{
  "email": "mohar@example.com",
  "password": "password123"
}
```

### Create Project

**POST**

```text
/api/projects
```

```json
{
  "title": "AI Automation Project",
  "description": "Build an effective AI automation system"
}
```

### Create Task

**POST**

```text
/api/projects/PROJECT_ID/tasks
```

```json
{
  "title": "Build Authentication",
  "description": "Implement JWT authentication",
  "status": "TODO",
  "priority": "HIGH",
  "dueDate": "2026-10-10"
}
```

### Update Project

**PUT**

```text
/api/projects/PROJECT_ID
```

```json
{
  "title": "Build AI Agent Automation",
  "description": "Build an effective and concise automation system"
}
```

### Update Task

**PUT**

```text
/api/tasks/TASK_ID
```

```json
{
  "title": "Complete JWT Authentication",
  "status": "IN_PROGRESS",
  "priority": "HIGH"
}
```

## 📊 Task Fields

A task can contain:

```text
title
description
projectId
assignedUserId
status
priority
dueDate
createdAt
updatedAt
```

### Status

```text
TODO
IN_PROGRESS
DONE
```

### Priority

```text
LOW
MEDIUM
HIGH
```

## 🔒 Authorization

The API ensures that users can only access and modify projects they own.

For example:

```js
const project = await Project.findOne({
    _id: req.params.id,
    owner: req.user.id
});
```

This prevents one user from accessing another user's projects or tasks.

## 🗄️ Database Relationships

The application uses MongoDB with Mongoose relationships.

```text
User
 │
 └── owns ──> Projects
                 │
                 └── contains ──> Tasks
                                    │
                                    └── assigned to ──> User
```

## 🧪 Testing

The API can be tested using **Postman**.

Recommended testing flow:

```text
1. Register User
       ↓
2. Login
       ↓
3. Copy JWT Token
       ↓
4. Create Project
       ↓
5. Create Task
       ↓
6. Get Project Tasks
       ↓
7. Update Task
       ↓
8. Delete Task
```

## 🔑 Environment Variables

| Variable     | Description                     |
| ------------ | ------------------------------- |
| `PORT`       | Server port                     |
| `MONGO_URL`  | MongoDB connection string       |
| `JWT_SECRET` | Secret key used to generate JWT |

## 🛡️ Security

* Passwords are hashed using bcrypt.
* JWT is used for authentication.
* Protected routes require authentication.
* Project ownership is verified before accessing project resources.
* Sensitive environment variables are stored in `.env`.

## 📈 Future Improvements

* Role-based access control
* Task filtering and searching
* Pagination
* Email notifications
* Task comments
* File attachments
* Real-time task updates using Socket.IO
* Admin dashboard
* API documentation using Swagger
* Automated testing with Jest and Supertest
* Deployment using Render/AWS

## 👨‍💻 Author

**Mohar Singh Yadav**

B.Tech — Artificial Intelligence & Machine Learning

* GitHub: `https://github.com/moharsingh123`
* LinkedIn: `https://linkedin.com/in/mohar-singh-061469297`

## 📄 License

This project is created for educational and assessment purposes.
