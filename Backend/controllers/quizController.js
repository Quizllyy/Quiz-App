const Quiz = require("../models/quiz");

// Save quiz to the database
exports.createQuiz = async (req, res) => {
    try {
        const { title, numQuestions, timeLimit, secretCode } = req.body;

        if (!title || !numQuestions || !timeLimit || !secretCode) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        const newQuiz = new Quiz({ title, numQuestions, timeLimit, secretCode });
        await newQuiz.save();

        res.status(201).json({ message: "Quiz saved successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
