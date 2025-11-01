# Doctor Appointment Booking System

A simple JavaScript project for doctor appointment booking system.

## Overview

Project: Medicare - Doctor-Patient Administration (MERN-style)

Overview
- A full-stack web app (backend in Node/Express with MongoDB; frontend in React) for managing users, doctors, and admin workflows in a healthcare context.
- Features user authentication, doctor application and profile management, admin moderation (approve/block doctors, view users/doctors), and a notification system.
- Uses JWT-based auth with a lightweight middleware, and a Redux-based client state with loading indicators.

Main functionality
- User flows
  - Register and login (passwords hashed with bcrypt; JWT issued on login).
  - Apply for a doctor account (creates a pending Doctor document; triggers admin notification).
  - View, mark notifications as seen, and delete all notifications.
  - Get profile/info by user ID (protected route).
  - View all approved doctors on the home page.
- Doctor flows
  - Get doctor info by user ID, and update doctor profile (name, contact, specialization, timings, etc.).
- Admin flows
  - Create new doctor applications from admin side (pending status) and list all doctors.
  - Approve or block doctor accounts; status updates reflected in doctor records.
  - List all users and manage users (view/delete).
  - View, fetch, and manage individual doctor details.
- Notifications
  - Admins receive “new doctor request” notifications when a user applies.
  - Users can mark all notifications as seen or delete all notifications.
  - Notifications are stored as arrays on User: seenNotifications and unseenNotifications.
- Frontend integration
  - Protected routes ensure logged-in state; PublicRoute prevents access to auth routes when already logged in.
  - Admin and Doctor dashboards link to admin/doctorslist, admin/userslist, and doctor/profile routes.
  - A simple Doctor component renders doctor info cards on the Home page.
  - DoctorForm component provides a reusable form for creating/updating doctor data (with date/time fields).

Tech stack (high level)
- Backend: Node.js, Express
- Database: MongoDB (via mongoose)
- Authentication: JWT (jsonwebtoken), password hashing with bcrypt
- Middleware: Custom authMiddleware for protected routes
- Frontend: React
- State management: Redux Toolkit (reducers: user, alerts)
- UI: Material-UI components, react-hot-toast for notifications
- Routing: React Router
- Date/time: MUI X Date Pickers (for doctor timings)

API reference (high-level)
- User routes (POST /api/user)
  - POST /register: create new user (name, email, password)
  - POST /login: authenticate, return JWT
  - POST /get-user-info-by-id (auth): fetch user by ID; omit password
  - POST /apply-doctor-account (auth): create new doctor application (pending)
  - POST /mark-all-notifications-as-seen (auth): move unseen to seen
  - POST /delete-all-notifications (auth): clear all notifications
  - GET /get-all-approved-doctors (auth): fetch doctors with status "approved"
- Doctor routes (POST /api/doctor)
  - POST /get-doctor-info-by-user-id (auth): fetch doctor by userId
  - POST /update-doctor-profile (auth): update doctor fields for the user
- Admin routes (adminRoute)
  - POST /api/admin/:id (auth): create a new doctor with status “pending” (admin creates from admin panel)
  - PUT /api/admin/:id (auth): update doctor status (approve/block) with doctorId and status in body
  - GET /api/admin/ (auth): fetch all doctors
  - GET /api/admin/:id (auth): fetch a single doctor by ID
  - GET /api/admin/get-all-users (auth): fetch all users
  - DELETE /api/admin/:idToDelete (auth): delete a doctor by ID

Files and structure (highlights)
- server.js: Express app setup, CORS, dotenv, DB config, routes mounting, and server listen.
- models
  - userModel.js: User schema with name, email, password, role flags, and notification arrays.
  - doctorModel.js: Doctor schema with userId, personal details, specialization, experience, timings, status, and timestamps.
- routes
  - userRoute.js: User registration, login, profile fetch, doctor application, notifications endpoints, and approval flows.
  - doctorRoute.js: Doctor-related endpoints (get/update by userId).
  - adminRoute.js: Admin actions for doctor approval, retrieval, and user management.
- middlewares
  - authMiddleware.js: JWT validation, attaches userId to request body on success.
- client (React app)
  - App.js and routing for protected/public routes (ProtectedRoute, PublicRoute)
  - Pages: Home, Register, LoginPage, ApplyDoctor, Notifications, Admin pages (UsersList, DoctorsList), Doctor Profile
  - Components: Doctor (card UI), DoctorForm (form for doctor data), Layout and Navbar
  - Redux slices: alerts (loading indicator), user (store user payload)
  - API interaction with axios; token-based authorization in headers

How to run (quickstart)
- Prerequisites: Node.js, npm/yarn, MongoDB (local or cloud)
- Backend
  - Install dependencies: npm install
  - Configure environment: create a .env with JWT_SECRET and DB connection as per config/dbConfig
  - Start server: node server.js (or npm run start if defined)
- Frontend
  - cd client
  - Install dependencies: npm install
  - Start dev server: npm start
- Access app at: http://localhost:5000 (backend) and the React app port (commonly 3000)

Notes
- JWTs expire in 10 days as configured in login flow.
- Authorization header must be Bearer <token> for protected API calls.
- Admin and doctor flows are designed to be extended with richer role-based access if needed.
- The code includes basic error handling and loading indicators via Redux.

This README summarizes the project’s purpose and core functionality based on the provided codebase. If you want a more detailed API schema or a setup script, I can generate that next.
