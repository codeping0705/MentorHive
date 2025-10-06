const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
require("./config/db.js");

const routes = require("./routes/v1"); // ✅ must export a router
const config = require("./config"); // ✅ must export PREFIX

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Health check
app.get("/v1/", (req, res) => {
  res.json({ activeStatus: true, error: false });
});

// ✅ Use routes
app.use(config.PREFIX, routes);

// const PORT = config.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

module.exports = app;
