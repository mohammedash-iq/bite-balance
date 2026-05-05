import pool from './database.js';

async function databaseAddUser({ username, password, email }) {
    let client;
    try {
        client = await pool.connect();
        await client.query(
            `INSERT INTO users (username, password, email) VALUES ($1, $2, $3)`,
            [username, password, email]
        );

        console.log('User added to the database successfully!');
        return { id: client.lastID };
    }
    catch (err) {
        console.error('Error adding user to the database:', err.message);
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
        client.release();
    }
}

export { databaseAddUser, databaseGetUser };