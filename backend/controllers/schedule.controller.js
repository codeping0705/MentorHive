const scheduleService = require("../services/schedule.service");
const ApiError = require("../helper/apiError");
const httpStatus = require("../utils/httpStatus");

const createSchedule = async (req, res, next) => {
  try {
    const data = { ...req.body, mentor: req.user._id }; // assign mentor from logged-in user
    const schedule = await scheduleService.createSchedule(data);
    res.status(201).json({ schedule });
  } catch (err) {
    next(new ApiError(httpStatus.badRequest, err.message));
  }
};

const getSchedulesByMentor = async (req, res, next) => {
  try {
    const schedules = await scheduleService.getSchedulesByMentor(req.user._id);
    res.status(200).json({ schedules });
  } catch (err) {
    next(new ApiError(httpStatus.badRequest, err.message));
  }
};

module.exports = { createSchedule, getSchedulesByMentor };
