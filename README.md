# Bite Balance

Bite Balance is a full-stack nutrition tracker designed to help users log meals, monitor daily nutrition, and receive tailored intake goals. The project combines a React + Vite frontend with an Express.js backend, PostgreSQL data storage, and AI-powered food recognition.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Architecture](#architecture)
- [Backend](#backend)
- [Frontend](#frontend)
- [Database](#database)
- [API Endpoints](#api-endpoints)
- [Setup & Run](#setup--run)
- [Environment & Configuration](#environment--configuration)
- [Known Notes & Implementation Details](#known-notes--implementation-details)
- [Future Improvements](#future-improvements)

---

## Project Overview

Bite Balance is a nutrition tracking application that allows registered users to:

- Sign up and log in securely
- Provide health metrics such as age, height, weight, gender, and activity level
- Automatically generate daily nutrition goals based on basal metabolic rate (BMR) and total daily energy expenditure (TDEE)
- Log meals manually using food search
- Log meals by scanning a food image using AI-based image recognition
- View today's meals and nutrition consumption progress
- See profile information and personalized nutrition goals

The backend exposes REST endpoints for authentication, profile retrieval, meal logging, and nutrition tracking. The frontend provides a modern dashboard UI with navigation and quick access to all core flows.

---

## Features

- User authentication: register and login flows
- JWT-based authorization middleware
- Personalized nutrition goal generation from health metrics
- Manual meal logging with food search suggestions
- AI image scanning for meal identification and nutrition extraction
- Daily meal history and nutrition progress dashboard
- Profile view with avatar and goal breakdown
- Dockerized PostgreSQL database with CSV food dataset import

---

## Architecture

The project is split into two main folders:

- `backend/` - Express server, PostgreSQL access, business logic, AI integration
- `frontend/` - React + Vite application, pages, components, API service calls

Additional root-level files:

- `docker-compose.yaml` - starts PostgreSQL and imports schema/dataset
- `schema.sql` - database schema and CSV import configuration
- `food-dataset/` - meal nutrition dataset CSVs used by the database

---

## Backend

### Stack

- Node.js with ES modules
- Express 5
- PostgreSQL via `pg`
- JWT authentication via `jsonwebtoken`
- Google Gemini AI integration via `@google/genai`
- CORS support and JSON body parsing

### Important Files

- `backend/server.js` - main Express server entrypoint
- `backend/routes/authenticationRoute.js` - sign-in and login routes
- `backend/routes/foodScanRoutes.js` - food logging, image scan, and search routes
- `backend/routes/userRoutes.js` - user profile, health metrics, meals, and nutrition
- `backend/middleware/jwtMiddleware.js` - token verification middleware
- `backend/models/database.js` - PostgreSQL pool configuration
- `backend/models/users.js` - user account and profile queries
- `backend/models/food.js` - food search query
- `backend/models/userFoodData.js` - meal insert/update logic
- `backend/services/imageScanAi.js` - AI image scan orchestration
- `backend/services/nutriGoalGenerator.js` - nutrition goal calculator
- `backend/services/profileGenerator.js` - random avatar generation

### Backend Behavior

- All `/api` routes require a valid JWT token in the `Authorization` header.
- The auth routes are mounted under `/authenticate` and do not require auth.
- User registration creates a record in `users`, stores health metrics in `user_profile`, and generates nutrition goals.
- Manual meal logging saves a record to `user_food_data` using a selected food ID.
- Image scan attempts to identify food and nutritional values through Google Gemini and stores the result.
- The app supports adding new foods to `food_data` when the meal is not already available.

---

## Frontend

### Stack

- React 19
- Vite
- TypeScript
- Tailwind CSS
- React Router DOM
- React Hot Toast
- React Icons

### Important Files

- `frontend/src/App.tsx` - application routes
- `frontend/src/main.tsx` - React entrypoint
- `frontend/src/screens/LandingPage.tsx` - marketing home page
- `frontend/src/screens/LoginPage.tsx` - login flow page
- `frontend/src/screens/SigninPage.tsx` - sign-up flow page
- `frontend/src/screens/DashboardPage.tsx` - dashboard routing shell
- `frontend/src/components/dashboard/Profile.tsx` - user profile page
- `frontend/src/components/dashboard/Scan.tsx` - scan page with camera/manual tabs
- `frontend/src/components/dashboard/Updates.tsx` - today's meals feed
- `frontend/src/components/dashboard/LandingDashboard.tsx` - summary dashboard
- `frontend/src/components/dashboard/NavigationBar.tsx` - bottom nav bar
- `frontend/src/services/accountsService.tsx` - auth API calls
- `frontend/src/services/mealService.tsx` - meal-related API calls
- `frontend/src/services/userService.tsx` - user profile and nutrition API calls

### Frontend Behavior

- Auth tokens are stored in `localStorage` under `token`
- Login and sign-up both save the JWT token and redirect to `/dashboard/profile`
- The scan page has three tabs: Recent meals, Manual entry, and Camera scan
- Manual entry includes a food search dropdown and portion selection
- Camera scan captures a photo from the browser and sends base64 JPEG to the backend
- The dashboard uses fetched nutrition and health goals to display progress bars

---

## Database

### `schema.sql`

The PostgreSQL schema includes the following tables:

- `users` - stores user credentials, email, username, and profile avatar URL
- `user_profile` - stores age, height, weight, gender, activity, and nutrition goals
- `food_data` - stores food nutrition values imported from CSV datasets
- `user_food_data` - stores each logged meal record for a user

### Food Data Import

The schema imports CSV files from the `food-dataset/` directory using Docker mount paths:

- `FOOD-DATA-GROUP1.csv`
- `FOOD-DATA-GROUP2.csv`
- `FOOD-DATA-GROUP3.csv`
- `FOOD-DATA-GROUP4.csv`
- `FOOD-DATA-GROUP5.csv`

Data is loaded into `food_data` during container initialization via `COPY` statements.

---

## API Endpoints

### Authentication

- `POST /authenticate/signin`
  - Body: `{ username, email, password, age, height, weight, gender, activity }`
  - Registers a new user, saves profile metrics, generates nutrition goals, and returns `accesstoken`

- `POST /authenticate/login`
  - Body: `{ email, password }`
  - Returns `accesstoken` for valid credentials

### User Data

- `GET /api/users/get-profile`
  - Returns `{ username, email, image_url }`

- `GET /api/users/get-health-metrics`
  - Returns stored metrics and nutrition goals

- `GET /api/users/get-todays-meals`
  - Returns today's meals for the authenticated user

- `GET /api/users/get-todays-nutritions`
  - Returns aggregated nutrition totals for the authenticated user

### Meal Logging

- `POST /api/meals/manual-scan`
  - Body: `{ meal, portion }`
  - Logs a meal using a selected `food_id` and portion

- `POST /api/meals/image-scan`
  - Body: `{ image }`
  - Uses AI to detect food and nutrition from a camera image

- `POST /api/meals/food-options`
  - Body: `{ query }`
  - Returns food search suggestions from the database

### Auth Requirements

- All `/api/*` routes require a valid JWT token in the `Authorization` header
- The frontend sends the raw token value in the `Authorization` header

---

## Setup & Run

### Prerequisites

- Node.js 18+ or compatible runtime
- npm
- Docker and Docker Compose

### Backend Setup

1. Open a terminal in `backend/`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create `backend/.env` and set your Google Gemini API key:
   ```env
   GEMINI_API_KEY=YOUR_GOOGLE_GEMINI_API_KEY
   ```
4. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Open a terminal in `frontend/`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend app:
   ```bash
   npm run dev
   ```

### Docker / Database Setup

1. From the repo root, start PostgreSQL and import the CSV dataset:
   ```bash
   docker compose up -d
   ```
2. This will launch a container named `postgres_dev` with:
   - user: `admin`
   - password: `password`
   - database: `bite_balance`
   - port: `5432`
3. `schema.sql` will run automatically and populate the `food_data` table from the CSV files.

### Running the App

- Frontend: open the Vite URL shown in the terminal, typically `http://localhost:5173`
- Backend: runs on `http://localhost:8090`

---

## Environment & Configuration

### `backend/.env`

- `GEMINI_API_KEY` - required for AI food image scanning

### Notes

- Database connection settings are currently hard-coded in `backend/models/database.js`:
  - host: `127.0.0.1`
  - user: `admin`
  - password: `password`
  - database: `bite_balance`
  - port: `5432`
- If you run PostgreSQL locally instead of Docker, update `backend/models/database.js` accordingly.

---

## Known Notes & Implementation Details

- Passwords are currently stored in plain text in the database. For production, replace this with hashed password storage using bcrypt.
- JWT secret is currently hard-coded as `jwt_secret_key`. In production, move this to an environment variable.
- The `image-scan` endpoint accepts a base64-encoded JPEG and sends it to Google Gemini for analysis.
- AI response parsing expects a strict JSON object; invalid or malformed responses will return an error.
- The `food_data` search uses a SQL `LIKE` query and returns up to 10 matches.
- The app generates a random avatar URL using Dicebear when a user signs up.
- Daily nutrition totals are computed from all meal logs today for the authenticated user.

---

## Future Improvements

- Add password hashing and secure JWT secret configuration
- Implement refresh token rotation and token expiration handling
- Add protected route redirects if token is missing or invalid
- Add meal deletion and editing capabilities
- Improve AI scan error handling and confidence scoring
- Add more detailed meal nutrition breakdown in the dashboard
- Move database configuration into `.env` or a config file
- Add backend validation and stricter schema checks

---

## Project Structure Summary

```
backend/
  server.js
  routes/
    authenticationRoute.js
    foodScanRoutes.js
    userRoutes.js
  middleware/
    jwtMiddleware.js
  models/
    database.js
    food.js
    userFoodData.js
    users.js
  services/
    imageScanAi.js
    nutriGoalGenerator.js
    profileGenerator.js
frontend/
  src/
    App.tsx
    screens/
      LandingPage.tsx
      LoginPage.tsx
      SigninPage.tsx
      DashboardPage.tsx
    components/
      dashboard/
        Profile.tsx
        Scan.tsx
        Updates.tsx
        LandingDashboard.tsx
        NavigationBar.tsx
      landing-page/
        Navbar.tsx
    services/
      accountsService.tsx
      mealService.tsx
      userService.tsx
schema.sql
docker-compose.yaml
food-dataset/
```

---

## Contact

For support or development notes, inspect the backend route definitions and frontend service calls, especially:

- `backend/routes/authenticationRoute.js`
- `backend/routes/foodScanRoutes.js`
- `backend/routes/userRoutes.js`
- `frontend/src/services/accountsService.tsx`
- `frontend/src/services/mealService.tsx`
- `frontend/src/services/userService.tsx`

Thank you for using Bite Balance!
