const express = require('express');
const router = express.Router();

const {
    getAllMCQs,
    getMCQById,
    createMCQ,
    updateMCQ,
    deleteMCQ
} = require('../controllers/pgMCQController');



  

module.exports = router;
