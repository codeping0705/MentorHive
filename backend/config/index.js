require("dotenv").config();

module.exports = {
  PORT: process.env.PORT,
  DB_URl: process.env.DB_URl,
  PREFIX: process.env.PREFIX || "/v1",
};
