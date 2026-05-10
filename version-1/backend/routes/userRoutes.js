import express from "express";
import { getProfile, getUserHealthMetrics, getUserTodaysMeals } from "../models/users.js"

const userRoutes = express.Router();

userRoutes.get("/get-profile", async (req, res) => {
    const userdata = await getProfile({ userId: req.user_id });
    res.send({ type: "userProfile", content: userdata });
});

userRoutes.get("/get-health-metrics", async (req, res) => {
    const healthMetrics = await getUserHealthMetrics({ userId: req.user_id });
    res.send({ type: "healthMetrics", content: healthMetrics });
});

userRoutes.get("/get-todays-meals", async (req, res) => {
    const todaysMeals = await getUserTodaysMeals({ userId: req.user_id });
    res.send({ type: "todaysMeals", content: todaysMeals });
})


export default userRoutes;
