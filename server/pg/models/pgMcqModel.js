const pool = require('../config/db');

const pgMcqModel = {
    async getAllMcqService() {
        const res = await pool.query('SELECT * FROM mcqTable');
        return res.rows;
    },

    async getMcqByIdService(id) {
        const res = await pool.query('SELECT * FROM mcqTable WHERE id = $1', [id]);
        return res.rows[0];
    },

    async createMcqService(mcqObj) {
        const { categories, ques, options, correctOption, answerDetail, hint } = mcqObj;
        // console.log(
        //     '\n--------------------------------\n',
        //     categories, '\n',
        //     ques, '\n',
        //     options, '\n',
        //     correctOption, '\n',
        //     answerDetail, '\n',
        //     hint, '\n',
        //     '\n--------------------------------\n'
        // );
        // return mcqObj

        const res = await pool.query(`
        INSERT INTO mcqTable (
            categories, question, option1, option2, option3, option4, option5, option6, correctOption, answer, hint
        ) VALUES (
            $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11
        ) RETURNING *
    `, [
            categories || '',
            ques || '',
            options[0] || '',
            options[1] || '',
            options[2] || '',
            options[3] || '',
            options[4] || '', // fallback to empty string
            options[5] || '',
            correctOption || -1,
            answerDetail || '',
            hint || ''
        ]);

        return res.rows[0];
    },


    async updateMcqService(mcqObj) {
        const res = await pool.query(`
        UPDATE mcqTable SET
            categories = $1,
            question = $2,
            option1 = $3,
            option2 = $4,
            option3 = $5,
            option4 = $6,
            option5 = $7,
            option6 = $8,
            correctOption = $9,
            answer = $10,
            hint = $11
        WHERE id = $12
        RETURNING *
    `, [
            mcqObj.categories || '',
            mcqObj.question || '',
            mcqObj.option1 || '',
            mcqObj.option2 || '',
            mcqObj.option3 || '',
            mcqObj.option4 || '',
            mcqObj.option5 || '',
            mcqObj.option6 || '',
            mcqObj.correctOption || -1,
            mcqObj.answer || '',
            mcqObj.hint || '',
            mcqObj.id
        ]);
        return res.rows[0];
    },

    async deleteMcqService(id) {
        const res = await pool.query('DELETE FROM mcqTable WHERE id = $1 RETURNING *', [id]);
        return res.rows[0];
    }
};

module.exports = pgMcqModel;
