const jwt = require("jsonwebtoken");

/**
 * NOTE: This middleware for decoding JWT is not necessary when using Passport's JWT strategy.
 * Passport handles token decoding and user extraction automatically.
 */

// const decodeToken = (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   const token = authHeader.split(" ")[1];
//   try {
//     const decoded = jwt.verify(token, process.env.SECRET);
//     req.userId = decoded.id;
//     next();
//   } catch (err) {
//     res.status(401).json({ message: "Unauthorized" });
//   }
// };

// module.exports = decodeToken;


const jwt = require("jsonwebtoken");

/**
 * Middleware to decode and verify JWT or allow guest access.
 * If a valid JWT is provided, sets req.userId.
 * If guest token matches, sets req.isGuest = true.
 */

const decodeToken = (req, res, next) => {
  const authHeader = req.headers.authorization || "";

  if (!authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  if (token === process.env.GUEST_KEYWORD) {
    req.isGuest = true;
    return next(); // Allow guest access
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.userId = decoded.id;
    return next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = decodeToken;
