const express = require("express");
const mongoose = require("mongoose");
const Result = require("../models/result");
const Quiz = require("../models/quiz");
const Question = require("../models/questions");
const ExcelQuiz = require("../models/excelQuizSchema");

const router = express.Router();

const authMiddleware = require("../middleware/auth"); // add your auth middleware if not already used

// Apply middleware to protect route
router.get("/results", authMiddleware, async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);

    if (user.role === "admin") {
      const results = await Result.find()
        .populate("quizId", "title timeLimit")
        .populate("userId", "name email");
      return res.json(results);
    } else {
      const results = await Result.find({ userId: userId }).populate(
        "quizId",
        "title timeLimit"
      );
      return res.json(results);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;
/**
 * 📌 1. Save Quiz Result (User Submits Quiz)
 */
router.post("/submit", async (req, res) => {
  try {
    console.log("📩 Incoming Quiz Submission:", req.body);

    const { quizId, userId, answers } = req.body;

    if (!quizId || !userId || !Array.isArray(answers)) {
      return res.status(400).json({ message: "Invalid request data" });
    }

    let score = 0;

    const quiz =
      (await Quiz.findById(quizId)) || (await ExcelQuiz.findById(quizId));

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    for (const answer of answers) {
      const question =
        quiz.questions?.find(
          (q) =>
            q.questionText.trim().toLowerCase() ===
            answer.questionText.trim().toLowerCase()
        ) || (await Question.findById(answer.questionId));

      if (!question) continue;

      const type = question.type || "single";
      const correctAnswer =
        question.correctAnswer || question.correct || question.answer;
      const selected = answer.selectedOption;
      const normalize = (val) => String(val).trim().toLowerCase();

      if (type === "single") {
        if (normalize(correctAnswer) === normalize(selected)) {
          score += 1;
        }
      } else if (type === "multiple") {
        const correct = (
          Array.isArray(correctAnswer) ? correctAnswer : [correctAnswer]
        )
          .map(normalize)
          .sort();

        const submitted = (Array.isArray(selected) ? selected : [])
          .map(normalize)
          .sort();

        if (JSON.stringify(correct) === JSON.stringify(submitted)) {
          score += 1;
        }
      } else if (type === "write") {
        const answersArr = Array.isArray(correctAnswer)
          ? correctAnswer
          : [correctAnswer];
        const match = answersArr.some(
          (ans) => normalize(ans) === normalize(selected)
        );
        if (match) score += 1;
      }
    }

    const result = new Result({ quizId, userId, answers, score });
    await result.save();

    res.status(201).json({
      message: "Quiz submitted successfully",
      resultId: result._id,
      score,
    });
  } catch (error) {
    console.error("❌ Error saving result:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

/**
 * 📌 2. Fetch All Results for a User
 */
router.get("/user/:userId", async (req, res) => {
  try {
    const results = await Result.find({ userId: req.params.userId }).populate(
      "quizId"
    );
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * 📌 3. Admin View - All Results for a Quiz
 */
router.get("/admin/:quizId", async (req, res) => {
  try {
    const { quizId } = req.params;
    const results = await Result.find({ quizId })
      .populate("userId")
      .populate("answers.questionId");
    res.json(results);
  } catch (error) {
    console.error("❌ Error fetching quiz results:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

/**
 * 📌 4. Get Specific Result by ID
 */
router.get("/:resultId", async (req, res) => {
  try {
    const { resultId } = req.params;
    const result = await Result.findById(resultId)
      .populate("userId")
      .populate("quizId")
      .populate("answers.questionId");

    if (!result) {
      return res.status(404).json({ message: "Result not found" });
    }

    res.json(result);
  } catch (error) {
    console.error("❌ Error fetching result:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

/**
 * 📌 5. Get Result for a Specific Quiz and User
 */
router.get("/quiz/:quizId", async (req, res) => {
  const { quizId } = req.params;
  const { userId } = req.query;

  const result = await Result.findOne({ quizId, userId })
    .populate("userId")
    .populate("quizId")
    .populate("answers.questionId");

  if (!result) {
    return res.status(404).json({ message: "Result not found" });
  }

  res.json(result);
});

/**
 * 📌 6. Get Latest Result for a User for a Quiz
 */
router.get("/user/:userId/quiz/:quizId", async (req, res) => {
  const { userId, quizId } = req.params;
  try {
    const result = await Result.findOne({ quizId, userId }).sort({
      submittedAt: -1,
    });

    if (!result) return res.status(404).json({ error: "Result not found" });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const requireLogin = require("../middleware/auth");

router.get("/user-results", requireLogin, async (req, res) => {
  try {
    const results = await Result.find({ userId: req.user._id })
      .populate("quizId") // include quiz details
      .populate("userId", "name email");

    res.status(200).json({ userRole: req.user.role, results });
  } catch (error) {
    console.error("Error fetching results:", error);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/admin-all-results", requireLogin, async (req, res) => {
  try {
    // Check if logged-in user is admin
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const results = await Result.find()
      .populate("userId", "name email")
      .populate("quizId", "title secretCode timeLimit");

    res.status(200).json(results);
  } catch (err) {
    console.error("❌ Admin result fetch failed:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
