import pool from "./database.js";

async function adduserFoodData({ userId, foodId, meal, portion }) {
    let client;
    try {
        client = await pool.connect();
        await client.query(
            `INSERT INTO user_food_data (user_id, food_id, quantity, meal_type, date) VALUES ($1, $2, $3, $4)`,
            [userId, foodId, meal, portion]
        );
        console.log('User food data added to the database successfully!');
    }
    catch (err) {
        console.error('Error adding user food data to the database:', err.message);
        throw err;
    }
    finally {
        if (client) client.release();
    }
}

export { adduserFoodData };