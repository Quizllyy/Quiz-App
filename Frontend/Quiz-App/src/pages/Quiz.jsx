import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Quiz = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const userId = user?._id || user?.id;

  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [userResponses, setUserResponses] = useState({});
  const [timer, setTimer] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await fetch(
          `https://quiz-app-vrxp.onrender.com/api/quiz/${quizId}`
        );
        const data = await response.json();
        if (!data.quiz || !data.questions)
          throw new Error("Invalid API response");
        setQuiz(data.quiz);
        setQuestions(data.questions);
        setTimer(data.quiz.timeLimit * 60); // timeLimit in minutes
      } catch (err) {
        console.error("Error fetching quiz:", err);
        setError("Failed to load quiz.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuizData();
  }, [quizId]);

  useEffect(() => {
    if (quizStarted && timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }

    if (timer === 0 && quizStarted) {
      alert("⏰ Time's up! Submitting your quiz.");
      handleSubmitQuiz(true);
    }
  }, [quizStarted, timer]);

  const handleOptionSelect = (qId, optionValue, type) => {
    if (!quizStarted || timer === 0) return;

    setUserResponses((prev) => {
      const updated = { ...prev };

      if (type === "multiple") {
        const selected = updated[qId] || [];
        updated[qId] = selected.includes(optionValue)
          ? selected.filter((val) => val !== optionValue)
          : [...selected, optionValue];
      } else {
        updated[qId] = [optionValue]; // always array
      }

      return updated;
    });
  };

  const handleTextAnswer = (qId, value) => {
    if (!quizStarted || timer === 0) return;
    setUserResponses((prev) => ({ ...prev, [qId]: [value.trim()] }));
  };

  const handleStartQuiz = () => {
    setQuizStarted(true);
  };

  const handleSubmitQuiz = async (autoSubmit = false) => {
    if (!quizStarted || !userId || submitting) return;

    if (!autoSubmit) {
      const confirm = window.confirm("Are you sure you want to submit?");
      if (!confirm) return;
    }

    setSubmitting(true);
    setQuizStarted(false);

    const formattedAnswers = questions.map((question) => {
      const response = userResponses[question._id] || [];
      let selectedOption;

      if (question.type === "multiple") {
        selectedOption = response;
      } else {
        selectedOption = response[0] || (question.type === "write" ? "" : null);
      }

      return {
        questionId: question._id,
        selectedOption,
      };
    });

    try {
      const response = await fetch(
        `https://quiz-app-vrxp.onrender.com/api/results/submit`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            quizId,
            userId,
            answers: formattedAnswers,
          }),
        }
      );

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Submission failed");

      navigate(`/quiz/${quizId}/result`, { state: { result } });
    } catch (err) {
      console.error("Submission error:", err);
      alert("❌ Failed to submit quiz: " + err.message);
    }
  };

  if (loading)
    return <div className="text-center text-2xl">Loading quiz...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (!quiz) return <p>Quiz not found.</p>;

  const unanswered = questions.filter((q) => !userResponses[q._id]).length;

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-blue-100 to-purple-200">
      <div className="p-4 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-4">{quiz.title}</h1>
        <div className="flex justify-between bg-white p-4 rounded shadow mb-6">
          <span>
            ⏳ Time Left: {Math.floor(timer / 60)}:
            {String(timer % 60).padStart(2, "0")}
          </span>
          <span>📌 Questions: {questions.length}</span>
        </div>

        {quizStarted && unanswered > 0 && (
          <p className="text-red-500 mb-4">🔴 Unanswered: {unanswered}</p>
        )}

        {!quizStarted ? (
          <div className="text-center">
            <button
              onClick={handleStartQuiz}
              className="bg-blue-600 text-white px-6 py-2 rounded shadow"
            >
              Start Quiz
            </button>
          </div>
        ) : (
          <>
            {questions.map((q, idx) => (
              <div key={q._id} className="mb-6">
                <p className="font-semibold text-lg mb-2">
                  {idx + 1}. {q.text}
                </p>

                {q.type === "multiple" ? (
                  <div className="flex flex-wrap gap-3">
                    {q.options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() =>
                          handleOptionSelect(q._id, opt, "multiple")
                        }
                        className={`px-4 py-2 border rounded-md ${
                          userResponses[q._id]?.includes(opt)
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                ) : q.type === "single" ? (
                  <ul className="space-y-2 mt-2">
                    {q.options.map((opt, i) => (
                      <li
                        key={i}
                        onClick={() => handleOptionSelect(q._id, opt, "single")}
                        className={`px-4 py-2 border rounded-md cursor-pointer text-center ${
                          userResponses[q._id]?.[0] === opt
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100"
                        }`}
                      >
                        {opt}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <textarea
                    className="w-full mt-2 px-4 py-2 border rounded-md"
                    placeholder="Type your answer..."
                    value={userResponses[q._id]?.[0] || ""}
                    onChange={(e) => handleTextAnswer(q._id, e.target.value)}
                  />
                )}
              </div>
            ))}

            <div className="text-center">
              <button
                onClick={() => handleSubmitQuiz(false)}
                disabled={submitting}
                className={`mt-4 px-6 py-2 text-white rounded ${
                  submitting ? "bg-gray-400" : "bg-green-600"
                }`}
              >
                {submitting ? "Submitting..." : "Submit Quiz"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Quiz;
