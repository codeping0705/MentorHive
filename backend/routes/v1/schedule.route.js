const express = require("express");
const scheduleController = require("../../controllers/schedule.controller");
const authMiddleware = require("../../middleware/auth");
const validate = require("../../middleware/validate");
const { createScheduleSchema } = require("../../validations/schedule.validation");
const asyncHandler = require("../../helper/asyncHandler");

const router = express.Router();

// Create new schedule
router.post(
  "/",
  authMiddleware.restrictTo("mentor"),
  validate(createScheduleSchema),
  asyncHandler(scheduleController.createSchedule)
);

// Get mentor's schedule
router.get(
  "/",
  authMiddleware.restrictTo("mentor"),
  asyncHandler(scheduleController.getScheduleByMentor)
);

// Update schedule
router.put(
  "/:scheduleId",
  authMiddleware.restrictTo("mentor"),
  asyncHandler(scheduleController.updateSchedule)
);

module.exports = router;
