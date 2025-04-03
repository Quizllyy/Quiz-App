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
router.post("/submit", async (req, res) => {
    try {
        const { quizId, userId, responses } = req.body;

        if (!quizId || !userId || !responses) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // Calculate score (assuming responses is an object with questionId -> selectedOption)
        let score = 0;
        for (const questionId in responses) {
            // Compare selectedOption with the correct answer (fetch from DB)
            // Assuming you have a Question model
        }

        const newResult = new Result({
            quizId,
            userId,
            answers: Object.keys(responses).map((questionId) => ({
                questionId,
                selectedOption: responses[questionId],
            })),
            score,
        });

        await newResult.save();
        res.status(201).json({ message: "Quiz submitted successfully", result: newResult });
    } catch (error) {
        console.error("Error submitting quiz:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// ✅ Route 1: Fetch Quiz & Questions (Without Secret Code)
router.get("/:quizId", async (req, res) => {
    try {
        const { quizId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(quizId)) {
            return res.status(400).json({ message: "Invalid quiz ID format." });
        }

        const quiz = await Quiz.findById(quizId).select("-secretCode");
        if (!quiz) {
            return res.status(404).json({ message: "Quiz not found" });
        }

        const questions = await Question.find({ quizId }).select("-correctAnswer");

        console.log("Final API Response:", { quiz, questions });

        res.json({ quiz, questions });
    } catch (error) {
        console.error("Error fetching quiz:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// ✅ Route 2: Fetch Secret Code
router.get("/:quizId/secret", async (req, res) => {
    try {
        const { quizId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(quizId)) {
            return res.status(400).json({ message: "Invalid quiz ID format." });
        }

        const quiz = await Quiz.findById(quizId);
        if (!quiz) {
            return res.status(404).json({ message: "Quiz not found" });
        }

        res.json({ secretCode: quiz.secretCode });
    } catch (error) {
        console.error("Error fetching secret code:", error);
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

router.put("/:quizId", async (req, res) => {
    try {
        const { quizId } = req.params;
        const { questions } = req.body;

        console.log("🟢 Received PUT request for quizId:", quizId);
        console.log("🟢 Received Questions Data:", JSON.stringify(questions, null, 2));

        if (!mongoose.Types.ObjectId.isValid(quizId)) {
            console.log("🔴 Invalid Quiz ID");
            return res.status(400).json({ message: "Invalid quiz ID format." });
        }

        // 🔹 Find the quiz by ID
        const quiz = await Quiz.findById(quizId).select("-secretCode");
        if (!quiz) {
            console.log("🔴 Quiz Not Found");
            return res.status(404).json({ message: "Quiz not found" });
        }

        // 🔹 Update or Insert Questions
        for (const q of questions) {
            if (q._id) {
                // Update existing question
                await Question.findByIdAndUpdate(q._id, q, { new: true });
            } else {
                // Insert new question
                const newQuestion = new Question({ ...q, quizId });
                await newQuestion.save();
            }
        }

        console.log("✅ Questions Updated Successfully!");
        res.json({ message: "Quiz updated successfully!" });

    } catch (error) {
        console.error("❌ Error updating quiz:", error);
        res.status(500).json({ message: "Server error" });
    }
});


module.exports = router;
