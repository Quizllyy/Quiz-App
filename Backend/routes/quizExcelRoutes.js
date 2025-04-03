const express = require("express");
const router = express.Router();
const ExcelQuiz = require("../models/excelQuizSchema"); // Import Schema

// Function to generate a unique quiz code
const generateUniqueCode = () => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};

// Route to save the finalized Excel-uploaded quiz
router.post("/save-quiz", async (req, res) => {
  try {
    console.log("📩 Received Quiz Data:", JSON.stringify(req.body, null, 2));

    const { title, timeLimit, questions } = req.body;

    if (!title || !timeLimit || !questions || questions.length === 0) {
      console.log("❌ Missing required fields!");
      return res.status(400).json({ success: false, message: "Invalid data format" });
    }

    // Transform the data to match the schema
    const formattedQuestions = questions.map((q) => ({
      questionText: q.Question, // Convert "Question" to "questionText"
      options: q.Options ? q.Options.split(",") : [], // Convert comma-separated string to array
      correctAnswer: q["Correct Answers"], // Convert "Correct Answers" to "correctAnswer"
    }));

    const numQuestions = formattedQuestions.length;

    const quiz = new ExcelQuiz({
      title,
      numQuestions,
      timeLimit,
      secretCode: generateUniqueCode(),
      questions: formattedQuestions, // Use formatted questions
    });

    await quiz.save();
    console.log("✅ Quiz saved successfully!");

    res.status(201).json({
      success: true,
      message: "Quiz saved successfully!",
      secretCode: quiz.secretCode,
      quizId: quiz._id, // ✅ Include the quiz ID
    });
  } catch (error) {
    console.error("❌ Error saving quiz:", error);
    res.status(500).json({ success: false, message: "Error saving quiz", error: error.message });
  }
});

router.get("/:quizId/secret", async (req, res) => {
  try {
    const { quizId } = req.params;
    console.log("🔍 Incoming quizId:", quizId);

    if (!mongoose.Types.ObjectId.isValid(quizId)) {
      console.log("❌ Invalid ObjectId format.");
      return res.status(400).json({ message: "Invalid quiz ID format." });
    }

    let quiz = await ExcelQuiz.findById(quizId); // First, check Excel quizzes
    if (!quiz) {
      quiz = await Quiz.findById(quizId); // If not found, check manually entered quizzes
    }

    if (!quiz) {
      console.log("❌ Quiz not found in database.");
      return res.status(404).json({ message: "Quiz not found" });
    }

    console.log("📄 Fetched Quiz:", quiz);
    res.json({ secretCode: quiz.secretCode });
  } catch (error) {
    console.error("❌ Error fetching secret code:", error);
    res.status(500).json({ message: "Server error" });
  }
});



module.exports = router;
