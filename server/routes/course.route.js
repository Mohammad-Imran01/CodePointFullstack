const router = require("express").Router();
const {
    addCourse,
    getCourses,
    getCourseById,
    updateCourse,
    deleteCourse,
} = require("../controllers/course.controller");

const requireAdminAuth = require("../middlewares/auth/adminAuth");
const { configLimiter } = require("../middlewares/limiter/limiter");

// 🟢 PUBLIC ROUTES (No auth needed)
router.get("/courses", getCourses);
router.get("/courses/:id", getCourseById);

// 🔒 ADMIN-ONLY ROUTES
// router.use(requireAdminAuth); // Apply admin auth below this line

router.post("/addCourse", configLimiter, addCourse);
router.put("/courses/:id", configLimiter, updateCourse);
router.delete("/courses/:id", configLimiter, deleteCourse);

module.exports = router;
