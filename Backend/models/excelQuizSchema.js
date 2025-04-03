const mongoose = require("mongoose");

const ExcelQuizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  numQuestions: { type: Number, required: true },
  timeLimit: { type: Number, required: true },
  secretCode: { type: String, required: true, unique: true },
  questions: [
    {
      questionText: { type: String, required: true },
      options: [{ type: String, required: true }],
      correctAnswer: { type: String, required: true },
    },
  ],
});

// Avoid model overwrite error
const ExcelQuiz = mongoose.models.ExcelQuiz || mongoose.model("ExcelQuiz", ExcelQuizSchema);

module.exports = ExcelQuiz;
