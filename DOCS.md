# Doctor Appointment Booking System

A simple JavaScript project for doctor appointment booking system.

## Overview

Medicare Doctor Appointment System (Full-Stack)

Overview
- A full-stack demo app built with Node.js/Express (backend) and React (frontend) that enables user authentication, doctor applications, admin approvals, doctor profiles, and a notification system.
- Uses MongoDB with Mongoose models for users and doctors, JWT-based auth, and a Redux-powered frontend state.

What it does
- User flows
  - Register and login (passwords hashed with bcrypt; JWT issued on login).
  - View all approved doctors on the home screen.
  - Apply to become a doctor (creates a Doctor document with status pending and notifies admin).
  - Notifications: mark unseen as seen, delete all notifications, and view unseen/seen lists.
  - Access protected routes via a client-side ProtectedRoute wrapper.
- Admin flows
  - Get all users and all doctor applications.
  - Create a doctor application entry for a user and push a notification to the admin.
  - Update doctor status (approve or block) and reflect changes in the doctor record.
  - Delete doctors/users.
- Doctor flows
  - Get doctor info by user ID.
  - Update doctor profile (name, contact, specialty, experience, timings, etc.).
- Data model highlights
  - User: name, email, password, isDoctor, isAdmin, unseenNotifications, seenNotifications.
  - Doctor: userId, firstName, lastName, email, phoneNumber, address, specialization, experience, feePerConsultation, timings, status.
- Notifications
  - When a new doctor appliation is submitted, the admin’s unseenNotifications is updated with a new-doctor-request entry.
  - Users can mark all as seen or delete all notifications; data persists in user document arrays.

Key tech stack
- Backend: Node.js, Express, Mongoose, JWT, bcrypt, middlware for auth
- Frontend: React, Redux, React Router, Material UI
- Database: MongoDB (via Mongoose)
- Status/UX: Toast notifications (react-hot-toast), loading indicator in Redux

Main files and roles
- server.js: Express app setup, middleware, routes mounting, server startup.
- routes/userRoute.js: User registration, login, profile fetch, doctor-apply flow, notification utilities, get approved doctors.
- routes/adminRoute.js: Admin-side doctor management (apply, update status, fetch users/doctors, delete).
- routes/doctorRoute.js: Doctor-specific endpoints (get/update doctor info by user).
- models/userModel.js, models/doctorModel.js: User and Doctor schemas.
- middlewares/authMiddleware.js: JWT-based route protection; sets req.body.userId.
- client (React app): ProtectedRoute/PublicRoute, login/register, home with doctor list, apply doctor, admin tables for users/doctors, doctor profile, notifications, layout components, and Redux slices for user and alerts.

How to run (high level)
- Backend
  - Ensure MongoDB is running and config/dbConfig is set up.
  - Install dependencies and start server (e.g., node server.js or npm run start if defined).
  - Set environment variables (e.g., PORT, JWT_SECRET).
- Frontend
  - Install dependencies, run the React app (commonly npm start).
  - It communicates with the backend API endpoints under /api/*.

Notes
- Basic test scaffold exists (client/App.test.js) to verify rendering.
- Endpoints expect Authorization header with Bearer token for protected routes.
- JWT expires in 10 days by default as configured in login flow.

This project provides a compact, end-to-end example of user authentication, role-based doctor/admin flows, doctor onboarding, and a notification system in a healthcare-oriented web app.
