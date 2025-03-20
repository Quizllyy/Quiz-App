const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Quiz = require("../models/quiz");
const Question = require("../models/questions");

// ✅ Create a new quiz
router.post("/create", async (req, res) => {
    try {
        const { title, numQuestions, timeLimit, secretCode } = req.body;

        if (!title || !numQuestions || !timeLimit || !secretCode) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        const newQuiz = new Quiz({ title, numQuestions, timeLimit, secretCode });
        await newQuiz.save();

        res.status(201).json({ message: "Quiz saved successfully!", quiz: newQuiz });
    } catch (error) {
        console.error("Error saving quiz:", error);
        res.status(500).json({ message: "Server error, try again later." });
    }
});

// ✅ Fetch a quiz and its questions
router.get("/:quizId", async (req, res) => {
    try {
        const { quizId } = req.params;

        // 🔹 Validate quiz ID
        if (!mongoose.Types.ObjectId.isValid(quizId)) {
            return res.status(400).json({ message: "Invalid quiz ID format." });
        }

        // 🔹 Find the quiz by ID
        const quiz = await Quiz.findById(quizId).select("-secretCode"); // 🚀 Hide secretCode
        if (!quiz) {
            return res.status(404).json({ message: "Quiz not found" });
        }

        // 🔹 Find associated questions
        const questions = await Question.find({ quizId });

        // 🔹 Return full quiz details including questions
        res.json({ quiz, questions });
    } catch (error) {
        console.error("Error fetching quiz:", error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
