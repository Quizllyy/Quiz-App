const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  answers: [
    { questionId: mongoose.Schema.Types.ObjectId, selectedOption: Number },
  ],
  score: { type: Number, required: true },
  submittedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Result", resultSchema);
