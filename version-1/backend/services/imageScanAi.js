import { GoogleGenAI } from "@google/genai";

async function handleAiImageScan({ image }) {

    const client = new GoogleGenAI({});
    const strippedImage = image.split(",")[1];
    const response = await client.models.generateContent({
        model: "gemini-3.1-flash-lite",
        contents: [
            { text: "what do you see in the image and what is it's nutritional values based on the portion in the image, respond strictly in json format with only numerical values without metrics specified json:{calorie:value,sugar:value,fat:value,carbs:value}" },
            { inlineData: { data: strippedImage, mimeType: "image/jpeg" }, }
        ],
    });
    const data = JSON.parse(response.text);
    console.log(data)
    return response;
}

export default handleAiImageScan;


