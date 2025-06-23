const mongoose = require('mongoose');
const { Schema } = mongoose;

const GenericMCQ = new Schema({
    ques: {
        type: String,
        required: true,
        trim: true,
    },
    options: {
        type: [String],
        required: true,
        validate: {
            validator: (v) => Array.isArray(v) && v.length > 0,
            message: 'At least one option is required.',
        },
    },
    correctOption: {
        type: Number,
        required: true,
    },

    hint: {
        type: String,
        default: '',
    },
    answerDetail: {
        type: String,
        default: '',
    },
},
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('MCQ', GenericMCQ);
