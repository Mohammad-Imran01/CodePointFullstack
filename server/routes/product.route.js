const router = require("express").Router();
const {
    addCourse,
    getCourses,
    getCourseById,
    updateCourse,
    deleteCourse,
} = require("../controllers/course.controller");

const {
    getInstructors,
    getInstructorById,
} = require('../controllers/instructor.controller')

const requireAdminAuth = require("../middlewares/auth/adminAuth");
const { configLimiter } = require("../middlewares/limiter/limiter");

// 🟢 PUBLIC ROUTES (No auth needed)
//courses
router.get("/courses", getCourses);
router.get("/course/:id", getCourseById);
//instructors
router.get("/instructors", getInstructors);
router.get("/instructor/:id", getInstructorById);

module.exports = router;
