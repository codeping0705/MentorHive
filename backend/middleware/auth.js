const jwt = require("jsonwebtoken");
const { getUserById } = require("../services/user.service");
const ApiError = require("../helper/apiError");
const httpStatus = require("../utils/httpStatus");

const protect = async (req, res, next) => {
  let token;

  // Extract token from Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new ApiError(
        httpStatus.unAuthorized,
        "You are not logged in! Please log in first."
      )
    );
  }

  try {
    // ✅ FIXED: Use jwt.verify instead of jwt.verifyToken
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const currentUser = await getUserById(decoded._id);
    if (!currentUser) {
      return next(
        new ApiError(
          httpStatus.unAuthorized,
          "The user belonging to this token no longer exists."
        )
      );
    }

    req.user = currentUser;
    next();
  } catch (e) {
    console.error("JWT verification failed:", e.message);
    return next(
      new ApiError(httpStatus.unAuthorized, "You are not authorized.")
    );
  }
};

const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new ApiError(httpStatus.forbidden, "Access denied."));
    }
    next();
  };
};

module.exports = { protect, restrictTo };
