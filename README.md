# School Management System

## Project Description

The **School Management System** is designed to facilitate the management of student details across various classes, allowing users to perform CRUD (Create, Read, Update, Delete) operations efficiently. The system also tracks library history and fees history for each student, with management capabilities assigned to specific roles within the school.

### User Roles

The system features distinct logins for three user roles:

- **School Admin**: 
  - Has full control over the system.
  - Can create, edit, and delete accounts for both Office Staff and Librarians.

- **Office Staff**:
  - Has access to all student details.
  - Can manage fees history and view library reviews.
  - Responsible for performing various administrative tasks.

- **Librarian**:
  - Has restricted access, limited to viewing library history and student details.
  - Manages borrowing records for students effectively.

### Authentication and Access Control

The application includes user authentication that allows users to log in based on their assigned roles. This role-based access control (RBAC) determines their access levels and capabilities within the system, ensuring that each user can perform actions relevant to their role while maintaining data integrity and security.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v14 or later)
- [MongoDB](https://www.mongodb.com/) (local or cloud instance)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## Installation Steps

### 1. Install Backend Dependencies

Navigate to the `server` directory and install the necessary dependencies and run the server:

```bash
cd server
npm install
npm run dev
```

Navigate to the `client` directory and install the necessary dependencies and run the server:

```bash
cd ../client
npm install
npm run dev
```
Running in Development Mode:
> Backend will run on https://schoolmanagement-backend-le5k.onrender.com Frontend will run on http://localhost:5173

## .env file
> MONGO_URL =mongodb+srv://govindnikhil508:vH6XlHOggMMTwtcZ@cluster0.trpwv.mongodb.net/
JWT_SECRET = 794fhewnjrunfddbwREWQECEC
PORT = 5000

## Libraries used

### Client
> react: JavaScript library for building user interfaces. react-redux: State management for React using Redux. redux-toolkit: Simplified way to write Redux logic. react-router-dom (v6): Client-side routing for React. axios: HTTP client for making requests to the backend. redux-persist: To persist Redux state across page refreshes.


### Server
> express: Web framework for Node.js. mongoose: ODM for MongoDB. jsonwebtoken: For generating and verifying JWT tokens. bcryptjs: For password hashing. dotenv: For loading environment variables.



