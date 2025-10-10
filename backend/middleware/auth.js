const jwt = require("jsonwebtoken");
const { getUserById } = require("../services/user.service");
const ApiError = require("../helper/apiError");
const httpStatus = require("../utils/httpStatus");

const protect = async (req, res, next) => {
  let token;

  // Get token from Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new ApiError(httpStatus.unAuthorized, "You are not logged in! Please log in first.")
    );
  }

  try {
    // Verify token using JWT_SECRET
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    const currentUser = await getUserById(decoded._id);
    if (!currentUser) {
      return next(
        new ApiError(httpStatus.unAuthorized, "The user belonging to this token no longer exists.")
      );
    }

    req.user = currentUser; // Attach user to request
    next();
  } catch (err) {
    console.error("JWT verification failed:", err.message);
    return next(new ApiError(httpStatus.unAuthorized, "You are not authorized."));
  }
};

const restrictTo = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return next(new ApiError(httpStatus.forbidden, "Access denied."));
  }
  next();
};

module.exports = { protect, restrictTo };