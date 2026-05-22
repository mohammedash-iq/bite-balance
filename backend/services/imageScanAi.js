import { GoogleGenAI } from "@google/genai";

async function handleAiImageScan({ image, retry }) {
    const client = new GoogleGenAI({});
    const strippedImage = image.split(",")[1];
    try {
        const response = await client.models.generateContent({
            model: "gemini-3.1-flash-lite",
            contents: [
                { text: `You are a precise, automated food image analysis API. Your sole purpose is to inspect the provided image, identify any food items present, estimate their nutritional content, and return the data in a strict JSON format. ### CRITICAL OUTPUT RULES: 1. Return ONLY a raw, valid JSON object. 2. Do NOT wrap the response in markdown code blocks (e.g., do NOT use` + " ```json ... ```)" + `. 3. Do NOT include any introductory text, explanations, notes, or conversational fluff. The response must start with '{' and end with'}'. 4. Failure to output valid JSON will break the parsing application. ### CONDITION 1: FOOD DETECTED If you detect food in the image, analyze the ingredients, portion sizes, and estimated weights. Output the data matching this exact JSON schema:{"food_detected": true,"details": {"name": "string","estimated_portion": "quater"/"half"/"full"/"double","calorie": 0,"fat":0,"carbohydrates": 0,"protein": 0,"sugar": 0,fiber:0}} ### CONDITION 2: NO FOOD DETECTED If the image does not contain any recognizable food items, or if it is blank/unreadable, you must instantly halt analysis and return exactly this JSON object:{"food_detected": false}` },
                { inlineData: { data: strippedImage, mimeType: "image/jpeg" }, }
            ],
        });
        const data = JSON.parse(response.text);
        if (data.food_detected == true) {
            if (!data.details.sugar || !data.details.calorie || !data.details.protein || !data.details.carbohydrates || !data.details.fiber || !data.details.fat || !data.details.name || !data.details.estimated_portion) {
                return { success: false, error: "ai scan failed please try again" }
            }
            else {
                return { success: true, details: { food: data.details.name, calorie: data.details.calorie, fat: data.details.fat, sugar: data.details.sugar, carbohydrates: data.details.carbohydrates, fiber: data.details.fiber, protein: data.details.protein, portion: data.details.estimated_portion } }
            }
        }
        else {
            return { success: false, error: "No food found in the image" }
        }
    }
    catch (err) {
        return { success: false, error: "ai server down" }
    }
}

export default handleAiImageScan;


