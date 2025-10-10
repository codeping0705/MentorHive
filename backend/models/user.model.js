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
      unique: true,
      required: true,
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
      default: null,
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
      social: {
        linkedin: {
          type: String,
          default: "",
        },
        github: {
          type: String,
          default: "",
        },
        twitter: {
          type: String,
          default: "",
        },
        facebook: {
          type: String,
          default: "",
        },
        instagram: {
          type: String,
          default: "",
        },
      },
    },
  },
  { timestamps: true }
);

// Instance method to compare passwords
userSchema.methods.isPasswordMatch = async function (password) {
  return bcrypt.compare(password, this.password);
};

// Pre-save hook to hash password
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

// Index for email field
userSchema.index({ email: 1 });

const UserModel = model("User", userSchema);
module.exports = UserModel;
