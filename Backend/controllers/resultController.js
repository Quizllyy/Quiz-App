const Result = require("../models/result");
const Quiz = require("../models/quiz");

exports.submitResult = async (req, res) => {
  try {
    const { quizId, userId, answers } = req.body;

    if (!quizId || !userId || !answers || !Array.isArray(answers)) {
      return res.status(400).json({ message: "Invalid data submitted" });
    }

    const quiz = await Quiz.findById(quizId).populate("questions");
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    const totalQuestions = quiz.questions.length;

    let score = 0;

    for (let i = 0; i < answers.length; i++) {
      const submittedAnswer = answers[i];
      const question = quiz.questions.find(
        (q) => q._id.toString() === submittedAnswer.questionId
      );

      if (!question) {
        console.log(`Question not found for ID: ${submittedAnswer.questionId}`);
        continue;
      }

      // Convert correctAnswer (index or indices) to actual text
      let correctOptionText;
      if (question.type === "single") {
        correctOptionText = question.options[question.correctAnswer];
      } else if (question.type === "multiple") {
        correctOptionText = question.correctAnswer.map(
          (index) => question.options[index]
        );
      } else {
        correctOptionText = question.correctAnswer; // string for text type
      }

      const selectedOption = submittedAnswer.selectedOption;

      console.log(`\nQuestion ${i + 1}: ${question.text}`);
      console.log("Correct Answer:", correctOptionText);
      console.log("User Selected:", selectedOption);

      // Scoring
      if (question.type === "single" || question.type === "multiple") {
        const correct = JSON.stringify(correctOptionText);
        const selected = JSON.stringify(selectedOption);
        if (correct === selected) {
          score += 1;
          console.log("✅ Correct");
        } else {
          console.log("❌ Incorrect");
        }
      } else {
        // text-type
        if (
          typeof correctOptionText === "string" &&
          typeof selectedOption === "string" &&
          correctOptionText.trim().toLowerCase() ===
            selectedOption.trim().toLowerCase()
        ) {
          score += 1;
          console.log("✅ Correct (text)");
        } else {
          console.log("❌ Incorrect (text)");
        }
      }
    }

    console.log("Final Score:", score);

    const newResult = new Result({
      quizId,
      userId,
      answers,
      score,
      totalQuestions,
      submittedAt: new Date(),
    });

    await newResult.save();

    console.log("Result saved successfully");
    res.status(201).json(newResult);
  } catch (error) {
    console.error("Error submitting result:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
