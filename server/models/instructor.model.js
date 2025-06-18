const mongoose = require('mongoose');

const instructorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    expertise: {
        type: String,
        required: true
    },
    experience: {
        type: Number,
        required: true
    },
    coursesTaught: {
        type: Number,
        required: true
    }, 
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]

}, {
    timestamps: true
});
instructorSchema.index({ name: "text", expertise: "text" });

module.exports = mongoose.model('Instructor', instructorSchema);
