const tokenService = require("../services/token.service");
const { getUserById } = require("../services/user.service");
const ApiError = require("../helper/apiError");
const httpStatus = require("../utils/httpStatus");

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new ApiError(httpStatus.unauthorized, "You are not logged in!"));
  }

  try {
    // Verify token using your tokenService
    const decoded = tokenService.verifyToken(token, "accessToken");

    const currentUser = await getUserById(decoded._id);

    if (!currentUser) {
      return next(new ApiError(httpStatus.unauthorized, "User no longer exists"));
    }

    req.user = currentUser;
    next();
  } catch (err) {
    return next(new ApiError(httpStatus.unauthorized, "Token invalid or expired"));
  }
};

const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new ApiError(httpStatus.unauthorized, "You are not allowed"));
    }
    next();
  };
};

module.exports = { protect, restrictTo };
