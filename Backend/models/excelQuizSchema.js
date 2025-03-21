const mongoose = require("mongoose");

const ExcelQuizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  numQuestions: { type: Number, required: true },
  timeLimit: { type: Number, required: true },
  secretCode: { type: String, required: true },
  questions: [
    {
      questionText: { type: String, required: true },
      options: [{ type: String, required: true }],
      correctAnswer: { type: String, required: true },
    },
  ],
});

module.exports = mongoose.model("ExcelQuiz", ExcelQuizSchema);
