const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
  questionId: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
  selectedOption: mongoose.Schema.Types.Mixed, // string | string[]
  question: {
    text: String,
    correctAnswer: mongoose.Schema.Types.Mixed, // string | string[]
  },
});

const resultSchema = new mongoose.Schema({
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  answers: [answerSchema],
  score: Number,
  submittedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.models.Result || mongoose.model("Result", resultSchema);
