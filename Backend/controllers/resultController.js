const Result = require("../models/result");
const Quiz = require("../models/quiz");
const Question = require("../models/questions");

exports.submitResult = async (req, res) => {
  try {
    const { quizId, userId, answers } = req.body;

    if (!quizId || !userId || !answers || !Array.isArray(answers)) {
      return res.status(400).json({ message: "Invalid data submitted" });
    }

    const questions = await Question.find({ quizId });

    let score = 0;

    for (const answer of answers) {
      const question = questions.find(
        (q) => q._id.toString() === answer.questionId
      );

      if (!question) continue;

      const correct = question.correctAnswers;
      const selected = answer.selectedOption;

      if (question.type === "single" || question.type === "multiple") {
        if (
          JSON.stringify(correct.sort()) === JSON.stringify(selected.sort())
        ) {
          score += 1;
        }
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
    const results = await Result.find({ userId }).populate("quizId", "title");
    res.status(200).json(results);
  } catch (error) {
    console.error("Error fetching results:", error);
    res.status(500).json({ message: "Error fetching results" });
  }
};
