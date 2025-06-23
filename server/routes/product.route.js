const router = require("express").Router();
const {
    getCourses,
    getCourseById,
} = require("../controllers/course.controller");

const {
    getInstructors,
    getInstructorById,
} = require('../controllers/instructor.controller');

const {
    getAllGenericMCQs,
    getGenericMCQById,
    createGenericMCQ,
    updateGenericMCQById,
    deleteGenericMCQById,
} = require("../controllers/mcq/mcq.controller");

// 🟢 PUBLIC ROUTES (No auth needed)
//courses
router.get("/courses", getCourses);
router.get("/course/:id", getCourseById);
//instructors
router.get("/instructors", getInstructors);
router.get("/instructor/:id", getInstructorById);
//mcqs
router.get('/genericMCQs', getAllGenericMCQs)
router.get('/genericMCQs/:id', getGenericMCQById)


module.exports = router;
