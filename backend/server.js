import express from "express"
import cors from "cors";
import dotenv from "dotenv"
import foodScan from "./routes/foodScanRoutes.js";
import authRoute from "./routes/authenticationRoute.js";
import authenticateToken from "./middleware/jwtMiddleware.js";
import userRoutes from "./routes/userRoutes.js";

const app = express()
const PORT = 8090;

// middleware
app.use(cors())
app.use(express.json());
dotenv.config();

//routes
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
})