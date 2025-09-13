# Node.js & Express REST API - Student Management

This project is a comprehensive, secure, and well-structured REST API built with Node.js, Express, and MongoDB. It serves as a practical learning resource for understanding core backend development concepts, including authentication, authorization, and modern API design patterns.

## As a Learning Material

This repository was built to demonstrate and teach key principles of modern backend development. It is an ideal resource for anyone looking to understand:

- **Project Structure**: How to organize a Node.js application using a Model-View-Controller (MVC) inspired pattern (Models, Routes, Controllers).
- **Authentication**: Implementing stateless authentication using JSON Web Tokens (JWT).
- **Authorization**: Securing endpoints with role-based access control (e.g., distinguishing between a regular `student` and an `admin`).
- **Middleware**: Writing and using custom middleware for security and error handling.
- **Database Interaction**: Using Mongoose to model data and perform CRUD (Create, Read, Update, Delete) operations against a MongoDB database.
- **Security Best Practices**: Hashing passwords with `bcryptjs` and managing sensitive configuration with environment variables (`.env`).

## Features

- **User Authentication**: Secure registration and login endpoints.
- **JWT Implementation**: Generates a token on login for accessing protected routes.
- **Role-Based Access Control**: Differentiates between `student` and `admin` roles, restricting access to certain endpoints.
- **Full CRUD Functionality**: Complete Create, Read, Update, and Delete operations for student profiles.
- **Password Hashing**: Uses `bcryptjs` to securely store user passwords.
- **Centralized Error Handling**: Employs custom middleware for consistent and clean error responses.

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: `jsonwebtoken` for JWT, `bcryptjs` for password hashing
- **Environment Variables**: `dotenv`

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (v14.x or newer)
- Nodemon (3.1.10 or newer)
- MongoDB (or a cloud-based instance like MongoDB Atlas)
- A code editor like VS Code
- An API testing tool like Postman

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/nodejsTutorialTwo.git
    ```
2.  **Navigate into the project directory:**
    ```sh
    cd nodejsTutorialTwo
    ```
3.  **Install NPM packages:**
    ```sh
    npm install
    ```

### Environment Configuration

1.  Create a file named `.env` in the root of your project.
2.  Add the following configuration variables to your `.env` file. Be sure to replace the placeholder values with your actual data.

    ```env
    # --- Database ---
    # Your MongoDB connection string
    MONGO_URI=mongodb://localhost:27017/student-api

    # --- Security ---
    # A long, random, and secret string for signing JWTs
    JWT_SECRET=your_super_secret_and_random_string

    # --- Server ---
    # The port the server will run on
    PORT=5000
    ```

### Running the Application

To start the server, run the following command:

```sh
npm run dev
```

The server should now be running on `http://localhost:5000`.

## API Endpoints

All endpoints are prefixed with `/api/students`.

| Method | Endpoint                 | Access  | Description                                                              |
| :----- | :----------------------- | :------ | :----------------------------------------------------------------------- |
| **Authentication** |                          |         |                                                                          |
| `POST` | `/register`              | Public  | Registers a new student.                                                 |
| `POST` | `/login`                 | Public  | Authenticates a student and returns a JWT.                               |
| **Students**       |                          |         |                                                                          |
| `GET`  | `/`                      | Admin   | Retrieves a list of all students.                                        |
| `GET`  | `/:id`                   | Private | Retrieves the profile of a specific student. A user can only get their own profile, while an admin can get any. |
| `PUT`  | `/:id`                   | Private | Updates a student's own profile.                                         |
| `DELETE` | `/:id`                 | Admin   | Deletes a student's profile.                                             |

---

### Example Requests

#### 1. Register a Student

**Request:** `POST /api/students/register`

**Body:**
```json
{
    "name": "John Doe",
    "email": "john.doe@example.com",
    "password": "password123",
    "gender": "male",
    "age": 22
}
```

#### 2. Login

**Request:** `POST /api/students/login`

**Body:**
```json
{
    "email": "john.doe@example.com",
    "password": "password123"
}
```

**Success Response:**
```json
{
    "_id": "60d5f2f9c7b7e6a4c8f0a1b2",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### 3. Get All Students (Admin Only)

**Request:** `GET /api/students`

**Headers:**
```
Authorization: Bearer <your_admin_jwt_token>
```

## License

This project is licensed under the MIT License.


