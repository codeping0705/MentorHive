const UserModel = require("../models/user.model");
const ApiError = require("../helper/apiError");
const httpStatus = require("../utils/httpStatus");

// Create new user
const createUser = async (data) => {
  return await UserModel.create(data);
};

// Login with email and password
const loginUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) {
    throw new ApiError(httpStatus.badRequest, "Email and password are required");
  }

  const user = await UserModel.findOne({ email }).select("+password");
  if (!user) {
    throw new ApiError(httpStatus.unAuthorized, "Incorrect email or password");
  }

  const isMatch = await user.isPasswordMatch(password);
  if (!isMatch) {
    throw new ApiError(httpStatus.unAuthorized, "Incorrect email or password");
  }

  return user;
};

module.exports = { createUser, loginUserWithEmailAndPassword };
