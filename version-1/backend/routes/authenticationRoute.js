import express from "express";
import bycrypt from "bcrypt";
import jwt from "jsonwebtoken";

const users = [];
const authRoute = express.Router();

authRoute.post("/signin", async (req, res) => {
    try {
        const { email, username, password } = req.body;
        if (!email || !username || !password) {
            return res.status(400).json({ error: "Username and password are required" });
        }
        if (users.find(user => user.email === email)) {
            return res.status(400).json({ error: "Username already exists" });
        }
        users.push({ "email": email, "username": username, "password": password });
        jwt.sign({ username: email }, "jwt_secret_key", { expiresIn: "1h" }, (err, token) => {
            if (err) {
                return res.status(500).json({ error: "Error generating token" });
            }
            return res.send({ message: "User created successfully", email: email, username: username, password: password, accesstoken: token });
        });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

authRoute.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Username and password are required" });
        }
        const user = users.find(user => user.email === email && user.password === password);
        if (!user) {
            return res.status(401).json({ error: "Invalid username or password" });
        }
        jwt.sign({ email: email }, "jwt_secret_key", { expiresIn: "1h" }, (err, token) => {
            if (err) {
                return res.status(500).json({ error: "Error generating token" });
            }
            return res.send({ message: "Login successful", email: email, password: password, accesstoken: token });
        });

    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
        console.error("Error during login:", error);
    }
});

export default authRoute;