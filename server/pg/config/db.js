const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.PG_USER,       // e.g., 'postgres'
    host: process.env.PG_HOST,       // e.g., 'localhost'
    database: process.env.PG_DB,     // e.g., 'mydatabase'
    password: process.env.PG_PASSWORD,
    port: parseInt(process.env.PG_DB_PORT, 5432),   // usually 5432
});

pool.on("connect", () => {
    console.log('✅ Connection pool established with PostgreSQL database');
});

module.exports = pool;
