const mongoose = require("mongoose");

const validateCourseCreator = (req, res, next) => {
    const { userId, adminId } = req.query;

    if (!userId && !adminId) {
        return res.status(400).json({ message: "User ID or Admin ID is required." });
    }

    const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

    if (userId && !isValidObjectId(userId)) {
        return res.status(400).json({ message: "Invalid User ID." });
    }

    if (adminId && !isValidObjectId(adminId)) {
        return res.status(400).json({ message: "Invalid Admin ID." });
    }

    req.creator = userId ? { id: userId, role: "user" } : { id: adminId, role: "admin" };
    next();
};

module.exports = validateCourseCreator;
