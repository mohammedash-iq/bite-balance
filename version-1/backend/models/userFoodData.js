import pool from "./database.js";

async function adduserFoodData({ userId, foodId, portion }) {
    console.log("Adding user food data:", { userId, foodId, portion });
    let client;
    try {
        client = await pool.connect();
        await client.query(
            `INSERT INTO user_food_data (user_id, food_id, portion) VALUES ($1, $2, $3)`,
            [userId, foodId, portion]
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