const express = require("express");
const mongoose = require("mongoose");
const Question = require("../models/questions");

const router = express.Router();

// GET questions by quizId
router.get("/:quizId", async (req, res) => {
    try {
        const { quizId } = req.params;
        if (!mongoose.Types.ObjectId.isValid(quizId)) {
            return res.status(400).json({ message: "Invalid Quiz ID" });
        }
        const questions = await Question.find({ quizId });
        if (!questions.length) {
            return res.status(404).json({ message: "No questions found for this quiz" });
        }
        res.json(questions);
    } catch (error) {
        console.error("Error fetching questions:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

// POST create questions
router.post("/create", async (req, res) => {
    try {
        const { quizId, questions } = req.body;

        if (!mongoose.Types.ObjectId.isValid(quizId)) {
            return res.status(400).json({ message: "Invalid Quiz ID" });
        }

        const quizObjectId = new mongoose.Types.ObjectId(quizId);

        // Use the correctly imported model 'Question'
        const newQuestions = await Question.insertMany(
            questions.map((q) => ({ ...q, quizId: quizObjectId }))
        );

        res.json({ success: true, message: "Questions saved!", newQuestions });
    } catch (error) {
        console.error("Error saving questions:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;
