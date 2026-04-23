import express from "express"
import foodScan from "./routes/foodScanRoutes.js";
import userAuth from "./routes/userAuthenticationRoutes.js";
const app = express()
const PORT = 8090;

// middleware to parse JSON request bodies
app.use(express.json());

// the meal scan enpoint 
app.use("/meal", foodScan);

// the user authenitication enpoint
app.use("/user", userAuth);

app.listen(PORT, () => {
    console.log(`The server started in http://localhost:${PORT}`);
})