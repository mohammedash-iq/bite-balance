import pool from "./database.js";

async function adduserFoodData({ userId, foodId, portion }) {
    let client;
    try {
        client = await pool.connect();
        await client.query(
            `INSERT INTO user_food_data (user_id, food_id, portion) VALUES ($1, $2, $3)`,
            [userId, foodId, portion]
        );
    }
    catch (err) {
        console.error('Error adding user food data to the database:', err.message);
        throw err;
    }
    finally {
        if (client) client.release();
    }
}

async function updateNewScannedMeal({ userId, details }) {
    let client;
    try {
        client = await pool.connect();
        const foodavailable = await client.query(`SELECT id FROM food_data WHERE food=$1`, [details.food])
        if (foodavailable.rowCount > 0) {
            await adduserFoodData({ userId: userId, foodId: foodavailable.rows[0].id, portion: details.portion });
        } else {
            const response_id = await client.query(`SELECT id FROM food_data ORDER BY id DESC LIMIT 1;`)
            const newId = response_id.rows[0].id + 1;
            await client.query(
                `INSERT INTO food_data (id,food, calorie, fat,carbohydrates,sugar,protein,fiber) VALUES ($1, $2, $3,$4,$5,$6,$7,$8)`, [
                newId, details.food, details.calorie, details.fat, details.carbohydrates, details.sugar, details.protein, details.fiber]);
            await adduserFoodData({ userId: userId, foodId: newId, portion: details.portion });
        }
    }
    catch (err) {
        console.error('Error adding user food data to the database:', err);
        throw err;
    }
    finally {
        if (client) client.release();
    }

}
export { adduserFoodData, updateNewScannedMeal };