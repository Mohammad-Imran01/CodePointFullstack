const pool = require("../config/db");

const createMCQTable = async () => {
    const queryText = `
        CREATE TABLE IF NOT EXISTS mcqTable (
            id SERIAL PRIMARY KEY,
            categories VARCHAR(200) NOT NULL,
            question VARCHAR(500) UNIQUE NOT NULL,
            option1 VARCHAR(200) NOT NULL, 
            option2 VARCHAR(200) NOT NULL, 
            option3 VARCHAR(200) NOT NULL, 
            option4 VARCHAR(200) NOT NULL, 
            option5 VARCHAR(200), 
            option6 VARCHAR(200),
            answer VARCHAR(500) NOT NULL,
            hint VARCHAR(500)
        );
    `;

    try {
        await pool.query(queryText);
        console.log('✅ Successfully created mcqTable');
    } catch (err) {
        console.error('❌ Failed to create mcqTable:', err.message || err);
    }
};

module.exports = createMCQTable;
