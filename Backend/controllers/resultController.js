const Result = require("../models/result");
const Quiz = require("../models/quiz");

exports.submitResult = async (req, res) => {
    try {
        const { quizId, userId, answers } = req.body;

        if (!quizId || !userId || !answers || !Array.isArray(answers)) {
            return res.status(400).json({ message: "Invalid data submitted" });
        }

        // Optional: Basic scoring logic (assumes answers are indices)
        const quiz = await Quiz.findById(quizId).populate("questions");
        let score = 0;

        for (let i = 0; i < answers.length; i++) {
            const question = quiz.questions.find(
                (q) => q._id.toString() === answers[i].questionId
            );

            if (!question) continue;

            if (question.type === "single" || question.type === "multiple") {
                if (
                    JSON.stringify(question.correctAnswer) ===
                    JSON.stringify(answers[i].selectedOption)
                ) {
                    score += 1;
                }
            } else {
                // text type: no scoring for now
            }
        }

        const newResult = new Result({
            quizId,
            userId,
            answers,
            score,
            submittedAt: new Date(),
        });

        await newResult.save();

        res.status(201).json(newResult);
    } catch (error) {
        console.error("Error submitting result:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.getUserResults = async (req, res) => {
    try {
        const { userId } = req.params;
        const results = await Result.find({ userId }).populate("quizId");
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ message: "Error fetching results" });
    }
};
