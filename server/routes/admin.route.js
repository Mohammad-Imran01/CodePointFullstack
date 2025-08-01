const router = require("express").Router();

const {
  retrieveLogInfo,
  deleteLogInfo,
  signin,
  updateServicePreference,
  retrieveServicePreference,
  getCommunities,
  getCommunity,
  addModerator,
  removeModerator,
  getModerators,
} = require("../controllers/admin.controller");

const {
  addCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/course.controller");

const {
  addInstructor,
  updateInstructor,
  removeInstructor,
} = require('../controllers/instructor.controller');
const { createGenericMCQ, updateGenericMCQById, deleteGenericMCQById } = require("../controllers/mcq/mcq.controller");

const requireAdminAuth = require("../middlewares/auth/adminAuth");
const {
  configLimiter,
  logLimiter,
  signUpSignInLimiter,
} = require("../middlewares/limiter/limiter");
const { createMCQ, updateMCQ, deleteMCQ } = require("../pg/controllers/pgMCQController");
const validateCourseCreator = require("../utils/validateCourseCreator");

router.post("/signin", signUpSignInLimiter, signin);

router.use(requireAdminAuth);

router.get("/community/:communityId", getCommunity);
router.get("/communities", getCommunities);
router.get("/moderators", getModerators);

router.patch("/add-moderators", addModerator);
router.patch("/remove-moderators", removeModerator);

router
  .route("/preferences")
  .get(configLimiter, retrieveServicePreference)
  .put(configLimiter, updateServicePreference);
router
  .route("/logs")
  .get(logLimiter, retrieveLogInfo)
  .delete(logLimiter, deleteLogInfo);

// Admin-only Course Routes (Already behind requireAdminAuth)
router.post("/products/course", configLimiter, validateCourseCreator, addCourse);
router.put("/products/course/:id", configLimiter, validateCourseCreator, updateCourse);
router.delete("/products/course/:id", configLimiter, validateCourseCreator, deleteCourse);
// Admin-only instructor Routes (Already behind requireAdminAuth)
router.post("/products/instructor", configLimiter, addInstructor);
router.put("/products/instructor/:id", configLimiter, updateInstructor);
router.delete("/products/instructor/:id", configLimiter, removeInstructor);


// changed backend to use pg mcqs instead of mongo mcqs, apis and controllers are changed accordingly
// Admin-only mcqs Routes (Already behind requireAdminAuth)
// router.post('/products/genericMCQs', configLimiter, createGenericMCQ)
// router.put('/products/genericMCQs/:id', configLimiter, updateGenericMCQById)
// router.delete('/products/genericMCQs/:id', configLimiter, deleteGenericMCQById)
router.post('/products/genericMCQs', configLimiter, createMCQ)
router.put('/products/genericMCQs/:id', configLimiter, updateMCQ)
router.delete('/products/genericMCQs/:id', configLimiter, deleteMCQ)

module.exports = router;
