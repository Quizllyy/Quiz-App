const express = require("express");
const mongoose = require("mongoose");
const Question = require("../models/questions");
const Quiz = require("../models/quiz");

const router = express.Router();

// GET questions by quizId
router.get("/:quizId", async (req, res) => {
    try {
        const { quizId } = req.params;

        // Validate quizId format
        if (!mongoose.Types.ObjectId.isValid(quizId)) {
            return res.status(400).json({ message: "Invalid Quiz ID format" });
        }

        // Find the quiz
        const quiz = await Quiz.findById(quizId);
        if (!quiz) {
            return res.status(404).json({ message: "Quiz not found" });
        }

        // Fetch questions linked to the quiz
        const questions = await Question.find({ quizId });

        res.json({ quiz, questions });
    } catch (error) {
        console.error("Error fetching quiz:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// POST create questions
router.post("/create", async (req, res) => {
    try {
        const { quizId, questions } = req.body;

        // Validate quizId format
        if (!mongoose.Types.ObjectId.isValid(quizId)) {
            return res.status(400).json({ message: "Invalid Quiz ID format" });
        }

        // Ensure questions is an array
        if (!Array.isArray(questions) || questions.length === 0) {
            return res.status(400).json({ message: "Questions must be a non-empty array" });
        }

        const quizExists = await Quiz.findById(quizId);
        if (!quizExists) {
            return res.status(404).json({ message: "Quiz not found" });
        }

        // Insert questions
        const newQuestions = await Question.insertMany(
            questions.map((q) => ({ ...q, quizId: new mongoose.Types.ObjectId(quizId) }))
        );

        res.json({ success: true, message: "Questions saved!", newQuestions });
    } catch (error) {
        console.error("Error saving questions:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;
