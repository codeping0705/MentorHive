const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

// Connect DB
require("./config/db.js");

// Import routes and config
const routes = require("./routes/v1");
const config = require("./config");

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // ✅ you missed the () earlier

// Health check route
app.get("/", (req, res) => {
  res.send({
    activeStatus: true,
    error: false,
  });
});

// API routes with prefix
app.use(config.PREFIX, routes);

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ error: true, message: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: true, message: "Internal Server Error" });
});

// Export app for Vercel
module.exports = app;
