const UserModel = require("../models/user.model");

const getAllMentors = async () => {
  try {
    const mentors = await UserModel.find({ role: "mentor" });
    return mentors;
  } catch (error) {
    console.error("❌ Error in mentor.service.getAllMentors:", error);
    throw error;
  }
};

const getMentorByUsername = async (username) => {
  try {
    const mentor = await UserModel.findOne({ username, role: "mentor" });
    if (!mentor) return null;
    return mentor;
  } catch (error) {
    console.error("❌ Error in mentor.service.getMentorByUsername:", error);
    throw error;
  }
};

module.exports = {
  getAllMentors,
  getMentorByUsername,
};
