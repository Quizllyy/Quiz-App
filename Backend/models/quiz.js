const mongoose = require("mongoose");

const QuizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  numQuestions: { type: Number, required: true },
  timeLimit: { type: Number, required: true },
  secretCode: { type: String, required: true },
});

module.exports = mongoose.model("Quiz", QuizSchema);
