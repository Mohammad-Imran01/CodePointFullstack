const Course = require("../models/course.model");

// Create a new course
const addCourse = async (req, res) => {
    console.log('Addcourse', req.body)
    try {
        const { title, description, duration, level, price } = req.body;

        console.log(req.body)

        if (!title || !description || !duration || !level || !price) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const newCourse = new Course({ title, description, duration, level, price });
        await newCourse.save();

        res.status(201).json({ message: "Course added successfully", course: newCourse });
    } catch (error) {
        console.error("Add Course Error:", error);
        res.status(500).json({ message: "Server error while adding course" });
    }
};

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

// Update a course by ID
const updateCourse = async (req, res) => {
    console.log('updateCourse', req.body)

    try {
        const { title, description, duration, level, price } = req.body;

        const updatedCourse = await Course.findByIdAndUpdate(
            req.params.id,
            { title, description, duration, level, price },
            { new: true, runValidators: true }
        );

        if (!updatedCourse) {
            return res.status(404).json({ message: "Course not found" });
        }

        res.status(200).json({ message: "Course updated successfully", course: updatedCourse });
    } catch (error) {
        console.error("Update Course Error:", error);
        res.status(500).json({ message: "Failed to update course" });
    }
};

// Delete a course by ID
const deleteCourse = async (req, res) => {

    console.log('deleteCourse', req.body)
    try {
        const deleted = await Course.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: "Course not found" });
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
