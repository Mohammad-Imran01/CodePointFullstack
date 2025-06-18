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
} = require('../controllers/instructor.controller')

const requireAdminAuth = require("../middlewares/auth/adminAuth");
const {
  configLimiter,
  logLimiter,
  signUpSignInLimiter,
} = require("../middlewares/limiter/limiter");

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
router.post("/products/course", configLimiter, addCourse);
router.put("/products/course/:id", configLimiter, updateCourse);
router.delete("/products/course/:id", configLimiter, deleteCourse);
// Admin-only Course Routes (Already behind requireAdminAuth)
router.post("/products/instructor", configLimiter, addInstructor);
router.put("/products/instructor/:id", configLimiter, updateInstructor);
router.delete("/products/instructor/:id", configLimiter, removeInstructor);

module.exports = router;
