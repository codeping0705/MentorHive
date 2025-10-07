const mongoose = require("mongoose");
const config = require(".");
mongoose.set("strictQuery", true);

mongoose
  .connect(config.DB_URL)
  .then(() => console.log("Database is connected!"))
  .catch((err) => {
    console.log("Database connection is not established .....");
    console.log(err);
  });

mongoose.connection.on("connected", () => {
  console.log("✅ Mongoose connected:", config.DB_URL);
});
mongoose.connection.on("error", (err) => {
  console.error("❌ Mongoose error:", err);
});
mongoose.connection.on("disconnected", () => {
  console.log("⚠️ Mongoose disconnected");
});

process.on("SIGINT", () => {
  process.exit(0);
});

module.exports = mongoose.connection;
