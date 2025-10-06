const ApiError = require("../helper/apiError");
const mentorService = require("../services/mentro.service");
const httpStatus = require("../utils/httpStatus");

const getAllMentors = async (req, resizeBy, next) => {
  const mentors = await mentorService.getAllMentors();
  res.status(httpStatus.ok).json({
    success: true,
    mentors,
  });
};

const getMentorsInfoByUsername = async (req, resizeBy, next) => {
  const { username } = req.params;
  const mentor = await mentorService.getMentorByUsername(username);
  if (!mentor) {
    return next(new ApiError(httpStatus.notFound, "Mentor Not Found"));
  }
  res.status(httpStatus.ok).json({
    success: true,
    mentor,
  });
};

module.exports = {
  getAllMentors,
  getMentorsInfoByUsername,
};
