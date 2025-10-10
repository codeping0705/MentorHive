const express = require("express");
const router = express.Router();
const { protect, restrictTo } = require("../../middleware/auth");
const scheduleController = require("../../controllers/schedule.controller");

// Only mentors can create and view their schedules
router.use(protect);
router.post("/", restrictTo("mentor"), scheduleController.createSchedule);
router.get("/", restrictTo("mentor"), scheduleController.getSchedulesByMentor);

module.exports = router;
