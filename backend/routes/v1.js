// backend/routes/v1.js
const express = require("express");
const router = express.Router();

// Root of /v1
router.get("/", (req, res) => {
  res.json({ message: "Welcome to API v1 🚀" });
});

// Example route
router.get("/hello", (req, res) => {
  res.json({ message: "API v1 working 🚀" });
});

module.exports = router;
