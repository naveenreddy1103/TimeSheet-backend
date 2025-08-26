     #Timesheet Management Portal — Backend

This is the backend for the Timesheet Management Portal, built with Node.js, Express.js, and MongoDB.
It provides APIs for both users and admins to manage timesheets securely.

1. Features
   A. User APIs
      - Register & login.
      - Add, edit, delete timesheets.
      - View personal timesheets.
   B. Admin APIs
      - Register & login.
      - View all timesheets from all users.
   C. General
      - JWT-based authentication.
      - Password hashing with bcrypt.
      - Validation middleware for secure field access.
      - Cookie-based token handling.

2. Folder Structure
backend/
├── index.js                   # Entry point
├── .env                       # Environment variables
├── config/
│   └── databaseConfig.js       # MongoDB connection
│
├── models/
│   ├── user.js                # User schema
│   ├── adminUser.js           # Admin schema
│   └── timeSheet.js           # Timesheet schema
│
├── routes/
│   ├── auth.js                # Authentication routes (user & admin)
│   ├── timesheetRoutes.js     # Timesheet CRUD routes
│
├── middleware/
│   └── verifyToken.js         # JWT verification
│
├── utils/
│   └── feildValidation.js     # Field validation utility

3. Setup & Run
## Navigate to backend folder
cd backend

## Install dependencies
npm install

## Run server
npm start

4. Environment Variables
PORT=1000
MONGO_URI=mongodb://127.0.0.1:27017/timesheetdb
JWT_SECRET=your_jwt_secret_key

5. Tech Stack
   - Node.js + Express.js
   - MongoDB + Mongoose
   - JWT (authentication)
   - bcrypt (password hashing)
   - cookie-parser (token handling)
   - CORS (cross-origin requests)
   - Validator (input validation)
   - dotenv (environment config)

6. Middleware
   - verifyToken.js → Protects routes, validates JWT.
   - feildValidation.js → Ensures only allowed fields are processed.

7. Scripts
   "scripts": {
  "start": "node index.js",
  "dev": "nodemon index.js"
}


Run in dev mode:  npm run dev















