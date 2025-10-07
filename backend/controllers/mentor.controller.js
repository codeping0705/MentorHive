const mentorService = require("../services/mentor.service");
const ApiError = require("../helper/apiError");
const httpStatus = require("../utils/httpStatus");

const getAllMentors = async (req, res, next) => {
  try {
    console.log("📢 getAllMentors called");
    const mentors = await mentorService.getAllMentors();
    console.log("✅ Mentors fetched:", mentors);
    res.status(200).json({ success: true, mentors });
  } catch (error) {
    console.error("❌ Error in getAllMentors:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
  }
};

const getMentorsInfoByUsername = async (req, res, next) => {
  try {
    const { username } = req.params;
    const mentor = await mentorService.getMentorByUsername(username);
    if (!mentor) {
      return next(new ApiError(httpStatus.notFound, "Mentor Not Found"));
    }
    res.status(httpStatus.ok).json({ success: true, mentor });
  } catch (error) {
    console.error("❌ Error in getMentorsInfoByUsername:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
  }
};

module.exports = {
  getAllMentors,
  getMentorsInfoByUsername,
};
