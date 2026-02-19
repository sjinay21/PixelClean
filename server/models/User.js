const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  subscriptionStatus: {
    type: String,
    default: "free",
  },
  credits: {
    type: Number,
    default: 5,
  },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
