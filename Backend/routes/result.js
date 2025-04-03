const express = require("express");
const mongoose = require("mongoose");
const Result = require("../models/Result");
const Quiz = require("../models/Quiz"); // Ensure this model exists
const Question = require("../models/Question"); // Ensure this model exists
const authMiddleware = require("../middleware/authMiddleware"); // If you have authentication

const router = express.Router();

/**
 * 📌 1. Save Quiz Result (User Submits Quiz)
 */
router.post("/submit", async (req, res) => {
    try {
        const { quizId, userId, answers } = req.body;

        if (!quizId || !userId || !answers || !Array.isArray(answers)) {
            return res.status(400).json({ message: "Invalid request data" });
        }

        const quiz = await Quiz.findById(quizId);
        if (!quiz) return res.status(404).json({ message: "Quiz not found" });

        let score = 0;

        for (const answer of answers) {
            const question = await Question.findById(answer.questionId);
            if (question && question.correctAnswer === answer.selectedOption) {
                score += 1;
            }
        }

        const result = new Result({
            quizId,
            userId,
            answers,
            score,
        });

        await result.save();

        res.status(201).json({ message: "Quiz submitted successfully", score });
    } catch (error) {
        console.error("Error saving result:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

/**
 * 📌 2. Fetch User's Quiz Result
 */
router.get("/user/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        const results = await Result.find({ userId }).populate("quizId");
        res.json(results);
    } catch (error) {
        console.error("Error fetching results:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

/**
 * 📌 3. Fetch All Results (Admin View)
 */
router.get("/admin/:quizId", async (req, res) => {
    try {
        const { quizId } = req.params;
        const results = await Result.find({ quizId }).populate("userId");
        res.json(results);
    } catch (error) {
        console.error("Error fetching admin results:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
