const express = require("express");
const mentorController = require("../../controllers/mentor.controller");
const asyncHandler = require("../../helper/asyncHandler");

const router = express.Router();

// GET /v1/mentor → all mentors
router.get("/", asyncHandler(mentorController.getAllMentors));

// GET /v1/mentor/:username → mentor by username
router.get(
  "/:username",
  asyncHandler(mentorController.getMentorsInfoByUsername)
);

module.exports = router;
