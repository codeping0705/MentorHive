const express = require("express");
const router = express.Router();
const authRoute = require("./auth.route");
const homeRoute = require("./home.route");
const mentorRoute = require("./mentor.route");

router.use("/auth", authRoute);
router.use("/", homeRoute);
router.use("/mentor", mentorRoute);

module.exports = router;
