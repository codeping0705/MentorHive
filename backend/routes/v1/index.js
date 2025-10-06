// routes/v1.js
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "API v1 working!" });
});

module.exports = router;
