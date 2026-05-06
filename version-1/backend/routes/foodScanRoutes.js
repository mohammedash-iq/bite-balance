import express from "express"
import { getFoodOptions } from "../models/food.js"
import { adduserFoodData } from "../models/userFoodData.js";
const foodScan = express.Router()

foodScan.post("/scan", (req, res) => {
    res.send("the image is recieved")
})
foodScan.post("/manual-scan", async (req, res) => {
    await adduserFoodData(req.user_id, req.body.foodId, req.body.meal, req.body.portion);
    res.send({ type: "success", message: "the food is scanned successfully" })
})

foodScan.post("/food-options", async (req, res) => {
    const { query } = req.body;
    const foodOptions = await getFoodOptions(query);
    res.send({ foodOptions: foodOptions });
});



export default foodScan;