const express = require("express");
const router = express.Router();
const Quiz = require("../models/quiz");

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

module.exports = router;
