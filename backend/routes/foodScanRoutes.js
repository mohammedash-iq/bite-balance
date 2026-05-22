import express from "express"
import { getFoodOptions } from "../models/food.js"
import { adduserFoodData, updateNewScannedMeal } from "../models/userFoodData.js";
import handleAiImageScan from "../services/imageScanAi.js"
const foodScan = express.Router()

foodScan.post("/image-scan", async (req, res) => {
    const image = req.body.image;
    const response = await handleAiImageScan({ image: image })
    if (response.success === true) {
        updateNewScannedMeal({ userId: req.user_id, details: response.details })
        res.send({ type: "success", message: "food added successfully", details: response.details })
    }
    else {
        res.send({ type: "error", success: false, error: response.error })
    }
})
foodScan.post("/manual-scan", async (req, res) => {
    await adduserFoodData({ userId: req.user_id, foodId: req.body.meal, portion: req.body.portion });
    res.send({ type: "success", message: "the food is scanned successfully" })
})

foodScan.post("/food-options", async (req, res) => {
    const { query } = req.body;
    const foodOptions = await getFoodOptions(query);
    res.send({ type: "success", foodOptions: foodOptions });
});



export default foodScan;