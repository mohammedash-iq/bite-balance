import express from "express"
import cors from "cors";
import foodScan from "./routes/foodScanRoutes.js";
import authRoute from "./routes/authenticationRoute.js";
import authenticateToken from "./middleware/jwtMiddleware.js";

const app = express()
const PORT = 8090;

// middleware
app.use(cors())
app.use(express.json());

//routes
app.use("/api", authenticateToken);
app.use("/api/meals", foodScan);
app.use("/authenticate", authRoute);
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
    console.log(`The server started in http://localhost:${PORT}`);
})