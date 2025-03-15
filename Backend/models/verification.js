const mongoose = require("mongoose");

const verificationSchema = new mongoose.Schema({
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  accessCode: { type: String, required: true }, // Unique code for quiz access
  isVerified: { type: Boolean, default: false },
});

module.exports = mongoose.model("Verification", verificationSchema);
