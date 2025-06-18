const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    level: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced'],
        required: true
    },
    price: {
        type: String,
        required: true
    },
    instructors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Instructor' }]
}, {
    timestamps: true
});
courseSchema.index({ title: "text", description: "text" });

module.exports = mongoose.model('Course', courseSchema);
