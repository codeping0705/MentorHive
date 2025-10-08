const userService = require("../services/auth.service");
const httpStatus = require("../utils/httpStatus");
const tokenService = require("../services/token.service");
const ApiError = require("../helper/apiError");

const signUp = async (req, res, next) => {
  try {
    const { name, username, email, password, role } = req.body;

    if (!name || !username || !email || !password || !role) {
      throw new ApiError(httpStatus.badRequest, "All fields are required");
    }

    const user = await userService.createUser({
      name,
      username,
      email,
      password,
      role,
    });
    user.password = undefined;

    return res.status(httpStatus.created).json({
      message: "Account created successfully!",
      user,
    });
  } catch (error) {
    next(error);
  }
};

const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new ApiError(
        httpStatus.badRequest,
        "Email and password are required"
      );
    }

    const user = await userService.loginUserWithEmailAndPassword(
      email,
      password
    );

    const token = tokenService.generateAuthToken(user);

    user.password = undefined;

    return res.status(httpStatus.ok).json({
      message: "User signed in successfully!",
      token,
      user,
    });
  } catch (error) {
    console.error("SignIn Error:", error); // << Add this line
    next(error);
  }
};

module.exports = { signUp, signIn };
