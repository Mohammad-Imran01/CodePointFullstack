const { handleResponse } = require('../../utils/generic');
const {
    getAllMcqService,
    getMcqByIdService,
    createMcqService,
    updateMcqService,
    deleteMcqService,
} = require('../models/pgMcqModel');

const extractMCQFields = (obj) => {
    return {
        categories,
        question,
        option1,
        option2,
        option3,
        option4,
        option5,
        option6,
        correctOption,
        answer,
        hint,
        id
    } = obj;
};

// CREATE
const createMCQ = async (req, res, next) => {
    try {
        const data = extractMCQFields(req.body);
        // const newMCQ = await createMcqService(data);
        // handleResponse(res, 201, 'MCQ created successfully.', newMCQ);
        console.log("data", data);
        handleResponse(res, 201, 'MCQ created successfully.', data);
    } catch (e) {
        next(e);
    }
};

// GET ALL
const getAllMCQs = async (req, res, next) => {
    try {
        const mcqs = await getAllMcqService();
        handleResponse(res, 200, 'MCQs fetched successfully.', mcqs);
    } catch (e) {
        next(e);
    }
};

// GET BY ID
const getMCQById = async (req, res, next) => {
    try {
        const mcq = await getMcqByIdService(req.params.id);
        if (!mcq) return handleResponse(res, 404, 'MCQ Not Found');
        handleResponse(res, 200, 'MCQ fetched successfully.', mcq);
    } catch (e) {
        next(e);
    }
};

// UPDATE
const updateMCQ = async (req, res, next) => {
    try {
        const data = extractMCQFields(req.body);
        const updatedMCQ = await updateMcqService(req.params.id, data);
        if (!updatedMCQ) return handleResponse(res, 404, 'MCQ Not Found');
        handleResponse(res, 200, 'MCQ updated successfully.', updatedMCQ);
    } catch (e) {
        next(e);
    }
};

// DELETE
const deleteMCQ = async (req, res, next) => {
    try {
        const deletedMCQ = await deleteMcqService(req.params.id);
        if (!deletedMCQ) return handleResponse(res, 404, 'MCQ Not Found');
        handleResponse(res, 200, 'MCQ deleted successfully.', deletedMCQ);
    } catch (e) {
        next(e);
    }
};

module.exports = {
    createMCQ,
    getAllMCQs,
    getMCQById,
    updateMCQ,
    deleteMCQ,
};
