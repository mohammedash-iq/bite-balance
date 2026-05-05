import { Pool } from 'pg';
import dotenv from 'dotenv';
import fs from 'fs';

const pool = new Pool({
    min: 0,
    idleTimeoutMillis: 5000,
    connectionTimeoutMillis: 3000,
    user: "admin",
    host: "127.0.0.1",
    database: "bite_balance",
    password: "password",
    port: 5432,
});

const sql = fs.readFileSync("./schema.sql").toString();

async function initializeDatabase() {
    let client;
    try {
        client = await pool.connect();
        console.log("Connected to the database successfully!");
        await client.query(sql);
        console.log('Database initialized successfully!');
        const res = await client.query("select * from food_data limit 5")
        console.log(res.rows);
    }
    catch (err) {
        console.error('Error initializing the database:', err.message);
    }
    finally {
        if (client) client.release();
    }
}
initializeDatabase().catch(err => console.error('Database initialization failed:', err.message));
export default pool;