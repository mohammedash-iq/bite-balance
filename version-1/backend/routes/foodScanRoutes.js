import express from "express"
const foodScan = express.Router()

foodScan.post("/scan", (req, res) => {
    res.send("the image is recieved")
})
foodScan.post("/manual-scan", (req, res) => {
    console.log(req.body)
    res.send("The manual data is recieved")
})

export default foodScan;