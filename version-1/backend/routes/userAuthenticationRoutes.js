import express from "express";

const userAuth = express.Router()

userAuth.post("/login", (req, res) => {
    res.send("credentials recieved")
})
userAuth.post("/signin", (req, res) => {
    res.send("credentials recieved")
})
userAuth.post("/refresh", (req, res) => {
    res.send("your refresh token is sent")
})

export default userAuth;