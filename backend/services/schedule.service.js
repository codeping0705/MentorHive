const ScheduleModel = require("../models/schedule.model");

const createSchedule = async (scheduleData) => {
  return await ScheduleModel.create(scheduleData);
};

const getScheduleByMentor = async (mentorId) => {
  return await ScheduleModel.find({ mentor: mentorId })
    .populate("mentee", "name email") // populate mentee info
    .sort({ date: 1, time: 1 });
};

const updateSchedule = async (scheduleId, updateData) => {
  return await ScheduleModel.findByIdAndUpdate(scheduleId, updateData, { new: true });
};

module.exports = {
  createSchedule,
  getScheduleByMentor,
  updateSchedule,
};
