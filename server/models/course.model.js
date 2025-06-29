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
    creators: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
        default: [mongoose.Types.ObjectId("6852cbaef20d5b8699f9b678")]
    },
    instructors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Instructor' }]
}, {
    timestamps: true
});
courseSchema.index({ title: "text", description: "text" });

module.exports = mongoose.model('Course', courseSchema);
