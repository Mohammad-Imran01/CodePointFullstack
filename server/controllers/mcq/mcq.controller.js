const mongoose = require('mongoose');
const GenericMCQ = require('../../models/mcq/generic.model');

// Response Messages
const ResMessage = {
    GENERIC_MCQ_NOT_FOUND: 'MCQ not found.',
    GENERIC_MCQ_FOUND: 'MCQ found.',
    GENERIC_MCQ_CREATED: 'MCQ created successfully.',
    GENERIC_MCQ_UPDATED: 'MCQ updated successfully.',
    GENERIC_MCQ_DELETED: 'MCQ deleted successfully.',
    GENERIC_MCQ_FETCH_ERROR: 'Error fetching MCQs.',
};

// Utility: Validate ID
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// Utility: Extract and validate required MCQ fields
const extractMCQFields = (body) => {
    const { ques, options, correctOption, hint = '', answerDetail = '' } = body;

    if (!ques?.trim()) throw new Error('Question is required.');
    if (!Array.isArray(options) || options.length < 1 || options.some(o => !o.trim())) {
        throw new Error('At least one non-empty option is required.');
    }
    if (
        typeof correctOption !== 'number' ||
        correctOption < 0 ||
        correctOption >= options.length
    ) {
        throw new Error('Correct option index is invalid.');
    }

    return { ques, options, correctOption, hint, answerDetail };
};

// Get all MCQs
const getAllGenericMCQs = async (req, res) => {
    try {
        const mcqs = await GenericMCQ.find().sort({ createdAt: -1 });
        res.status(200).json(mcqs);
    } catch (error) {
        res.status(500).json({ message: ResMessage.GENERIC_MCQ_FETCH_ERROR, details: error.message });
    }
};

// Get MCQ by ID
const getGenericMCQById = async (req, res) => {
    if (!isValidObjectId(req.params.id))
        return res.status(400).json({ message: 'Invalid MCQ ID' });

    try {
        const mcq = await GenericMCQ.findById(req.params.id);
        if (!mcq) {
            return res.status(404).json({ message: ResMessage.GENERIC_MCQ_NOT_FOUND });
        }
        res.status(200).json(mcq);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving MCQ', details: error.message });
    }
};

// Create new MCQ
const createGenericMCQ = async (req, res) => {
    try {
        const mcqData = extractMCQFields(req.body);
        const newMCQ = new GenericMCQ(mcqData);
        await newMCQ.save();
        res.status(201).json({ message: ResMessage.GENERIC_MCQ_CREATED, mcq: newMCQ });
    } catch (error) {
        res.status(400).json({ message: 'Error creating MCQ', details: error.message });
    }
};

// Update MCQ by ID
const updateGenericMCQById = async (req, res) => {
    console.log('This data has error cant be updated', req.body)

    if (!isValidObjectId(req.params.id))
        return res.status(400).json({ message: 'Invalid MCQ ID' });

    try {
        const mcqData = extractMCQFields(req.body);

        const updatedMCQ = await GenericMCQ.findByIdAndUpdate(
            req.params.id,
            mcqData,
            { new: true, runValidators: true }
        );

        if (!updatedMCQ) {
            return res.status(404).json({ message: ResMessage.GENERIC_MCQ_NOT_FOUND });
        }

        console.log('Done update', updatedMCQ)

        res.status(200).json({ message: ResMessage.GENERIC_MCQ_UPDATED, mcq: updatedMCQ });
    } catch (error) {
        res.status(400).json({ message: 'Error updating MCQ', details: error.message });
    }
};

// Delete MCQ by ID
const deleteGenericMCQById = async (req, res) => {
    if (!isValidObjectId(req.params.id))
        return res.status(400).json({ message: 'Invalid MCQ ID' });

    try {
        const deletedMCQ = await GenericMCQ.findByIdAndDelete(req.params.id);

        if (!deletedMCQ) {
            return res.status(404).json({ message: ResMessage.GENERIC_MCQ_NOT_FOUND });
        }

        res.status(200).json({ message: ResMessage.GENERIC_MCQ_DELETED });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting MCQ', details: error.message });
    }
};

module.exports = {
    getAllGenericMCQs,
    getGenericMCQById,
    createGenericMCQ,
    updateGenericMCQById,
    deleteGenericMCQById,
};
