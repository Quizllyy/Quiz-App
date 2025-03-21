const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Quiz = require("../models/quiz");
const Question = require("../models/questions");

// Create a new quiz
router.post("/create", async (req, res) => {
  try {
    const { title, numQuestions, timeLimit, secretCode } = req.body;

    if (!title || !numQuestions || !timeLimit || !secretCode) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const newQuiz = new Quiz({ title, numQuestions, timeLimit, secretCode });
    await newQuiz.save();

    res
      .status(201)
      .json({ message: "Quiz saved successfully!", quiz: newQuiz });
  } catch (error) {
    console.error("Error saving quiz:", error);
    res.status(500).json({ message: "Server error, try again later." });
  }
});

router.get("/:quizId", async (req, res) => {
  try {
    const { quizId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(quizId)) {
      return res.status(400).json({
        message: "Invalid quiz ID format. Must be a 24-character hex string.",
      });
    }

    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    res.json({ secretCode: quiz.secretCode });
  } catch (error) {
    console.error("Error fetching quiz:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/verify-secret-code", async (req, res) => {
  try {
    const { secretCode } = req.body;

    if (!secretCode) {
      return res.status(400).json({ message: "Secret code is required!" });
    }

    const quiz = await Quiz.findOne({ secretCode });

    if (!quiz) {
      return res
        .status(404)
        .json({ valid: false, message: "Invalid secret code." });
    }

    res.json({ valid: true, quizId: quiz._id });
  } catch (error) {
    console.error("Error verifying secret code:", error);
    res.status(500).json({ message: "Server error, please try again later." });
  }
});

router.get("/:quizId", async (req, res) => {
  try {
    const { quizId } = req.params;

    // Validate quizId
    if (!mongoose.Types.ObjectId.isValid(quizId)) {
      return res.status(400).json({ message: "Invalid quiz ID format." });
    }

    // Find the quiz
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    // Find questions that belong to this quiz
    const questions = await Question.find({ quizId });

    res.json({ quiz, questions }); // ✅ Return quiz and its questions
  } catch (error) {
    console.error("Error fetching quiz:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
