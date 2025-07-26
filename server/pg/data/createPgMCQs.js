const pool = require("../config/db");

const addCorrectOptionColumn = async () => {
    const queryText = `
        ALTER TABLE mcqTable
        ADD COLUMN IF NOT EXISTS correctOption INT NOT NULL DEFAULT -1;
    `;

    try {
        await pool.query(queryText);
        console.log('✅ Successfully added correctOption column');
    } catch (err) {
        console.error('❌ Failed to add correctOption column:', err.message || err);
    }
};


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
            correctOption INT NOT NULL DEFAULT -1,
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

module.exports = { createMCQTable, addCorrectOptionColumn };
