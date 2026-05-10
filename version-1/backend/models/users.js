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
            `SELECT age, height, weight FROM user_profile WHERE user_id = $1`,
            [userId]
        );
        return res.rows[0];
    }
    catch (err) {
        console.error('Error retrieving user health metrics from the database:', err.message);
    }
    finally {
        if (client) { client.release(); }
    }
}




async function updateUserHealthMetrics({ userId, age, height, weight }) {
    let client;
    try {
        client = await pool.connect();
        console.log("Updating user health metrics:", { userId, age, height, weight });
        await client.query(
            `INSERT INTO user_profile (user_id, age, height, weight) VALUES ($1, $2, $3, $4)`,
            [userId, age, height, weight]
        );
        console.log('User health metrics updated successfully!');
    }
    catch (err) {
        console.error('Error updating user health metrics in the database:', err);
        throw err;
    }
    finally {
        if (client) client.release();
    }
}


export { databaseAddUser, databaseGetUser, getProfile, updateUserHealthMetrics, getUserHealthMetrics };