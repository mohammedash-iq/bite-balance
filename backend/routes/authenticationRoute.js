import express from "express";
import jwt from "jsonwebtoken";
import generateNutriGoals from "../services/nutriGoalGenerator.js"
import { databaseAddUser, databaseGetUser, updateUserHealthMetrics, updateUserNutriGoals } from "../models/users.js";
const authRoute = express.Router();

authRoute.post("/signin", async (req, res) => {
    try {
        const { email, username, password, age, height, weight, gender, activity } = req.body;
        if (!email || !username || !password) {
            return res.status(400).json({ error: "Username and password are required" });
        }

        const user = await databaseGetUser({ email: email });
        if (user) {
            return res.status(409).json({ error: "User already exists" });
        }
        const newUser = await databaseAddUser({ email, username, password });
        await updateUserHealthMetrics({ userId: newUser.id, age: age, height: height, weight: weight, gender: gender, activity: activity });
        const nutriGoals = generateNutriGoals({ age: age, height: height, weight: weight, gender: gender, activity: activity });
        await updateUserNutriGoals({ user_id: newUser.id, goals: nutriGoals });
        jwt.sign({ user_id: newUser.id }, "jwt_secret_key", { expiresIn: "1d" }, (err, token) => {
            if (err) {
                return res.status(500).json({ error: "Error generating token" });
            }
            return res.send({ message: "User created successfully", accesstoken: token });
        });
    }
    catch (error) {
        console.log(error)
    }

});

authRoute.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "Username and password are required" });
    }
    const user = await databaseGetUser({ email: email });
    if (!user || user.password !== password) {
        return res.status(401).json({ error: "Invalid username or password" });
    }
    jwt.sign({ user_id: user.id }, "jwt_secret_key", { expiresIn: "1h" }, (err, token) => {
        if (err) {
            return res.status(500).json({ error: "Error generating token" });
        }
        return res.send({ message: "Login successful", accesstoken: token });
    });
});

export default authRoute;