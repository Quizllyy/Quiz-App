const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz", required: true },
  text: { type: String, required: true },
  options: { type: [String], required: true },
  correctAnswers: { type: [mongoose.Schema.Types.Mixed], required: true },
  type: { type: String, enum: ["single", "multiple", "write"], required: true },
});

module.exports = mongoose.model("Question", questionSchema);
