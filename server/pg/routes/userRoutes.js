const express = require('express');
const router = express.Router();

// Import controller functions
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} = require('../controllers/pgUserController');

// POST create a new user
router.post('/user', createUser);
// GET all users
router.get('/users', getAllUsers);
// GET a specific user by ID
router.get('/user/:id', getUserById);
// PUT update a user by ID
router.put('/user/:id', updateUser);
// DELETE a user by ID
router.delete('/user/:id', deleteUser);

module.exports = router;
