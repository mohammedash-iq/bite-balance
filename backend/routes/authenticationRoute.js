import express from "express";
import bycrypt from "bcrypt";
import jwt from "jsonwebtoken";
import generateNutriGoals from "../services/nutriGoalGenerator.js"
import { databaseAddUser, databaseGetUser, updateUserHealthMetrics, updateUserNutriGoals } from "../models/users.js";

const users = [];
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
        //creates a new user in the  users table
        const newUser = await databaseAddUser({ email, username, password });

        //creates a new datarow in the user_profile table with relevent data
        await updateUserHealthMetrics({ userId: newUser.id, age: age, height: height, weight: weight, gender: gender, activity: activity });

        //fetches the best goals for the user based on the health and biological meterics and adds it to the user_profile table
        const nutriGoals = generateNutriGoals({ age: age, height: height, weight: weight, gender: gender, activity: activity });
        console.log(nutriGoals)
        await updateUserNutriGoals({ user_id: newUser.id, goals: nutriGoals });

        //sending response back to the user with jwt token
        jwt.sign({ user_id: newUser.id }, "jwt_secret_key", { expiresIn: "1d" }, (err, token) => {
            if (err) {
                return res.status(500).json({ error: "Error generating token" });
            }
            console.log("User created successfully!");
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
        console.log("Login successful!");
        return res.send({ message: "Login successful", accesstoken: token });
    });
});

export default authRoute;