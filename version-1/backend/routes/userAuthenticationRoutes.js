import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userAuth = express.Router();

const users = [];
let refreshTokens = [];

const JWT_SECRET = process.env.JWT_SECRET || "your_access_token_secret";
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "your_refresh_token_secret";

userAuth.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: "Username and password are required" });
        }

        if (users.find(u => u.username === username)) {
            return res.status(409).json({ error: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        users.push({ username, password: hashedPassword });

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

userAuth.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = users.find(u => u.username === username);

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        const accessToken = jwt.sign({ username: user.username }, JWT_SECRET, { expiresIn: '15m' });
        res.json({"token": accessToken });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

export default userAuth;