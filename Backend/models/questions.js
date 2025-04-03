const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz", required: true },
  text: { type: String, required: true },
  options: { type: [String], required: true },
  correctAnswers: { type: [mongoose.Schema.Types.Mixed], required: true }, // Can store multiple correct answers
  type: { type: String, enum: ["single", "multiple", "write"], required: true }, // Defines the question type
});

module.exports = mongoose.model("Question", QuestionSchema);