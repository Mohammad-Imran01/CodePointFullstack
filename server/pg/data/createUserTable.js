const pool = require('../config/db')

const createUserTable = async () => {
    const queryText = `
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
    )
    `
    try {
        await pool.query(queryText)
        console.log(`Table created succesfully`);
    } catch (err) {
        console.log(`Error creating succesfully`);
    }
}


module.exports = createUserTable