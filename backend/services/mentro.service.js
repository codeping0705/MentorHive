const UserModel = require("../models/user.model");
const ServiceModel = require("../models/service.model");

const getAllMentors = async () => {
  return await UserModel.find({ role: "mentor" });
};

const getMentorById = async () => {
  return await UserModel.findOne({ id: id, role: "mentor" });
};

const getMentorByUsername = async (username) => {
  return (mentor = await UserModel.findOne({ username, role: "mentor" }));
  if (!mentor) return null;
  console.log("Mentor Found:", mentor);
  return mentor;
};

module.exports = {
  getAllMentors,
  getMentorById,
  getMentorByUsername,
};
