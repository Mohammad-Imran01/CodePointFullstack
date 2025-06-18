const Instructor = require('../models/instructor.model');

// ✅ Add new instructor
const addInstructor = async (req, res) => {
    try {
        const { name, expertise, experience, coursesTaught } = req.body;

        if (!name || !expertise || experience == null || coursesTaught == null) {
            return res.status(400).json({
                message: 'All fields are required to add an Instructor',
                error: 'Missing fields',
            });
        }

        const newInstructor = new Instructor({ name, expertise, experience, coursesTaught });
        await newInstructor.save();

        res.status(201).json({
            message: 'Instructor added successfully',
            instructor: newInstructor,
        });
    } catch (err) {
        console.error('Error adding instructor:', err);
        res.status(500).json({
            message: 'Server error while adding the Instructor',
            error: err.message,
        });
    }
};

// ✅ Get all instructors
const getInstructors = async (req, res) => {
    try {
        const instructors = await Instructor.find().sort({ createdAt: -1 });
        res.status(200).json(instructors);
    } catch (err) {
        console.error('Error fetching instructors:', err);
        res.status(500).json({
            message: 'Server error while fetching instructor data',
            error: err.message,
        });
    }
};

// ✅ Update instructor by ID (from req.params.id)
const updateInstructor = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, expertise, experience, coursesTaught } = req.body;

        if (!id) {
            return res.status(400).json({ message: 'Instructor ID is required' });
        }

        const instructor = await Instructor.findById(id);
        if (!instructor) {
            return res.status(404).json({ message: 'Instructor not found' });
        }

        instructor.name = name ?? instructor.name;
        instructor.expertise = expertise ?? instructor.expertise;
        instructor.experience = experience ?? instructor.experience;
        instructor.coursesTaught = coursesTaught ?? instructor.coursesTaught;

        await instructor.save();

        res.status(200).json({
            message: 'Instructor updated successfully',
            instructor,
        });
    } catch (err) {
        console.error('Error updating instructor:', err);
        res.status(500).json({
            message: 'Server error while updating instructor',
            error: err.message,
        });
    }
};

// ✅ Get a single instructor by ID (optional, not used in your routes above)
const getInstructorById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: 'Instructor ID is required' });
        }

        const instructor = await Instructor.findById(id);

        if (!instructor) {
            return res.status(404).json({ message: 'Instructor not found' });
        }

        res.status(200).json(instructor);
    } catch (err) {
        console.error('Error fetching instructor by ID:', err);
        res.status(500).json({
            message: 'Server error while fetching instructor',
            error: err.message,
        });
    }
};

// ✅ Remove instructor by ID (from req.params.id)
const removeInstructor = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) return res.status(400).json({ message: 'Instructor ID is required' });

        const instructor = await Instructor.findByIdAndDelete(id);

        if (!instructor) {
            return res.status(404).json({ message: 'Instructor not found' });
        }

        res.status(200).json({
            message: 'Instructor deleted successfully',
            instructor,
        });
    } catch (err) {
        console.error('Error deleting instructor:', err);
        res.status(500).json({
            message: 'Server error while deleting instructor',
            error: err.message,
        });
    }
};

module.exports = {
    addInstructor,
    getInstructors,
    getInstructorById,
    updateInstructor,
    removeInstructor,
};
