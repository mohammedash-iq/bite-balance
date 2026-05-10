import express from "express";
import { getProfile, getUserHealthMetrics } from "../models/users.js"

const userRoutes = express.Router();

userRoutes.get("/get-profile", async (req, res) => {
    const userdata = await getProfile({ userId: req.user_id });
    res.send({ type: "userProfile", content: userdata });
});

userRoutes.get("/get-health-metrics", async (req, res) => {
    const healthMetrics = await getUserHealthMetrics(req.user_id);
    res.send({ type: "healthMetrics", content: healthMetrics });
});


export default userRoutes;
