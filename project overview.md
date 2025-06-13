# Project Overview - Health and Fitness Application

## Table of Contents
1. [Introduction](#introduction)
2. [System Architecture](#system-architecture)
3. [Backend Details](#backend-details)
    - [Tech Stack](#backend-tech-stack)
    - [Configuration & Environment](#backend-configuration--environment)
    - [Database & Data Models](#backend-database--data-models)
    - [API Endpoints & Controllers](#backend-api-endpoints--controllers)
    - [Authentication & Security](#backend-authentication--security)
    - [Service Layer](#backend-service-layer)
4. [Frontend Details](#frontend-details)
    - [Tech Stack](#frontend-tech-stack)
    - [Project Structure](#frontend-project-structure)
    - [Routing & Main Pages](#frontend-routing--main-pages)
    - [UI/UX & Features](#frontend-uiux--features)
    - [State Management & API Integration](#frontend-state-management--api-integration)
5. [Integration: Backend & Frontend](#integration-backend--frontend)
6. [Technologies & Dependencies](#technologies--dependencies)
7. [Build & Run Instructions](#build--run-instructions)
8. [Extensibility & Future Improvements](#extensibility--future-improvements)

---

## Introduction
This Health and Fitness application is a full-stack solution designed to help users track workouts, nutrition, water intake, sleep, and receive analytics. It features secure authentication, a modern and responsive UI, and a scalable architecture. The project is divided into a .NET backend API and a React + Vite frontend.

---

## System Architecture
- **Backend**: ASP.NET Core 9.0 REST API, Entity Framework Core, SQL Server, JWT authentication, Swagger documentation.
- **Frontend**: React 19, Vite, React Router, Redux Toolkit, Axios, modular component-based UI.
- **Communication**: The frontend communicates with the backend via HTTP (RESTful API), using JWT for authentication and authorization.

---

## Backend Details
### Backend Tech Stack
- ASP.NET Core 9.0
- Entity Framework Core (SQL Server)
- JWT Authentication
- Swagger (API documentation)
- dotenv.net, DotNetEnv (environment variable management)

### Backend Configuration & Environment
- **appsettings.json**: Contains logging, connection strings, and JWT settings.
- **appsettings.Development.json**: Development-specific logging settings.
- **Environment Variables**: Used for sensitive data like JWT secrets, issuer, and audience.
- **CORS Policy**: Only allows requests from `http://localhost:5173` (frontend).

### Backend Database & Data Models
- **User**: Registration, login, profile, fitness data.
- **Workout**: Exercise logs, calories burned, sets/reps, etc.
- **Nutrition**: Food logs, calories consumed, date/time.
- **WaterIntake**: Water tracking.
- **SleepTracking**: Sleep hours/quality.
- **Reminder**: Custom reminders.

### Backend API Endpoints & Controllers
- **UserController**: Register, login, get current user, get profile.
- **WorkoutController**: CRUD for workouts (JWT required).
- **NutritionController**: CRUD for nutrition logs (JWT required).
- **AnalyticsController**: Calorie comparison analytics (JWT required).

### Backend Authentication & Security
- JWT Bearer authentication for all protected endpoints.
- Passwords hashed with SHA256.
- TokenService generates JWTs with user claims.
- Swagger UI supports JWT for testing.

### Backend Service Layer
- **TokenService**: Generates JWTs, manages claims, configurable expiry.

---

## Frontend Details
### Frontend Tech Stack
- React 19
- Vite (fast dev/build)
- React Router DOM (routing)
- Redux Toolkit (state management)
- Axios (API calls)
- Formik & Yup (forms/validation)
- Framer Motion (animations)
- React Icons

### Frontend Project Structure
- `src/` contains all source code
    - `components/`: Reusable UI components (Navbar, Footer, Auth, Dashboard, Pricing, etc.)
    - `pages/`: Main route pages (Home, Login, SignUp, Dashboard, Pricing, Blog, About)
    - `styles/`: CSS files for theming and layout
    - `assets/`: Images and static assets
    - `main.jsx`: App entry point, sets up router
    - `app.jsx`: Main app component, defines routes

### Frontend Routing & Main Pages
- **Home**: Landing page with features, reviews, download section
- **Login/SignUp**: Auth forms, uses Formik/Yup, stores JWT/user in localStorage
- **Dashboard**: Main user area, sidebar navigation, protected by login
    - Subroutes: Home, Workout, Food, Water, Sleep, Analytics, Themes, Settings
    - Loads user data from localStorage, fetches data from backend
- **Pricing**: Plan comparison, feature highlights, upgrade CTAs
- **Blog/About**: Informational pages

### Frontend UI/UX & Features
- Responsive, modern design
- Dark mode toggle (DarkModeButton)
- Sidebar navigation in dashboard
- Feature-rich pricing page with icons and benefits
- Modular, reusable components
- Loading and error states for async actions

### Frontend State Management & API Integration
- **Redux Toolkit**: For global state (user, auth, etc.)
- **Axios**: For API requests (with JWT in headers)
- **LocalStorage**: Persists user session/token
- **Protected Routes**: Redirects to login if not authenticated

---

## Integration: Backend & Frontend
- **API Base URL**: Frontend calls backend at `http://localhost:5000` (or as configured)
- **JWT Auth**: Token stored in localStorage, sent in `Authorization` header
- **Data Flow**: User logs in/registers → receives JWT → accesses protected routes/features
- **Error Handling**: Frontend handles API errors, displays messages

---

## Technologies & Dependencies
- **Backend**: ASP.NET Core, Entity Framework Core, SQL Server, JWT, Swagger, dotenv.net, DotNetEnv
- **Frontend**: React, Vite, Redux Toolkit, Axios, Formik, Yup, Framer Motion, React Icons, ESLint

---

## Build & Run Instructions
### Backend
1. Set environment variables for JWT secrets and DB connection.
2. Run `dotnet build` and `dotnet run` in the `backend` folder.
3. API available at `http://localhost:5000` (default).

### Frontend
1. Run `npm install` in the `frontend` folder.
2. Start dev server with `npm run dev`.
3. App available at `http://localhost:5173`.

---

## Extensibility & Future Improvements
- Add more analytics (progress charts, trends)
- Integrate with wearable devices (Google Fit, Apple Health)
- Add push notifications (reminders)
- Expand blog and content features
- Add admin panel for user/content management
- Improve accessibility and internationalization
- Deploy to cloud (Azure, AWS, Vercel, etc.)


