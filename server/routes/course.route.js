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
router.get("/course/:id", getCourseById);

// 🔒 ADMIN-ONLY ROUTES
// router.use(requireAdminAuth); // Apply admin auth below this line
// moved to admin.route.js
// router.post("/course", configLimiter, addCourse);
// router.put("/course/:id", configLimiter, updateCourse);
// router.delete("/course/:id", configLimiter, deleteCourse);

module.exports = router;
