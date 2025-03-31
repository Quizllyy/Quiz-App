const express = require("express");
const router = express.Router();
const ExcelQuiz = require("../models/excelQuizSchema");

// Function to generate a unique quiz code
const generateUniqueCode = () => {
  return "QUIZ-" + Math.random().toString(36).substring(2, 8).toUpperCase();
};

// Route to save the finalized Excel-uploaded quiz
router.post("/save-quiz", async (req, res) => {
  try {
    console.log("Received Quiz Data:", req.body); // Debugging
    const { title, timeLimit, questions } = req.body;

    const numQuestions = questions.length;
    const quiz = new ExcelQuiz({
      title,
      numQuestions,
      timeLimit,
      secretCode: generateUniqueCode(),
      questions,
    });

    await quiz.save();
    res.status(201).json({
      success: true,
      message: "Quiz saved successfully!",
      secretCode: quiz.secretCode,
    });
  } catch (error) {
    console.error("Error saving quiz:", error);
    res
      .status(500)
      .json({ success: false, message: "Error saving quiz", error });
  }
});

module.exports = router;
