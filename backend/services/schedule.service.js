const ScheduleModel = require("../models/schedule.model");

const createSchedule = async (data) => {
  return await ScheduleModel.create(data);
};

const getSchedulesByMentor = async (mentorId) => {
  return await ScheduleModel.find({ mentor: mentorId })
    .populate("student", "name email") // changed
    .populate("service", "serviceName price");
};

module.exports = { createSchedule, getSchedulesByMentor };
