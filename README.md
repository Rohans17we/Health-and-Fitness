# Health and Fitness App

A full-stack health and fitness tracking application with a .NET backend and a React + Vite frontend. Users can track workouts, nutrition, water intake, sleep, and view analytics, all with secure authentication and a modern UI.

---

## Features
- User registration and login (JWT authentication)
- Track workouts, nutrition, water intake, and sleep
- Analytics and progress tracking
- Responsive dashboard and landing pages
- Flexible database: supports SQL Server or SQLite

---

## Prerequisites
- [.NET 8 SDK](https://dotnet.microsoft.com/download)
- [Node.js (v18+)](https://nodejs.org/)

---

## Getting Started

### 1. Clone the Repository
```
git clone <your-repo-url>
cd Health-and-Fitness
```

### 2. Configure Environment Variables
Edit `backend/.env` to set your secrets and database provider:
```
JWT_SECRET=YourSuperSecretKeyHere
DB_PROVIDER=Sqlite  # or SqlServer
SQLITE_CONNECTION_STRING=Data Source=healthtracker.db
SQLSERVER_CONNECTION_STRING=Server=...;Database=...;User Id=...;Password=...;
```

### 3. Backend Setup
```
cd backend
# Install SQLite provider if using SQLite
dotnet add package Microsoft.EntityFrameworkCore.Sqlite --version 8.0.0
# Restore and build
dotnet restore
dotnet build
# Run migrations (creates DB if needed)
dotnet ef database update
# Start the API
dotnet run
```
The API will be available at `http://localhost:5000` (or as configured).

### 4. Frontend Setup
```
cd ../frontend
npm install
npm run dev
```
The app will be available at `http://localhost:5173`.

---

## Switching Database Provider
- To use SQLite: set `DB_PROVIDER=Sqlite` in `.env` (default connection string provided)
- To use SQL Server: set `DB_PROVIDER=SqlServer` and provide your SQL Server connection string

---

## Useful Commands
- Run backend: `dotnet run` (in `backend`)
- Run frontend: `npm run dev` (in `frontend`)
- Run migrations: `dotnet ef database update`

---

