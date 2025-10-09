const scheduleService = require("../services/schedule.service");
const httpStatus = require("../utils/httpStatus");

const createSchedule = async (req, res, next) => {
  try {
    const mentorId = req.user._id;
    const { mentee, date, time, topic } = req.body;

    const schedule = await scheduleService.createSchedule({
      mentor: mentorId,
      mentee,
      date,
      time,
      topic,
    });

    res.status(httpStatus.created).json({
      success: true,
      message: "Meeting scheduled successfully!",
      schedule,
    });
  } catch (error) {
    next(error);
  }
};

const getScheduleByMentor = async (req, res, next) => {
  try {
    const mentorId = req.user._id;
    const schedules = await scheduleService.getScheduleByMentor(mentorId);

    res.status(httpStatus.ok).json({
      success: true,
      schedules,
    });
  } catch (error) {
    next(error);
  }
};

const updateSchedule = async (req, res, next) => {
  try {
    const scheduleId = req.params.scheduleId;
    const updatedSchedule = await scheduleService.updateSchedule(scheduleId, req.body);

    res.status(httpStatus.ok).json({
      success: true,
      message: "Schedule updated successfully",
      schedule: updatedSchedule,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createSchedule,
  getScheduleByMentor,
  updateSchedule,
};
