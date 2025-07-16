const pool = require('../config/db.js');

const pgUserModel = {
    async getAllUsersService() {
        const res = await pool.query('SELECT * FROM users');
        return res.rows;
    },

    async getUserByIdService(id) {
        const res = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
        return res.rows[0];
    },

    async createUserService({ name, email }) {
        const res = await pool.query(
            'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
            [name, email]
        );
        return res.rows[0];
    },

    async updateUserService(id, name, email ) {
        const res = await pool.query(
            'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *',
            [name, email, id]
        );
        return res.rows[0];
    },

    async deleteUserService(id) {
        const res = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
        return res.rows[0];
    }
};

module.exports = pgUserModel;