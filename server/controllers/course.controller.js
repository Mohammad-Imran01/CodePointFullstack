const Course = require("../models/course.model");
const User = require("../models/user.model");

// Get all courses
const getCourses = async (req, res) => {
    try {
        const courses = await Course.find().sort({ createdAt: -1 });
        res.status(200).json(courses);
    } catch (error) {
        console.error("Get Courses Error:", error);
        res.status(500).json({ message: "Failed to fetch courses" });
    }
};

// Get a single course by ID
const getCourseById = async (req, res) => {
    try {
        console.log('body', req.params)
        const course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        res.status(200).json(course);
    } catch (error) {
        console.error("Get Course Error:", error);
        res.status(500).json({ message: "Failed to fetch course" });
    }
};

const addCourse = async (req, res) => {
    try {
        const { title, description, duration, level, price } = req.body;
        const { id: creatorId, role } = req.creator;
        console.log(title, description, duration, level, price)

        if (!title || !description || !duration || !level || !price) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const newCourse = new Course({
            title,
            description,
            duration,
            level,
            price,
            creators: [creatorId],
        });

        await newCourse.save();

        if (role === "user") {
            await User.findByIdAndUpdate(creatorId, {
                $push: { coursesCreated: newCourse._id },
            });
        }

        res.status(201).json({ message: "Course added successfully", course: newCourse });
    } catch (error) {
        console.error("Add Course Error:", error);
        res.status(500).json({ message: "Server error while adding course" });
    }
};


const updateCourse = async (req, res) => {
    try {
        const { title, description, duration, level, price } = req.body;
        const { id: creatorId } = req.creator;

        const updatedCourse = await Course.findOneAndUpdate(
            { _id: req.params.id, creators: creatorId }, // ensure ownership
            { title, description, duration, level, price },
            { new: true, runValidators: true }
        );

        if (!updatedCourse) {
            return res.status(404).json({ message: "Course not found or unauthorized" });
        }

        res.status(200).json({ message: "Course updated successfully", course: updatedCourse });
    } catch (error) {
        console.error("Update Course Error:", error);
        res.status(500).json({ message: "Failed to update course" });
    }
};


const deleteCourse = async (req, res) => {
    try {
        const { id: creatorId, role } = req.creator;

        const course = await Course.findOne({
            _id: req.params.id,
            creators: creatorId,
        });

        if (!course) {
            return res.status(404).json({ message: "Course not found or unauthorized" });
        }

        await course.deleteOne();

        // Remove from user if role is user
        if (role === "user") {
            await User.findByIdAndUpdate(creatorId, {
                $pull: { coursesCreated: req.params.id },
            });
        }

        res.status(200).json({ message: "Course deleted successfully" });
    } catch (error) {
        console.error("Delete Course Error:", error);
        res.status(500).json({ message: "Failed to delete course" });
    }
};

module.exports = {
    addCourse,
    getCourses,
    getCourseById,
    updateCourse,
    deleteCourse,
};
