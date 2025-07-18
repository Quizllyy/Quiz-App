// ✅ routes/verify.js
const express = require("express");
const router = express.Router();
const Quiz = require("../models/quiz");
const ExcelQuiz = require("../models/excelQuizSchema");

// ✅ POST /api/verify/secret-code
router.post("/secret-code", async (req, res) => {
    try {
        const { secretCode } = req.body;
        if (!secretCode) {
            return res.status(400).json({ message: "Secret code is required!" });
        }

        // Try manual quiz
        let quiz = await Quiz.findOne({ secretCode });
        if (quiz) {
            return res.json({ valid: true, quizId: quiz._id, type: "manual" });
        }

        // Try Excel quiz
        quiz = await ExcelQuiz.findOne({ secretCode });
        if (quiz) {
            return res.json({ valid: true, quizId: quiz._id, type: "excel" });
        }

        return res.status(404).json({ valid: false, message: "Invalid secret code." });
    } catch (error) {
        console.error("Error verifying secret code:", error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
