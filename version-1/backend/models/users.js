import pool from './database.js';
import generateAvatar from "../services/profileGenerator.js"

async function databaseAddUser({ username, password, email }) {
    let client;
    try {
        client = await pool.connect();
        await client.query(
            `INSERT INTO users (username, password, email,image_url) VALUES ($1, $2, $3,$4)`,
            [username, password, email, generateAvatar()]
        );
        const res = await client.query(`SELECT id FROM users WHERE email = $1`, [email]);
        console.log('User added to the database successfully!', res.rows[0]);
        return { id: res.rows[0].id };
    }
    catch (err) {
        console.error('Error adding user to the database:', err.message);
        throw err;
    }
    finally {
        if (client) client.release();
    }
}

async function databaseGetUser({ email }) {
    let client;
    try {
        client = await pool.connect();
        const res = await client.query(
            `SELECT * FROM users WHERE email = $1`,
            [email]
        );
        return res.rows[0];
    }
    catch (err) {
        console.error('Error retrieving user from the database:', err.message);
    }
    finally {
        if (client) { client.release(); }
    }
}

async function getProfile({ userId }) {
    let client;
    try {
        client = await pool.connect();
        const res = await client.query(
            `SELECT username, email,image_url FROM users WHERE id = $1`,
            [userId]
        );
        return res.rows[0];
    }
    catch (err) {
        console.error('Error retrieving user profile from the database:', err.message);
    }
    finally {
        if (client) client.release();
    }

}

async function getUserHealthMetrics(userId) {
    let client;
    try {
        client = await pool.connect();
        const res = await client.query(
            `SELECT age, height, weight,calorie_goal,protein_goal,fat_goal,fiber_goal,sugar_goal,carbs_goal FROM user_profile WHERE user_id = $1`,
            [userId]
        );
        return res.rows[0];
    }
    catch (err) {
        console.error('Error retrieving user health metrics from the database:', err);
    }
    finally {
        if (client) { client.release(); }
    }
}

async function updateUserNutriGoals({ user_id, goals }) {
    let client;
    try {
        client = await pool.connect()
        await client.query(
            `UPDATE user_profile SET calorie_goal=$2,protein_goal=$3,sugar_goal=$4,fat_goal=$5,fiber_goal=$6,carbs_goal=$7 WHERE user_id=$1`,
            [user_id, goals.tdee, goals.protein, goals.sugar, goals.fat, goals.fiber, goals.carbs]
        );
    }
    catch (err) {
        console.log("Error Occured ", err)
    }
    finally {
        if (client) { client.release() }
    }

}


async function updateUserHealthMetrics({ userId, age, height, weight, gender, activity }) {
    let client;
    try {
        client = await pool.connect();
        console.log("Updating user health metrics:", { userId, age, height, weight, gender, activity });
        await client.query(
            `INSERT INTO user_profile (user_id, age, height, weight,gender,activity) VALUES ($1, $2, $3, $4, $5, $6)`,
            [userId, age, height, weight, gender, activity]
        );
        console.log('User health metrics updated successfully!');
    }
    catch (err) {
        console.error('Error updating user health metrics in the database:', err);
    }
    finally {
        if (client) { client.release(); }
    }
}


export { databaseAddUser, databaseGetUser, getProfile, updateUserHealthMetrics, getUserHealthMetrics, updateUserNutriGoals };