const { mongoose, Schema, model } = require("mongoose");

const serviceSchema = new Schema(
  {
    mentor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    duration: { type: Number, required: true },
    price: { type: Number, required: true },
    active: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = model("Service", serviceSchema);
