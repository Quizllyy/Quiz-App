import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ViewResult = () => {
  const location = useLocation();
  const { quizId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const userId = user?._id || user?.id;

  const [result, setResult] = useState(location.state?.result || null);
  const [quiz, setQuiz] = useState(null);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(!result);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchResultsAndQuiz = async () => {
      try {
        const [resultRes, quizRes] = await Promise.all([
          fetch(
            `http://localhost:8080/api/results/quiz/${quizId}?userId=${userId}`
          ),
          fetch(`http://localhost:8080/api/quiz/${quizId}`),
        ]);

        const resultData = await resultRes.json();
        const quizData = await quizRes.json();

        console.log(resultData, quizData);

        if (!resultData || !quizData.quiz || !quizData.questions) {
          throw new Error("Result or Quiz data not found.");
        }

        setResult(resultData);
        setQuiz({ ...quizData.quiz, questions: quizData.questions });

        // Calculate score
        let calculatedScore = 0;
        resultData.answers.forEach((answer, idx) => {
          const question = quizData.questions[idx];
          if (!question) return;

          const selected = answer.selectedOption;
          const correct =
            question.correctAnswers || question.correctAnswer || [];

          const normalize = (val) => {
            if (Array.isArray(val)) {
              return val.map((v) => String(v).trim().toLowerCase()).sort();
            } else {
              return [String(val).trim().toLowerCase()];
            }
          };

          const normalizedSelected = normalize(selected);
          const normalizedCorrect = normalize(correct);

          const isCorrect =
            normalizedSelected.length === normalizedCorrect.length &&
            normalizedSelected.every(
              (val, index) => val === normalizedCorrect[index]
            );

          if (isCorrect) calculatedScore++;
        });

        setScore(calculatedScore);
      } catch (err) {
        console.error("❌ Error loading results:", err);
        setError("Something went wrong while loading quiz result.");
      } finally {
        setLoading(false);
      }
    };

    if (user && (!result || !quiz)) {
      fetchResultsAndQuiz();
    }
  }, [user, quizId, userId]);

  if (!user)
    return (
      <p className="text-center text-red-500">
        Please log in to view your results.
      </p>
    );
  if (loading) return <p className="text-center text-xl">Loading results...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!result || !quiz)
    return <p className="text-center">No result available.</p>;

  const normalize = (val) => {
    if (Array.isArray(val)) {
      return val.map((v) => String(v).trim().toLowerCase()).sort();
    } else {
      return [String(val).trim().toLowerCase()];
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 py-20 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">📊 Quiz Result</h2>
        <p>
          <strong>Quiz Title:</strong> {quiz.title}
        </p>
        <p>
          <strong>Your Score:</strong> {score} / {quiz.questions.length}
        </p>

        <h3 className="mt-6 font-semibold text-lg">Detailed Answers:</h3>
        <div className="mt-4 space-y-6">
          {quiz.questions.map((q, idx) => {
            const userAnswer = result.answers[idx];
            const selected = userAnswer?.selectedOption;
            const attempted =
              selected !== null &&
              selected !== undefined &&
              selected !== "" &&
              !(Array.isArray(selected) && selected.length === 0);
            let correct = [];

            if (Array.isArray(q.correctAnswers)) {
              correct = q.correctAnswers;
            } else if (typeof q.correctAnswer === "string") {
              correct = q.correctAnswer.split(",").map((opt) => opt.trim());
            } else if (Array.isArray(q.correctAnswer)) {
              correct = q.correctAnswer;
            } else if (typeof q.correctAnswer === "number") {
              correct = [String(q.correctAnswer)];
            }

            const normalizedSelected = normalize(selected);
            const normalizedCorrect = normalize(correct);

            const isCorrect =
              attempted &&
              normalizedSelected.length === normalizedCorrect.length &&
              normalizedSelected.every((val) =>
                normalizedCorrect.includes(val)
              );

            const userValue = attempted
              ? Array.isArray(selected)
                ? selected.sort().join(", ")
                : selected
              : "Not answered";

            const correctValue = Array.isArray(correct)
              ? correct.sort().join(", ")
              : correct;

            return (
              <div
                key={q._id}
                className={`p-4 rounded-md border ${
                  !attempted
                    ? "border-yellow-500 bg-yellow-50"
                    : isCorrect
                    ? "border-green-500 bg-green-50"
                    : "border-red-500 bg-red-50"
                }`}>
                <p className="font-semibold">
                  Q{idx + 1}. {q.text}
                </p>
                <p>
                  <strong>Your Answer:</strong>{" "}
                  <span
                    className={
                      !attempted
                        ? "text-yellow-600"
                        : isCorrect
                        ? "text-green-600"
                        : "text-red-600"
                    }>
                    {userValue}
                  </span>
                </p>
                <p>
                  <strong>Correct Answer:</strong>{" "}
                  <span className="text-green-700">{correctValue}</span>
                </p>

                {!attempted ? (
                  <p className="text-sm text-yellow-600 italic mt-1">
                    ⚠️ You skipped this question.
                  </p>
                ) : isCorrect ? (
                  <p className="text-sm text-green-600 italic mt-1">
                    ✅ Your answer is correct.
                  </p>
                ) : (
                  <p className="text-sm text-red-600 italic mt-1">
                    ❌ Your answer is incorrect.
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex justify-center mt-8">
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewResult;
