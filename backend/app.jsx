const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
require("./config/db.js");

const routes = require("./routes/v1");
const config = require("./config");
const { error } = require("console");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send({
    activeStatus: true,
    error: false,
  });
});

app.use(cookieParser());

app.use(config.PREFIX, routes);
app.use();
