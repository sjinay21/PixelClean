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

  // PAYMENT SYSTEM
  // Defines user's subscription plan.
  // Will be updated later by Paddle webhook.
  subscriptionStatus: {
    type: String,
    default: "free", // free | pro | premium
  },

  // PAYMENT SYSTEM
  // Tracks how many times each tool is used.
  usage: {
    watermark: { type: Number, default: 0 },
    pdf: { type: Number, default: 0 },
    video: { type: Number, default: 0 },
    background: { type: Number, default: 0 },
    enhance: { type: Number, default: 0 },
    logo: { type: Number, default: 0 },
  }

}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
