# Task Management System with Role-Based Access Control (RBAC)

A full-stack Task Management System built with React, Node.js, Express, MongoDB, and JWT Authentication. The application supports Role-Based Access Control (RBAC), allowing Admins and Users to access different features based on their roles.

## Features

### Authentication & Authorization

* User Registration
* User Login
* JWT Authentication
* Role-Based Access Control (RBAC)
* Protected Routes
* Admin-Only Routes
* Account Status Management (Active/Inactive Users)

### User Features

* Create Tasks
* View Personal Tasks
* Update Task Status
* Delete Tasks
* Dashboard Statistics
* Logout Functionality

### Admin Features

* View All Users
* Activate/Deactivate Users
* Delete Users
* View All Tasks
* Delete Any Task
* View Activity Logs
* Analytics Dashboard

### Activity Logging

The system tracks and stores:

* Login Activity
* Task Creation
* Task Updates
* Task Deletion

### Analytics

* Total Users
* Total Tasks
* Completed Tasks
* Pending Tasks
* Task Completion Rate

---

## Tech Stack

### Frontend

* React
* React Router DOM
* Axios
* Tailwind CSS
* Vite

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT
* bcrypt
* dotenv

---

## Project Structure

### Backend

```txt
backend
├── controllers
├── middleware
├── models
├── routes
├── utils
├── config
├── seedAdmin.js
├── server.js
└── package.json
```

### Frontend

```txt
frontend
├── src
│   ├── context
│   ├── layouts
│   ├── pages
│   │   ├── admin
│   │   ├── auth
│   │   └── user
│   ├── routes
│   ├── services
│   ├── App.jsx
│   └── main.jsx
└── package.json
```

---

## Installation & Setup

### Clone Repository

```bash
git clone <repository-url>
cd task_management_rbac
```

---

## Backend Setup

Navigate to backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
PORT=5000

MONGO_URI=<your_mongodb_atlas_connection_string>

JWT_SECRET=<your_jwt_secret>

ADMIN_NAME=Admin
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin123

FRONTEND_URL=http://localhost:5173
```

Start backend server:

```bash
npm run dev
```

---

## Default Admin Account

A default admin account is automatically created when the server starts if one does not already exist.

Default Credentials:

```txt
Email: admin@example.com
Password: admin123
```

The project also includes a `seedAdmin.js` utility for manual admin creation.

For local development:

```bash
node seedAdmin.js

---

## Frontend Setup

Navigate to frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

For local development:

```env
VITE_API_URL=http://localhost:5000/api
```

For production deployment (Vercel):

```env
VITE_API_URL=https://your-backend.onrender.com/api
```

Start frontend:

```bash
npm run dev
```

---

## API Endpoints

### Authentication

| Method | Endpoint           | Description   |
| ------ | ------------------ | ------------- |
| POST   | /api/auth/register | Register User |
| POST   | /api/auth/login    | Login User    |

### User Tasks

| Method | Endpoint       | Description    |
| ------ | -------------- | -------------- |
| GET    | /api/tasks     | Get User Tasks |
| POST   | /api/tasks     | Create Task    |
| PATCH  | /api/tasks/:id | Update Task    |
| DELETE | /api/tasks/:id | Delete Task    |

### Admin

| Method | Endpoint                    | Description        |
| ------ | --------------------------- | ------------------ |
| GET    | /api/admin/users            | Get All Users      |
| PATCH  | /api/admin/users/:id/status | Update User Status |
| DELETE | /api/admin/users/:id        | Delete User        |
| GET    | /api/admin/tasks            | Get All Tasks      |
| DELETE | /api/admin/tasks/:id        | Delete Any Task    |
| GET    | /api/admin/logs             | View Activity Logs |
| GET    | /api/admin/analytics        | View Analytics     |

---

## RBAC Roles

### User

* Create Tasks
* View Own Tasks
* Update Own Tasks
* Delete Own Tasks

### Admin

* View All Users
* Manage User Status
* Delete Users
* View All Tasks
* Delete Any Task
* View Activity Logs
* Access Analytics Dashboard

---

## Deployment

### Frontend

* Vercel

### Backend

* Render

### Database

* MongoDB Atlas

---

## Author

**Kalyan Eluri**

