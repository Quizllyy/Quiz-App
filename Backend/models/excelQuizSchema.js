const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  options: [String],
  correctAnswer: mongoose.Schema.Types.Mixed, // can be string or array depending on type
  type: { type: String, enum: ["single", "multiple", "write"], required: true },
});

const excelQuizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  numQuestions: { type: Number, required: true },
  timeLimit: { type: Number, required: true },
  secretCode: { type: String, required: true, unique: true },
  questions: [questionSchema],
});

module.exports = mongoose.model("ExcelQuiz", excelQuizSchema);
