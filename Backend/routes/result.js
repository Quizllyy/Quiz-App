const express = require("express");
const Result = require("../models/result");

const router = express.Router();

// Route: Submit Quiz Results
router.post("/submit", async (req, res) => {
    try {
        const { quizId, responses } = req.body;

        if (!quizId || !responses) {
            return res.status(400).json({ message: "Quiz ID and responses are required." });
        }

        const result = new Result({ quizId, responses });
        await result.save();

        res.json({ message: "Quiz submitted successfully!", result });
    } catch (error) {
        console.error("Error submitting quiz:", error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
