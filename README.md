<!--
  Comprehensive technical documentation for Bite Balance.
  Generated from the repository source. All details below are derived
  directly from the project's files in the workspace. No assumptions added.
-->

# Bite Balance — Technical Documentation

Last updated: 2026-05-23

## Table of contents

- [1. Project Overview](#1-project-overview)
- [2. Tech Stack](#2-tech-stack)
- [3. Project Structure](#3-project-structure)
- [4. Frontend Documentation](#4-frontend-documentation)
- [5. Backend Documentation](#5-backend-documentation)
- [6. Service Layer Documentation](#6-service-layer-documentation)
- [7. Database Documentation](#7-database-documentation)
- [8. Authentication & Security](#8-authentication--security)
- [9. Docker & DevOps](#9-docker--devops)
- [10. Environment Variables](#10-environment-variables)
- [11. Setup & Installation](#11-setup--installation)
- [12. Application Flow](#12-application-flow)
- [13. Error Handling](#13-error-handling)
- [14. Performance & Optimization](#14-performance--optimization)
- [15. Testing](#15-testing)
- [16. Deployment](#16-deployment)
- [17. Known Limitations](#17-known-limitations)
- [18. Future Improvements](#18-future-improvements)
- [19. Glossary](#19-glossary)
- [20. Appendix](#20-appendix)

---

## 1. Project Overview

- Project name: Bite Balance
- Purpose: A full-stack nutrition tracker that lets users register, provide health metrics, log meals manually (via search) or by camera scan (AI), and view daily nutrition progress against automatically generated targets.
- Core problem solved: Reduce friction of meal logging and provide personalized daily macro/micro targets and an at-a-glance dashboard of daily intake.
- High-level architecture: Single-page React (Vite, TypeScript) frontend communicating with an Express-based Node.js backend connected to a PostgreSQL database. AI image analysis is performed via Google Gemini (`@google/genai`).
- Key features (implemented):
  - Email/password registration and login
  - JWT-based protected API routes
  - Health-metric capture and nutrition goal generation (BMR/TDEE-based)
  - Manual meal logging via `food_data` lookup
  - Camera image meal scan using Google Gemini model and strict JSON parsing
  - Daily meal history and aggregated nutrition totals
  - Dicebear avatar generation at signup
- Target users/use-cases: Users who want lightweight daily nutrition logging with optional AI-assisted capture; developers examining an example full-stack app integrating AI, Node/Express, and PostgreSQL.

Overall workflow (high-level):

1. User signs up: frontend calls `/authenticate/signin` providing account and health metrics.
2. Backend creates `users` entry, inserts `user_profile` health metrics, calculates nutrition goals, returns JWT.
3. Authenticated client logs meals manually or via `/api/meals/image-scan`.
4. Meal entries are saved in `user_food_data`; aggregated nutrition is computed from joined `food_data`.
5. Frontend fetches `get-todays-nutritions`, `get-todays-meals`, and `get-health-metrics` to render dashboard.

---

## 2. Tech Stack

Below are the technologies actually present in the repository and where they are used.

## Frontend

| Technology                            |                                        Where used | Why used                                                                            |
| ------------------------------------- | ------------------------------------------------: | ----------------------------------------------------------------------------------- |
| React 19                              |                                    `frontend/src` | Primary UI library for SPA rendering and component system.                          |
| Vite                                  |                   `frontend/package.json` scripts | Fast dev server and bundler for modern frontend tooling.                            |
| TypeScript (types present via @types) | `frontend/` (project files adopt .tsx extensions) | Static typing for components and services (project code uses TS files in frontend). |
| Tailwind CSS                          |                             `frontend/*` (styles) | Utility-first CSS for layout and theming referenced in classNames.                  |
| react-router-dom                      |                    `frontend/src/App.tsx` routing | Client-side routing for pages (landing, login, signin, dashboard).                  |
| react-hot-toast, react-icons          |     UI feedback and icons used across components. |

## Backend

| Technology           |                                                             Where used | Why used                                            |
| -------------------- | ---------------------------------------------------------------------: | --------------------------------------------------- |
| Node.js (ES modules) |                                                    `backend/server.js` | Backend runtime.                                    |
| Express 5            |                                         `backend/server.js`, `routes/` | HTTP server and router.                             |
| pg (node-postgres)   |                                           `backend/models/database.js` | PostgreSQL client used throughout models.           |
| jsonwebtoken         | `backend/middleware/jwtMiddleware.js`, `routes/authenticationRoute.js` | JWT generation and verification for authentication. |
| @google/genai        |                                      `backend/services/imageScanAi.js` | Google Gemini model client used for image analysis. |
| cors, dotenv         |                                                    `backend/server.js` | CORS and environment variable management.           |

## Database

| Technology |                                 Where used | Why used                                                           |
| ---------- | -----------------------------------------: | ------------------------------------------------------------------ |
| PostgreSQL | Root `schema.sql` + Docker Compose service | Persistent relational storage for users, food, and user meal logs. |

## DevOps / Docker

| Technology     |            Where used | Why used                                                             |
| -------------- | --------------------: | -------------------------------------------------------------------- |
| Docker Compose | `docker-compose.yaml` | Provision PostgreSQL container, mount datasets, load schema on init. |

## Authentication / Security libs

- `jsonwebtoken` used for JWT signing and verification. JWT secret is currently hard-coded in code (see Known Limitations).

## Build tools

- `npm` and `vite` scripts available in `frontend/package.json` and `backend/package.json`.

## Notes

- Versions: package.json files contain declared dependency versions. See `backend/package.json` and `frontend/package.json` for exact versions.

---

## 3. Project Structure

Top-level layout (trimmed to important files):

```
.
├─ backend/
│  ├─ server.js
│  ├─ package.json
│  ├─ .env (contains GEMINI_API_KEY)
│  ├─ middleware/
│  │  └─ jwtMiddleware.js
│  ├─ routes/
│  │  ├─ authenticationRoute.js
│  │  ├─ foodScanRoutes.js
│  │  └─ userRoutes.js
│  ├─ models/
│  │  ├─ database.js
│  │  ├─ users.js
│  │  ├─ food.js
│  │  └─ userFoodData.js
│  └─ services/
│     ├─ imageScanAi.js
│     ├─ nutriGoalGenerator.js
│     └─ profileGenerator.js
├─ frontend/
│  ├─ package.json
│  ├─ src/
│  │  ├─ App.tsx
│  │  ├─ main.tsx
│  │  ├─ screens/
│  │  │  ├─ LandingPage.tsx
│  │  │  ├─ LoginPage.tsx
│  │  │  ├─ SigninPage.tsx
│  │  │  └─ DashboardPage.tsx
│  │  ├─ components/
│  │  │  └─ dashboard/...
│  │  └─ services/
│  │     ├─ accountsService.tsx
│  │     ├─ mealService.tsx
│  │     └─ userService.tsx
├─ schema.sql
├─ docker-compose.yaml
└─ food-dataset/
   └─ FOOD-DATA-GROUP*.csv
```

## Directory responsibilities and interactions

- `backend/`
  - Purpose: Express server, route definitions, database models, and service integrations (AI and goal generation).
  - Important files:
    - `server.js`: initializes Express, applies `cors`, JSON middleware, mounts routes and error handler, and listens on port 8090.
    - `routes/*`: route-level definitions that invoke model/service functions.
    - `middleware/jwtMiddleware.js`: authorizes requests to `/api/*` routes.
    - `models/*`: direct database interaction via `pg` pool from `database.js`.
    - `services/*`: business logic helpers (AI wrapper, goal calculation, avatar generation).

- `frontend/`
  - Purpose: React single-page app that renders landing, auth, and dashboard interfaces.
  - Interaction: Calls backend endpoints on `http://localhost:8090` (see services in `frontend/src/services/*`). Authentication token is stored in `localStorage` as `token` and sent in `Authorization` headers by services.

## Architectural patterns

- Simple layered architecture in backend: routes -> models -> services.
- Frontend follows component-based architecture with small service modules for network calls.

---

## 4. Frontend Documentation

This section documents the actual frontend implementation and data flows.

## Project entry and routing

- `frontend/src/App.tsx` sets up `react-router-dom` routes:
  - `/` -> `LandingPage`
  - `/login` -> `LoginPage`
  - `/signin` -> `SigninPage`
  - `/dashboard/*` -> `DashboardPage` (internal dashboard sub-routes: profile, scan, updates)

## Authentication flow (frontend)

- `accountsService.loginApiCall` sends POST to `http://localhost:8090/authenticate/login` with `{ email, password }`.
- On success, frontend saves `responseBody.accesstoken` to `localStorage` key `token` and navigates to `/dashboard/profile`.
- `signinApiCall` behaves similarly after POST `/authenticate/signin`.
- Services include the raw token in the `Authorization` header for protected endpoints (no `Bearer ` prefix).

## API communication

- Network calls are centralized in `frontend/src/services`:
  - `accountsService.tsx`: `loginApiCall`, `signinApiCall`.
  - `mealService.tsx`: `handleManualMealScan`, `handleImageScanMeal`, `fetchOptions`.
  - `userService.tsx`: `fetchProfile`, `fetchProfileHealthMetrics`, `fetchTodaysMeals`, `fetchTodaysNutritions`.

Example: `handleImageScanMeal` (actual code extract)

```js
// frontend/src/services/mealService.tsx
async function handleImageScanMeal({ image }) {
  const response = await fetch("http://localhost:8090/api/meals/image-scan", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
    body: JSON.stringify({ image: image }),
  });
  const data = await response.json();
  if (data.type == "success") {
    return { success: true, message: data.message };
  }
  return { success: false, error: data.error };
}
```

## Component hierarchy and data flow

- `DashboardPage` nests routes and renders `NavigationBar`.
- `Profile` component calls `fetchProfile` and `fetchProfileHealthMetrics` on mount, stores data in local component state and renders health metrics and avatar.
- `Scan` component toggles between `CameraScan`, `ManualScan`, and `RecentMeals` based on internal state.
- `CameraScan` uses `navigator.mediaDevices.getUserMedia` and a `<canvas>` to capture images as base64 JPEG and passes them to `mealService.handleImageScanMeal`.

## Styling and themes

- Styling is implemented with Tailwind CSS utility classes embedded in JSX. No separate theme provider or CSS-in-JS is used.

## Form handling & validation

- Forms use local component state (`useState`). Minimal validation is implemented in UI code (e.g., password check in sign-up). No external validation library is present.

## Error handling & loading

- UI uses `react-hot-toast` to surface errors and success messages. API calls handle `response.ok` checks and display toast errors accordingly.

## Build & environment

- `frontend/package.json` scripts: `dev`, `build`, `lint`, `preview`.
- Frontend does not rely on environment variables in the current code; API base URLs are hard-coded as `http://localhost:8090`.

## Notes & limitations (frontend)

- No global state management library (Redux, Zustand) is used—the app relies on local state and `localStorage` for token persistence.
- No client-side token refresh flow is implemented.

---

## 5. Backend Documentation

## Backend architecture

- Layered: `routes` (HTTP handling) -> `models` (DB queries) -> `services` (AI, calculations) -> `utilities`.
- `server.js` mounts routes and a JWT authentication middleware for `/api` routes.

Server initialization (excerpt)

```js
// backend/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import foodScan from "./routes/foodScanRoutes.js";
import authRoute from "./routes/authenticationRoute.js";
import authenticateToken from "./middleware/jwtMiddleware.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
const PORT = 8090;

app.use(cors());
app.use(express.json());
dotenv.config();

app.use("/api", authenticateToken);
app.use("/api/meals", foodScan);
app.use("/authenticate", authRoute);
app.use("/api/users", userRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ type: "error", error: "Internal server Error" });
});

app.listen(PORT, () => {
  console.log(`The server started in http://localhost:${PORT}`);
});
```

## Authentication middleware

- `backend/middleware/jwtMiddleware.js` verifies JWTs using `jsonwebtoken` and sets `req.user_id`.

```js
import jwt from "jsonwebtoken";

function authenticateToken(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ error: "Access token is missing" });
  }
  jwt.verify(token, "jwt_secret_key", (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Invalid access token" });
    }
    req.user_id = user.user_id;
    next();
  });
}

export default authenticateToken;
```

Note: The JWT secret string is hard-coded as `jwt_secret_key` in the codebase (see Known Limitations).

## Route-level documentation

The backend exposes the following endpoints (documented with request, response, and behavior). All `/api/*` endpoints require `Authorization` header carrying the token value.

## Authentication endpoints

1. POST `/authenticate/signin`

| Purpose      | Register a new user, store profile, compute goals, return JWT                                                                                                                                                                                               |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Request body | JSON: `{ email, username, password, age, height, weight, gender, activity }`                                                                                                                                                                                |
| Response     | On success: `{ message: "User created successfully", accesstoken: <token> }` (status 200). On conflict or error, appropriate 4xx/5xx with `{ error: "..." }`.                                                                                               |
| Behavior     | Calls `databaseAddUser` (in `models/users.js`) to insert user, then inserts health metrics into `user_profile`, calls `generateNutriGoals`, stores goals via `updateUserNutriGoals`, and signs a JWT with payload `{ user_id: newUser.id }` with 1d expiry. |

Code excerpt (signup flow):

```js
// backend/routes/authenticationRoute.js (signup handler)
const { email, username, password, age, height, weight, gender, activity } = req.body;
const user = await databaseGetUser({ email: email });
if (user) return res.status(409).json({ error: "User already exists" });
const newUser = await databaseAddUser({ email, username, password });
await updateUserHealthMetrics({ userId: newUser.id, age, height, weight, gender, activity });
const nutriGoals = generateNutriGoals({ age, height, weight, gender, activity });
await updateUserNutriGoals({ user_id: newUser.id, goals: nutriGoals });
jwt.sign({ user_id: newUser.id }, "jwt_secret_key", { expiresIn: "1d" }, ...)
```

2. POST `/authenticate/login`

| Purpose | Authenticate existing user and return JWT |
| Request body | `{ email, password }` |
| Response | On success: `{ message: "Login successful", accesstoken: <token> }`. On failure: 401 with `{ error: "Invalid username or password" }`. |
| Behavior | Verifies stored password equality (plain-text check in current code), issues JWT with 1h expiry. |

Code excerpt (login):

```js
const user = await databaseGetUser({ email: email });
if (!user || user.password !== password) {
  return res.status(401).json({ error: "Invalid username or password" });
}
jwt.sign({ user_id: user.id }, "jwt_secret_key", { expiresIn: "1h" }, ...)
```

## User endpoints (require auth)

 
1. GET `/api/users/get-profile`

| Purpose | Return username, email, image_url for authenticated user |
| Response | `{ type: "userProfile", content: { username, email, image_url } }` |
| DB ops | `SELECT username, email, image_url FROM users WHERE id = $1` via `getProfile` in `models/users.js` |

2. GET `/api/users/get-health-metrics`

 
| Purpose | Return age, height, weight and nutrition goals for user |
| Response | `{ type: "healthMetrics", content: { age, height, weight, calorie, protein, fat, fiber, sugar, carbohydrates } }` |
| DB ops | Query `user_profile` for `user_id` via `getUserHealthMetrics` in `models/users.js` |

3. GET `/api/users/get-todays-meals`

| Purpose | Return list of today's meals for user with time and calorie|
| Response | `{ type: "todaysMeals", content: [ { time_consumed, portion, food, calorie }, ... ] }` |
| DB ops | Joins `user_food_data` -> `food_data` (see `getUserTodaysMeals`) |

 
4. GET `/api/users/get-todays-nutritions`

| Purpose | Return aggregated nutrient sums for the user for the day |
| Response | `{ type: "todaysNutrition", content: [ [ "calorie", 123 ], [ "protein", 45 ], ... ] }` (frontend expects an array of entries) |
| DB ops | SUM across `user_food_data` join `food_data` (see `getUserTodaysNutritions`)

## Meal endpoints (require auth)

 
1. POST `/api/meals/food-options`

| Purpose | Return search suggestions for foods matching a query |
| Request | `{ query }` |
| Response | `{ type: "success", foodOptions: [ { id, food }, ... ] }` |
| DB ops | `SELECT id, food FROM food_data WHERE food LIKE '%${query}%' LIMIT 10;` (see `models/food.js`). Note: direct string interpolation in SQL — potential for SQL injection if not sanitized. |

2. POST `/api/meals/manual-scan`

| Purpose | Log a manually selected meal for the user |
| Request | `{ meal: <food_id>, portion }` |
| Response | `{ type: "success", message: "the food is scanned successfully" }` |
| DB ops | Calls `adduserFoodData` in `models/userFoodData.js` which INSERTs into `user_food_data`.

3. POST `/api/meals/image-scan`

 
| Purpose | Send base64 image to AI service to identify food and auto-log meal |
| Request | `{ image: <base64 jpeg> }` |
| Response | On AI success: `{ type: "success", message: "food added successfully", details }` where details include calorie, fat, protein, etc. On failure: error object. |
| Behavior | Calls `handleAiImageScan` in `services/imageScanAi.js`. If AI returns food details, `updateNewScannedMeal` inserts or finds food and then logs user food. |

## Service-level flow and important notes

- `imageScanAi.js` uses `@google/genai`'s `GoogleGenAI` client. It strips the base64 header and calls `client.models.generateContent` with `model: "gemini-3.1-flash-lite"` and an instruction that requires the model to return STRICT JSON. The code then attempts to `JSON.parse(response.text)` and validate expected fields.

Excerpt from `imageScanAi.js` (parsing behavior):

```js
const client = new GoogleGenAI({});
const strippedImage = image.split(",")[1];
const response = await client.models.generateContent({
  model: "gemini-3.1-flash-lite",
  contents: [
    {
      text: `You are a precise, automated food image analysis API. ... return EXACT JSON ...`,
    },
    { inlineData: { data: strippedImage, mimeType: "image/jpeg" } },
  ],
});
const data = JSON.parse(response.text);
if (data.food_detected == true) {
  // validate details and return structured object
}
```

## Important security/implementation notes

- `models/food.js` uses a SQL string with `LIKE '%${query}%'` — this is direct string interpolation and should be parameterized to avoid SQL injection.
- Passwords are stored and compared in plain text in `models/users.js` and `authenticationRoute.js` — this is insecure for production (see Known Limitations).
- JWT secret is hard-coded; token expiration differs between sign-in (1d) and login (1h).

---

## 6. Service Layer Documentation

Services implemented in `backend/services`:

1. `nutriGoalGenerator.js`

- Responsibility: Calculate nutrition goals (BMR, TDEE, protein, fat, carbs, sugar, fiber).
- Workflow: Accepts `{ age, height, weight, gender, activity }` and computes BMR using Mifflin-St Jeor (as implemented) then TDEE by multiplying by activity factor. Derives macros.

Excerpt (actual code):

```js
function generateNutriGoals({ age, height, weight, gender, activity }) {
  const goals = {
    bmr: 0,
    tdee: 0,
    protein: 0,
    fat: 0,
    carbs: 0,
    sugar: 0,
    fiber: 0,
  };
  const activityLevel = {
    sedentary: 1.2,
    "lightly-active": 1.375,
    "moderately-active": 1.55,
    "very-active": 1.725,
    "extra-active": 1.9,
  };
  if (activity === "sedentary" || activity === "lightly-active") {
    goals.protein = 0.8 * weight;
  } else if (activity === "moderately-active" || activity === "very-active") {
    goals.protein = 1.6 * weight;
  } else {
    goals.protein = 1.9 * weight;
  }
  if (gender === "male") {
    goals.bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    goals.bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }
  goals.tdee = goals.bmr * activityLevel[activity];
  goals.fat = (goals.tdee * 0.275) / 9;
  goals.carbs = (goals.tdee - goals.protein * 4 - goals.fat * 9) / 4;
  goals.sugar = (goals.tdee * 0.1) / 4;
  goals.fiber = (goals.tdee / 1000) * 14;
  return goals;
}
```

2. `profileGenerator.js`

- Responsibility: return a dicebear avatar URL (random selection from a fixed list of seeds).

3. `imageScanAi.js` — described earlier.

## Called-by relationships

- `routes/authenticationRoute.js` calls `generateNutriGoals` and `profileGenerator` indirectly via `models/users.databaseAddUser`.
- `routes/foodScanRoutes.js` calls `handleAiImageScan`.

---

## 7. Database Documentation

Database type: PostgreSQL (schema in `schema.sql`). The project uses `pg` directly — no ORM.

Main tables (from `schema.sql`)

1. `users`

| Column     | Type                         | Notes                                          |
| ---------- | ---------------------------- | ---------------------------------------------- |
| id         | SERIAL PRIMARY KEY           |                                                |
| username   | VARCHAR(255) NOT NULL        |                                                |
| password   | VARCHAR(255) NOT NULL        | Stored in plain text in current implementation |
| image_url  | VARCHAR(255)                 | Avatar URL (Dicebear)                          |
| email      | VARCHAR(255) NOT NULL UNIQUE |                                                |
| created_at | TIMESTAMP                    | default CURRENT_TIMESTAMP                      |
| updated_at | TIMESTAMP                    | default CURRENT_TIMESTAMP                      |

```

```
