import { Pool } from 'pg';

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
export default pool;