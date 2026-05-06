import pool from "./database.js";

async function getFoodOptions(query) {
    let client;
    try {
        client = await pool.connect();
        const result = await client.query(`
        SELECT id, food FROM food_data where food like '%${query}%' limit 10;`);
        return result.rows;
    }
    catch (error) {
        console.error("Error fetching food options:", error);
        throw error;
    }
    finally {
        if (client) {
            client.release();
        }
    }
}

export { getFoodOptions };