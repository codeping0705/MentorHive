const bcrypt = require("bcrypt");
const { required } = require("joi");
const { Schema, model } = require("mongoose");
const { type } = require("os");

const userSchema = new Schema({
  name: {
    type: Schema.Types.String,
    required: true,
    trim: true,
  },
  username: {
    type: Schema.Types.String,
    required: true,
    trim: true,
    unique: true,
  },
  email: {
    type: Schema.Types.String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: Schema.Types.String,
    required: true,
    trim: true,
    unique: true,
  },
  role: {
    type: Schema.Types.String,
    enum: ["menotr", "student"],
    default: null,
  },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

// for fast searching indexing method
userSchema.index({ email: 1 });

const userModel = model("User", userSchema);
module.exports = userModel;
