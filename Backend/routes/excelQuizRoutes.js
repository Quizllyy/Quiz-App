const express = require("express");
const router = express.Router();
const ExcelQuiz = require("../models/excelQuizSchema");
const mongoose = require("mongoose");

// Function to generate a unique quiz code
const generateUniqueCode = () => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};

// ✅ Save a new Excel-uploaded quiz
router.post("/save-quiz", async (req, res) => {
  try {
    const { title, timeLimit, questions } = req.body;

    if (!title || !timeLimit || !questions || questions.length === 0) {
      return res.status(400).json({ success: false, message: "Invalid data format" });
    }

    const formattedQuestions = questions.map((q) => ({
      questionText: q.Question,
      options: q.Options ? q.Options.split(",") : [],
      correctAnswer: q["Correct Answers"],
      type: q.Type,
    }));

    const numQuestions = formattedQuestions.length;

    const quiz = new ExcelQuiz({
      title,
      numQuestions,
      timeLimit,
      secretCode: generateUniqueCode(),
      questions: formattedQuestions,
    });

    await quiz.save();

    res.status(201).json({
      success: true,
      message: "Quiz saved successfully!",
      secretCode: quiz.secretCode,
      quizId: quiz._id,
    });
  } catch (error) {
    console.error("Error saving Excel quiz:", error.message);
    res.status(500).json({ success: false, message: "Error saving quiz" });
  }
});

// ✅ Verify secret code (Excel quiz only)
router.post("/verify-secret-code", async (req, res) => {
  const { secretCode } = req.body;

  try {
    if (!secretCode) {
      return res.status(400).json({ message: "Secret code is required" });
    }

    const quiz = await ExcelQuiz.findOne({ secretCode });
    if (!quiz) {
      return res.status(404).json({ valid: false, message: "Invalid secret code." });
    }

    res.json({ valid: true, quizId: quiz._id });
  } catch (error) {
    console.error("Error verifying secret code:", error);
    res.status(500).json({ message: "Server error, please try again later." });
  }
});


// ✅ Fetch secret code by quiz ID (Excel quiz only)
router.get("/:quizId/secret", async (req, res) => {
  try {
    const { quizId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(quizId)) {
      return res.status(400).json({ message: "Invalid quiz ID format." });
    }

    const quiz = await ExcelQuiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: "Excel quiz not found" });
    }

    res.json({ secretCode: quiz.secretCode });
  } catch (error) {
    console.error("Error fetching Excel quiz secret code:", error);
    res.status(500).json({ message: "Error fetching secret code" });
  }
});

module.exports = router;
