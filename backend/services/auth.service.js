const UserModel = require("../models/user.model");
const ApiError = require("../helper/apiError");
const httpStatus = require("../utils/httpStatus");

const createUser = async (data) => {
  return await UserModel.create(data);
};

module.exports = {
  createUser,
};
