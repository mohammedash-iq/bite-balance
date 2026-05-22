# Setup and Run Instructions

Follow these steps to get the Bite Balance project running on your local machine.

## 1. Database Setup (Docker)

The project uses PostgreSQL managed via Docker.

1. Ensure Docker and Docker Compose are installed and running.
2. From the root directory, start the database container:
   ```bash
   docker compose up -d
   ```
3. The database will initialize with the schema and food dataset automatically.

**Connection Details:**

- **Host:** `127.0.0.1`
- **Port:** `5432`
- **User:** `admin`
- **Password:** `password`
- **Database:** `bite_balance`

---

## 2. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend/` folder and add your Gemini API Key:
   ```env
   GEMINI_API_KEY=your_google_gemini_api_key_here
   ```
4. Start the server in development mode:
   ```bash
   npm run dev
   ```
   The server runs on `http://localhost:8090`.

---

## 3. Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   The application will be available at the URL shown in your terminal (typically `http://localhost:5173`).
