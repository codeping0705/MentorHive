const bcrypt = require("bcrypt");
const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    photoUrl: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["mentor", "student"],
      required: true,
    },
    profile: {
      tags: {
        type: [String],
        default: [],
      },
      title: {
        type: String,
        default: "",
      },
      bio: {
        type: String,
        default: "",
      },
      company: {
        type: String,
        default: "",
      },
      location: {
        type: String,
        default: "",
      },
      experience: {
        type: Number,
        default: 0,
      },
      college: { type: String, default: "" },
      degree: { type: String, default: "" },
      graduationYear: { type: Number, default: null },
      social: {
        linkedin: { type: String, default: "" },
        github: { type: String, default: "" },
        twitter: { type: String, default: "" },
        facebook: { type: String, default: "" },
        instagram: { type: String, default: "" },
      },
      // Add student-specific fields
    },
  },
  { timestamps: true }
);

// Compare password method
userSchema.methods.isPasswordMatch = async function (password) {
  return bcrypt.compare(password, this.password);
};

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

// Optional: hash password if using findOneAndUpdate
userSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();
  if (update.password) {
    update.password = await bcrypt.hash(update.password, 8);
  }
  next();
});

const UserModel = model("User", userSchema);
module.exports = UserModel;
