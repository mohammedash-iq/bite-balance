import express from "express";
import bycrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { databaseAddUser, databaseGetUser } from "../models/users.js";

const users = [];
const authRoute = express.Router();

authRoute.post("/signin", async (req, res) => {
    const { email, username, password } = req.body;
    if (!email || !username || !password) {
        return res.status(400).json({ error: "Username and password are required" });
    }
    const user = await databaseGetUser({ email: email });
    if (user) {
        return res.status(409).json({ error: "User already exists" });
    }
    const newUser = await databaseAddUser({ email, username, password });
    jwt.sign({ user_id: newUser.id }, "jwt_secret_key", { expiresIn: "1d" }, (err, token) => {
        if (err) {
            return res.status(500).json({ error: "Error generating token" });
        }
        console.log("User created successfully!");
        return res.send({ message: "User created successfully", accesstoken: token });
    });
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