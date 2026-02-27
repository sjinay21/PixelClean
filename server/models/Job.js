const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  toolType: {
    type: String,
  },
  originalFile: {
    type: String,
  },
  processedFile: {
    type: String,
  },
  status: {
    type: String,
    default: "pending",
  },
}, { timestamps: true });

module.exports = mongoose.model("Job", jobSchema);
