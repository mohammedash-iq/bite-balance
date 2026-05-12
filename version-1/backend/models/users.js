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
        console.log('User added to the database successfully!');
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

async function getUserHealthMetrics({ userId }) {
    let client;
    try {
        client = await pool.connect();
        const res = await client.query(
            `SELECT age, height, weight,calorie_goal as calorie,protein_goal as protein,fat_goal as fat,fiber_goal as fiber,sugar_goal as sugar,carbs_goal as carbohydrates FROM user_profile WHERE user_id = $1`,
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
async function getUserTodaysMeals({ userId }) {
    let client;
    try {
        client = await pool.connect()
        const res = await client.query(`SELECT e.time_consumed, e.portion,d.food,d.calorie FROM user_food_data e INNER JOIN food_data d ON e.food_id = d.id  WHERE e.user_id=$1`, [userId])
        return res.rows
    }
    catch (err) {
        console.log(err);
    }
    finally {
        if (client) { client.release() }
    }

}

async function getUserTodaysNutritions({ userId }) {
    let client;
    try {
        client = await pool.connect();
        const todaysNutritions = await client.query(`SELECT COALESCE (SUM(d.sugar),0)as sugar,SUM(d.calorie) as calorie,SUM(d.fat) as fat,SUM(d.protein) as protein, SUM(d.fiber) as fiber,SUM(d.carbohydrates) as carbohydrates FROM user_food_data e INNER JOIN food_data d ON e.food_id = d.id  WHERE e.user_id=$1`, [userId]);
        return todaysNutritions.rows;
    }
    catch (err) {
        console.log("Error occurrd getting user todays Nutrition", err);
    }
    finally {
        if (client) { client.release(); }
    }
}


export { databaseAddUser, databaseGetUser, getProfile, updateUserHealthMetrics, getUserHealthMetrics, updateUserNutriGoals, getUserTodaysMeals, getUserTodaysNutritions };