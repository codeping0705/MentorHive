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

// ✅ Use routes
app.use(config.PREFIX, routes);


module.exports = app;
